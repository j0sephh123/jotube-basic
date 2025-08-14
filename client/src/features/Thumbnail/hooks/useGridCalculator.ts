import { useEffect, useState } from "react";
import { calculateGridDimensions } from "../utils/calculateGridDimensions";
import { PER_ROW, SPACING } from "../utils/constants";

export const useGridCalculator = (
  imageRef: React.RefObject<HTMLImageElement>
) => {
  const [gridData, setGridData] = useState<{ rows: number; cols: number }>({
    rows: 0,
    cols: PER_ROW,
  });

  const calculateGridData = (): void => {
    if (imageRef.current) {
      const imageWidth = imageRef.current.clientWidth;
      const imageHeight = imageRef.current.clientHeight;
      setGridData({
        ...calculateGridDimensions(imageWidth, imageHeight, PER_ROW, SPACING),
        cols: PER_ROW,
      });
    }
  };

  useEffect(() => {
    calculateGridData();
    window.addEventListener("resize", calculateGridData);
    return () => {
      window.removeEventListener("resize", calculateGridData);
    };
  }, [imageRef]);

  return { gridData, calculateGridData };
};
