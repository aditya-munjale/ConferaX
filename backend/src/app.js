import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "node:http";
import livekitRoutes from "./routes/livekit.routes.js";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

import summaryRoutes from "./routes/summary.routes.js";

import libraryRoutes from "./routes/library.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/livekit", livekitRoutes);

app.use("/api/v1/meetings", summaryRoutes);

app.use("/api/v1/library", libraryRoutes);

const start = async () => {
  app.set("mongo_user");
  const connectionDb = await mongoose.connect(
    "mongodb+srv://imdigitalashish:imdigitalashish@cluster0.cujabk4.mongodb.net/",
  );

  console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("LISTENIN ON PORT 8000");
  });
};

start();
