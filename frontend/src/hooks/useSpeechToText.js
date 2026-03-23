import { useState, useEffect, useRef } from "react";
// --- NEW: Import Data Channels from LiveKit ---
import { useDataChannel } from "@livekit/components-react";

export default function useSpeechToText() {
  const [caption, setCaption] = useState("");
  const fullTranscriptRef = useRef(""); // Our permanent shared master notepad
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef(null);
  const clearTimerRef = useRef(null);

  // =========================================================================
  // 📥 THE RECEIVER: Catch text packets sent by other people in the room
  // =========================================================================
  const { send } = useDataChannel("transcript-channel", (msg) => {
    // 1. Packets arrive as raw bytes. We decode them back into JSON.
    const decoder = new TextDecoder();
    const decodedString = decoder.decode(msg.payload);
    const data = JSON.parse(decodedString);

    // 2. LiveKit automatically tells us who sent it!
    const senderName = msg.from?.identity || "Participant";

    // 3. Add THEIR sentence to OUR master notepad like a movie script
    fullTranscriptRef.current += `\n${senderName}: ${data.text}`;
    console.log(`📥 Received from ${senderName}: ${data.text}`);
  });

  // =========================================================================
  // 🎙️ THE LISTENER & BROADCASTER
  // =========================================================================
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error(
        "❌ ERROR: Your browser does not support Speech Recognition.",
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => console.log("🎙️ AI is listening...");
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      let interimTranscript = "";

      // Loop through all the words the AI just heard
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const chunk = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          const finalSentence = chunk.trim() + " ";

          // 1. Add it to OUR local notepad so we have a record of what we said
          fullTranscriptRef.current += `\nMe: ${finalSentence}`;

          // 2. 🚀 THE BROADCASTER: Send our words to everyone else!
          try {
            const payloadString = JSON.stringify({ text: finalSentence });
            const encoder = new TextEncoder();
            // Fire the encoded bytes across the LiveKit network
            send(encoder.encode(payloadString), { reliable: true });
          } catch (error) {
            console.error("Failed to broadcast transcript:", error);
          }
        } else {
          interimTranscript += chunk; // Short-term memory
        }
      }

      // UI UPDATE: Show the latest words on the screen
      const displayPhrase =
        interimTranscript ||
        event.results[event.results.length - 1][0].transcript;
      setCaption(displayPhrase);

      // SILENCE TIMER
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
      clearTimerRef.current = setTimeout(() => setCaption(""), 3000);
    };

    recognition.onend = () => {
      setIsListening((prev) => {
        if (prev) {
          try {
            recognition.start();
          } catch (e) {}
        }
        return prev;
      });
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
    };
  }, [send]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      recognitionRef.current?.stop();
      setCaption("");
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
    } else {
      setCaption("");
      setIsListening(true);
      try {
        recognitionRef.current?.start();
      } catch (e) {}
    }
  };

  return { caption, fullTranscriptRef, isListening, toggleListening };
}
