import { useEffect } from "react";
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

  useEffect(() => {
    if (!eventSource && !document.body.hasAttribute("data-sse-connected")) {
      document.body.setAttribute("data-sse-connected", "true");
      const newEventSource = new EventSource(
        "http://localhost:3003/sse/updates"
      );
      setEventSource(newEventSource);

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
            refetchChannelMetadata('');
            break;
        }
      };

      newEventSource.onerror = (error) => {
        console.error("SSE error:", error);
        if (newEventSource) {
          newEventSource.close();
          setEventSource(null);
          document.body.removeAttribute("data-sse-connected");
          setTimeout(() => {
            if (
              !eventSource &&
              !document.body.hasAttribute("data-sse-connected")
            ) {
              document.body.setAttribute("data-sse-connected", "true");
              const newEventSource = new EventSource(
                "http://localhost:3003/sse/updates"
              );
              setEventSource(newEventSource);
            }
          }, 1000);
        }
      };
    }

    return () => {
      if (eventSource) {
        eventSource.close();
        setEventSource(null);
        document.body.removeAttribute("data-sse-connected");
      }
    };
  }, [eventSource, setEventSource, setOperation]);
}
