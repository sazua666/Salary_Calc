import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  const io = new Server(server, {
    path: "/api/socketio",
    addTrailingSlash: false,
  });

  // Keep track of connected sessions
  const activeSessions = new Set();

  io.on("connection", (socket) => {
    // We can track by socket.id (which handles single tabs)
    // To handle unique browser sessions, we could use a query param or cookie
    const sessionId = socket.handshake.query.sessionId || socket.id;
    
    // Add to active sessions
    activeSessions.add(sessionId);
    
    // Broadcast updated count
    io.emit("visitorCountUpdate", activeSessions.size);

    socket.on("disconnect", () => {
      // Remove from active sessions
      activeSessions.delete(sessionId);
      // Broadcast updated count
      io.emit("visitorCountUpdate", activeSessions.size);
    });
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
