import AgentAPI from "apminsight";
AgentAPI.config();
import cors from "cors";
import express from "express";
import http from "http";

import { matchRouter } from "./routes/matches.js";
import { commentaryRouter } from "./routes/commentary.js";
import { attachWebSocketServer } from "./ws/server.js";
import { securityMiddleware } from "./arcjet.js";

const app = express();

// Railway automatically sets PORT
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(securityMiddleware());

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Sportz API 🚀",
  });
});

// API routes
app.use("/matches", matchRouter);
app.use("/matches/:id/commentary", commentaryRouter);

// Create HTTP server
const server = http.createServer(app);

// Attach WebSocket server
const { broadcastMatchCreated, broadcastCommentary } =
  attachWebSocketServer(server);

// Make broadcast functions available in routes
app.locals.broadcastMatchCreated = broadcastMatchCreated;
app.locals.broadcastCommentary = broadcastCommentary;

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 WebSocket available at ws://localhost:${PORT}/ws`);
});