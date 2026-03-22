import { useState, useEffect, useRef } from "react";

export default function useSpeechToText() {
  const [caption, setCaption] = useState("");
  const fullTranscriptRef = useRef(""); // Our permanent master notepad
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef(null);
  const clearTimerRef = useRef(null);

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

    recognition.onerror = (event) => setIsListening(false);

    recognition.onresult = (event) => {
      let interimTranscript = "";

      // Loop through all the words the AI just heard
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const chunk = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          // 1. PERMANENT MEMORY: The browser is 100% sure the sentence is done.
          // We ADD it to our master notepad so it never gets deleted!
          fullTranscriptRef.current += chunk + " ";
        } else {
          // 2. SHORT-TERM MEMORY: The browser is still listening to the current sentence.
          interimTranscript += chunk;
        }
      }

      // 3. UI UPDATE: Show the latest words on the screen
      const displayPhrase =
        interimTranscript ||
        event.results[event.results.length - 1][0].transcript;
      setCaption(displayPhrase);

      // 4. THE SILENCE TIMER (Wipes the screen, but NOT the hidden notepad)
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
      clearTimerRef.current = setTimeout(() => {
        setCaption("");
      }, 3000);
    };

    recognition.onend = () => {
      // If the AI takes a breath, force it to keep listening
      setIsListening((prevListening) => {
        if (prevListening) {
          try {
            recognition.start();
          } catch (e) {}
        }
        return prevListening;
      });
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
    };
  }, []);

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
