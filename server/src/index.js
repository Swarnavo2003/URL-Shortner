import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "./config/mongo.config.js";

const PORT = process.env.PORT || 3000;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io);

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // User joins their personal dashboard room
  socket.on("join-dashboard", (userId) => {
    socket.join(`user-${userId}`);
    console.log(`User ${userId} joined dashboard room`);
  });

  // Handle anonymous users (no userId)
  socket.on("join-anonymous", () => {
    socket.join("anonymous-users");
    console.log("Anonymous user joined dashboard");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port http://localhost:3000");
});

export { io };
