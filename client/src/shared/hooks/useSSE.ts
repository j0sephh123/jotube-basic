import { useEffect, useRef } from "react";
import { useStore } from "@/store/store";
import { useRefetchChannelMetadata } from "@/features/Channel/hooks/useChannelMetadata";

export type SSEEventData = {
  type: string;
  ytVideoId: string;
  progress?: string;
};

export function useSSE() {
  const { eventSource, setEventSource, setOperation } = useStore();
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isConnectingRef = useRef(false);

  useEffect(() => {
    if (
      !eventSource &&
      !document.body.hasAttribute("data-sse-connected") &&
      !isConnectingRef.current
    ) {
      isConnectingRef.current = true;
      document.body.setAttribute("data-sse-connected", "true");

      const newEventSource = new EventSource(
        "http://localhost:3003/sse/updates"
      );

      newEventSource.onopen = () => {
        isConnectingRef.current = false;
        setEventSource(newEventSource);
      };

      newEventSource.onmessage = (event) => {
        const data = JSON.parse(event.data) as SSEEventData;
        if (data.type === "keep-alive") return;

        console.log(data.type);

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
        }
      };

      newEventSource.onerror = (error) => {
        console.error("SSE error:", error);
        isConnectingRef.current = false;

        if (newEventSource) {
          newEventSource.close();
          setEventSource(null);
          document.body.removeAttribute("data-sse-connected");

          if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
          }

          reconnectTimeoutRef.current = setTimeout(() => {
            if (
              !document.body.hasAttribute("data-sse-connected") &&
              !isConnectingRef.current
            ) {
              isConnectingRef.current = true;
              document.body.setAttribute("data-sse-connected", "true");
              const reconnectEventSource = new EventSource(
                "http://localhost:3003/sse/updates"
              );
              setEventSource(reconnectEventSource);
            }
          }, 1000);
        }
      };
    }

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      isConnectingRef.current = false;

      if (eventSource) {
        eventSource.close();
        setEventSource(null);
        document.body.removeAttribute("data-sse-connected");
      }
    };
  }, [setEventSource, setOperation, refetchChannelMetadata]);
}
