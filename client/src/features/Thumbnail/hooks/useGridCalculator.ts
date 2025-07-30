import { useEffect, useState } from "react";
import { calculateGridDimensions } from "../utils/calculateGridDimensions";

export const useGridCalculator = (
  imageRef: React.RefObject<HTMLImageElement>,
  cols: number,
  spacing: number
) => {
  const [gridData, setGridData] = useState<{ rows: number; cols: number }>({
    rows: 0,
    cols,
  });

  const calculateGridData = (): void => {
    if (imageRef.current) {
      const imageWidth = imageRef.current.clientWidth;
      const imageHeight = imageRef.current.clientHeight;
      setGridData({
        ...calculateGridDimensions(imageWidth, imageHeight, cols, spacing),
        cols,
      });
    }
  };

  useEffect(() => {
    calculateGridData();
    window.addEventListener("resize", calculateGridData);
    return () => {
      window.removeEventListener("resize", calculateGridData);
    };
  }, [imageRef, cols, spacing]);

  return { gridData, calculateGridData };
};
