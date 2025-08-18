import { useEffect, useRef } from "react";
import { useStore } from "@store/store";
import { useRefetchChannelMetadata } from "@entities/Channel/model/useChannelMetadata";
import { io, Socket } from "socket.io-client";
import { EventTypes } from "@shared/types/types";
import { useRefetchQueue } from "@shared/hooks/useQueue";
import { API_BASE_URL } from "@shared/utils/globals";
  
export type ProcessEventData = {
  type: EventTypes;
  ytVideoId: string;
  progress?: string;
};

export function useWebSocket() {
  const refetchQueue = useRefetchQueue();
  const { setOperation } = useStore();
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const socketRef = useRef<Socket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isConnectingRef = useRef(false);

  useEffect(() => {
    if (
      !socketRef.current &&
      !document.body.hasAttribute("data-websocket-connected") &&
      !isConnectingRef.current
    ) {
      isConnectingRef.current = true;
      document.body.setAttribute("data-websocket-connected", "true");

      const socket = io(API_BASE_URL);
      socketRef.current = socket;

      socket.on("connect", () => {
        isConnectingRef.current = false;
      });

      socket.on("processEvent", (data: ProcessEventData) => {
        const filename = `${data.ytVideoId}.mp4`;
        switch (data.type) {
          case "download_start":
            setOperation("download", { filename, progress: "0" });
            break;
          case "download_progress":
            setOperation("download", { filename, progress: data.progress });
            break;
          case "download_finish":
            setOperation("download", null);
            break;
          case "screenshots_start":
            setOperation("screenshots", { filename, current: 0 });
            break;
          case "screenshots_progress":
            setOperation("screenshots", {
              filename,
              current: parseInt(data.progress || "0"),
            });
            break;
          case "screenshots_finish":
            setOperation("screenshots", null);
            break;
          case "thumbnails_start":
            setOperation("thumbnails", { filename });
            break;
          case "thumbnails_finish":
            setOperation("thumbnails", null);
            refetchChannelMetadata("");
            break;
          case "storyboard_created":
            console.log("storyboard_created", data.ytVideoId);
            refetchQueue();
            break;
          default:
            console.log("Unknown event:", data.type);
            break;
        }
      });

      socket.on("disconnect", () => {
        isConnectingRef.current = false;
        document.body.removeAttribute("data-websocket-connected");

        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }

        reconnectTimeoutRef.current = setTimeout(() => {
          if (
            !document.body.hasAttribute("data-websocket-connected") &&
            !isConnectingRef.current
          ) {
            isConnectingRef.current = true;
            document.body.setAttribute("data-websocket-connected", "true");
            const reconnectSocket = io(API_BASE_URL);
            socketRef.current = reconnectSocket;
          }
        }, 1000);
      });

      socket.on("connect_error", () => {
        isConnectingRef.current = false;
        document.body.removeAttribute("data-websocket-connected");
      });
    }

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      isConnectingRef.current = false;

      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        document.body.removeAttribute("data-websocket-connected");
      }
    };
  }, [setOperation, refetchChannelMetadata]);
}
