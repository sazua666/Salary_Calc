"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useLiveVisitorCount() {
  const [count, setCount] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // Generate a random session ID to track uniqueness if needed
    const sessionId =
      sessionStorage.getItem("sessionId") ||
      Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem("sessionId", sessionId);

    const socket: Socket = io({
      path: "/api/socketio",
      query: { sessionId },
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      setIsConnected(true);
      setError(false);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("connect_error", () => {
      setIsConnected(false);
      setError(true);
    });

    socket.on("visitorCountUpdate", (newCount: number) => {
      setCount(newCount);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { count, isConnected, error };
}
