import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import server from "../environment";

const peerConfigConnections = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export default function useWebRTC(username) {
  const socketRef = useRef();
  const socketIdRef = useRef();
  const localVideoRef = useRef();
  const connectionsRef = useRef({});
  const videoRef = useRef([]);

  const [videoAvailable, setVideoAvailable] = useState(true);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const [screenAvailable, setScreenAvailable] = useState(false);

  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);
  const [screen, setScreen] = useState(false);

  const [videos, setVideos] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState(0);

  useEffect(() => {
    getPermissions();
  }, []);

  const getPermissions = async () => {
    try {
      const videoPermission = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoPermission) setVideoAvailable(true);
      else setVideoAvailable(false);

      const audioPermission = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      if (audioPermission) setAudioAvailable(true);
      else setAudioAvailable(false);

      if (navigator.mediaDevices.getDisplayMedia) setScreenAvailable(true);
      else setScreenAvailable(false);

      if (videoAvailable || audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: videoAvailable,
          audio: audioAvailable,
        });
        if (userMediaStream) {
          window.localStream = userMediaStream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = userMediaStream;
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connect = () => {
    setVideo(videoAvailable);
    setAudio(audioAvailable);
    connectToSocketServer();
  };

  const connectToSocketServer = () => {
    socketRef.current = io.connect(server, { secure: false });

    socketRef.current.on("signal", gotMessageFromServer);

    socketRef.current.on("connect", () => {
      socketRef.current.emit("join-call", window.location.href);
      socketIdRef.current = socketRef.current.id;

      socketRef.current.on("chat-message", (data, sender, socketIdSender) => {
        setMessages((prev) => [...prev, { sender, data }]);
        if (socketIdSender !== socketIdRef.current) {
          setNewMessages((prev) => prev + 1);
        }
      });

      socketRef.current.on("user-left", (id) => {
        setVideos((videos) => videos.filter((v) => v.socketId !== id));
      });

      socketRef.current.on("user-joined", (id, clients) => {
        clients.forEach((socketListId) => {
          connectionsRef.current[socketListId] = new RTCPeerConnection(
            peerConfigConnections,
          );

          connectionsRef.current[socketListId].onicecandidate = (event) => {
            if (event.candidate != null) {
              socketRef.current.emit(
                "signal",
                socketListId,
                JSON.stringify({ ice: event.candidate }),
              );
            }
          };

          connectionsRef.current[socketListId].onaddstream = (event) => {
            let videoExists = videoRef.current.find(
              (v) => v.socketId === socketListId,
            );

            if (videoExists) {
              setVideos((vids) => {
                const updated = vids.map((v) =>
                  v.socketId === socketListId
                    ? { ...v, stream: event.stream }
                    : v,
                );
                videoRef.current = updated;
                return updated;
              });
            } else {
              let newVideo = {
                socketId: socketListId,
                stream: event.stream,
                autoplay: true,
                playsinline: true,
              };
              setVideos((vids) => {
                const updated = [...vids, newVideo];
                videoRef.current = updated;
                return updated;
              });
            }
          };

          if (window.localStream !== undefined && window.localStream !== null) {
            connectionsRef.current[socketListId].addStream(window.localStream);
          } else {
            let blackSilence = (...args) =>
              new MediaStream([black(...args), silence()]);
            window.localStream = blackSilence();
            connectionsRef.current[socketListId].addStream(window.localStream);
          }
        });

        if (id === socketIdRef.current) {
          for (let id2 in connectionsRef.current) {
            if (id2 === socketIdRef.current) continue;

            try {
              connectionsRef.current[id2].addStream(window.localStream);
            } catch (e) {}

            connectionsRef.current[id2].createOffer().then((description) => {
              connectionsRef.current[id2]
                .setLocalDescription(description)
                .then(() => {
                  socketRef.current.emit(
                    "signal",
                    id2,
                    JSON.stringify({
                      sdp: connectionsRef.current[id2].localDescription,
                    }),
                  );
                })
                .catch((e) => console.error(e));
            });
          }
        }
      });
    });
  };

  const gotMessageFromServer = (fromId, message) => {
    var signal = JSON.parse(message);

    if (fromId !== socketIdRef.current) {
      if (signal.sdp) {
        connectionsRef.current[fromId]
          .setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            if (signal.sdp.type === "offer") {
              connectionsRef.current[fromId]
                .createAnswer()
                .then((description) => {
                  connectionsRef.current[fromId]
                    .setLocalDescription(description)
                    .then(() => {
                      socketRef.current.emit(
                        "signal",
                        fromId,
                        JSON.stringify({
                          sdp: connectionsRef.current[fromId].localDescription,
                        }),
                      );
                    })
                    .catch((e) => console.error(e));
                })
                .catch((e) => console.error(e));
            }
          })
          .catch((e) => console.error(e));
      }

      if (signal.ice) {
        connectionsRef.current[fromId]
          .addIceCandidate(new RTCIceCandidate(signal.ice))
          .catch((e) => console.error(e));
      }
    }
  };

  // --- MEDIA HELPERS ---

  const silence = () => {
    let ctx = new AudioContext();
    let oscillator = ctx.createOscillator();
    let dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    ctx.resume();
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
  };

  const black = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), {
      width,
      height,
    });
    canvas.getContext("2d").fillRect(0, 0, width, height);
    let stream = canvas.captureStream();
    return Object.assign(stream.getVideoTracks()[0], { enabled: false });
  };

  // --- REVERT BACK TO CAMERA LOGIC ---
  const getUserMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.error(e);
    }

    window.localStream = stream;
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;

    for (let id in connectionsRef.current) {
      if (id === socketIdRef.current) continue;

      connectionsRef.current[id].addStream(window.localStream);
      connectionsRef.current[id].createOffer().then((description) => {
        connectionsRef.current[id]
          .setLocalDescription(description)
          .then(() => {
            socketRef.current.emit(
              "signal",
              id,
              JSON.stringify({
                sdp: connectionsRef.current[id].localDescription,
              }),
            );
          })
          .catch((e) => console.error(e));
      });
    }
  };

  const getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices
        .getUserMedia({ video: video, audio: audio })
        .then(getUserMediaSuccess)
        .catch((e) => console.error(e));
    } else {
      try {
        let tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (e) {}
    }
  };

  // --- SCREEN SHARE LOGIC ---
  const getDisplayMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.error(e);
    }

    window.localStream = stream;
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;

    // Push screen stream to all connected peers
    for (let id in connectionsRef.current) {
      if (id === socketIdRef.current) continue;

      connectionsRef.current[id].addStream(window.localStream);
      connectionsRef.current[id].createOffer().then((description) => {
        connectionsRef.current[id]
          .setLocalDescription(description)
          .then(() => {
            socketRef.current.emit(
              "signal",
              id,
              JSON.stringify({
                sdp: connectionsRef.current[id].localDescription,
              }),
            );
          })
          .catch((e) => console.error(e));
      });
    }

    // Automatically revert to camera if user clicks "Stop sharing" on the browser's native popup
    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          setScreen(false);
          try {
            let tracks = localVideoRef.current.srcObject.getTracks();
            tracks.forEach((t) => t.stop());
          } catch (e) {
            console.error(e);
          }
          getUserMedia(); // Re-fetch camera
        }),
    );
  };

  const handleScreen = () => {
    if (!screen) {
      // Turn screen sharing ON
      if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: true })
          .then((stream) => {
            getDisplayMediaSuccess(stream);
            setScreen(true);
          })
          .catch((e) => console.error("Error sharing screen:", e));
      }
    } else {
      // Turn screen sharing OFF manually
      setScreen(false);
      try {
        let tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (e) {}
      getUserMedia(); // Re-fetch camera
    }
  };

  // --- OTHER UI HANDLERS ---
  const handleVideo = () => setVideo(!video);
  const handleAudio = () => setAudio(!audio);

  const handleEndCall = () => {
    try {
      let tracks = localVideoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    } catch (e) {}
    window.location.href = "/home";
  };

  const sendMessage = (msg) => {
    if (msg.trim() && socketRef.current) {
      socketRef.current.emit("chat-message", msg, username);
    }
  };

  const clearNewMessages = () => setNewMessages(0);

  return {
    localVideoRef,
    videoAvailable,
    audioAvailable,
    screenAvailable,
    video,
    audio,
    screen,
    videos,
    messages,
    newMessages,
    connect,
    handleVideo,
    handleAudio,
    handleScreen,
    handleEndCall,
    sendMessage,
    clearNewMessages,
  };
}
