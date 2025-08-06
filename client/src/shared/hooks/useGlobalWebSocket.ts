import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface DeleteUploadsEvent {
  type: "delete-uploads";
  ytChannelId: string;
  ytVideoIds: string[];
  timestamp: Date;
  message: string;
}

export function useGlobalWebSocket() {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    console.log("Initializing global WebSocket connection...");
    socketRef.current = io("http://localhost:3003");

    socketRef.current.on("connect", () => {
      console.log("Global WebSocket connected to server");
    });

    socketRef.current.on("disconnect", () => {
      console.log("Global WebSocket disconnected from server");
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("Global WebSocket connection error:", error);
    });

    socketRef.current.on("deleteUploadsEvent", (event: DeleteUploadsEvent) => {
      console.log("Global WebSocket - Delete uploads event received:", event);
    });

    return () => {
      console.log("Cleaning up global WebSocket connection...");
      socketRef.current?.disconnect();
    };
  }, []);

  return socketRef.current;
}
