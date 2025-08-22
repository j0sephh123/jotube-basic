import { useState, useEffect, useCallback } from "react";

export const useZoom = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [onClose, setOnClose] = useState<() => void>(() => () => {});

  const closeZoom = useCallback(() => {
    setIsVisible(false);
    setUrl("");
    onClose();
    setOnClose(() => () => {});
  }, [onClose]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isVisible) {
        closeZoom();
      }
    };

    if (isVisible) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isVisible, closeZoom]);

  const setZoom = (
    visible: boolean,
    imageUrl: string,
    closeCallback: () => void
  ) => {
    setIsVisible(visible);
    setUrl(imageUrl);
    setOnClose(() => closeCallback);
  };

  return {
    isVisible,
    url,
    onClose,
    setZoom,
    closeZoom,
  };
};
