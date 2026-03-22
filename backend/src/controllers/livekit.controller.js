import { AccessToken } from "livekit-server-sdk";

const createToken = async (req, res) => {
  const { roomName, participantName } = req.body;

  if (!roomName || !participantName) {
    return res
      .status(400)
      .json({ message: "roomName and participantName are required" });
  }

  try {
    // These keys will come from your free LiveKit Cloud account
    const apiKey = process.env.LIVEKIT_API_KEY || "devkey";
    const apiSecret = process.env.LIVEKIT_API_SECRET || "secret";

    // Create a new token for the user
    const at = new AccessToken(apiKey, apiSecret, {
      identity: participantName,
      name: participantName,
    });

    // Grant the user permission to join the specific room and publish video/audio
    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
    });

    // Sign the token and send it back to React
    const token = await at.toJwt();
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error generating LiveKit token:", error);
    res.status(500).json({ message: "Failed to generate token" });
  }
};

export { createToken };
