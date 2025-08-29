import {
  setSelectedImages,
  setCurrentIndex,
} from "@features/Thumbnails/model/thumbnailsStore";
import { useEffect } from "react";

export default function useResetSelection(
  containerRef: React.RefObject<HTMLDivElement>
) {
  useEffect(() => {
    setSelectedImages([]);
    setCurrentIndex(0);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [setSelectedImages, setCurrentIndex, containerRef]);
}
