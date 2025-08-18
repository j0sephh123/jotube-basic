import { useThumbnailsSlice } from "@store/store";
import { useEffect } from "react";

export default function useResetSelection(
  containerRef: React.RefObject<HTMLDivElement>
) {
  const { setSelectedImages, setCurrentIndex } = useThumbnailsSlice();

  useEffect(() => {
    setSelectedImages([]);
    setCurrentIndex(0);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [setSelectedImages, setCurrentIndex, containerRef]);
}
