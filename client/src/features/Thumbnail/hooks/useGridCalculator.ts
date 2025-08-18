import { useState } from "react";
import { calculateGridDimensions } from "@features/Thumbnail/utils/calculateGridDimensions";
import { COLUMNS } from "@features/Thumbnail/utils/constants";

export const useGridCalculator = (
  imageRef: React.RefObject<HTMLImageElement>
) => {
  const [gridData, setGridData] = useState<{ rows: number; cols: number }>({
    rows: 0,
    cols: COLUMNS,
  });

  console.log(gridData);

  const calculateGridData = (): void => {
    if (imageRef.current) {
      const imageWidth = imageRef.current.clientWidth;
      const imageHeight = 680;
      setGridData({
        ...calculateGridDimensions(imageWidth, imageHeight),
        cols: COLUMNS,
      });
    }
  };

  return {
    gridData: {
      rows: gridData.rows,
      cols: COLUMNS,
    },
    calculateGridData,
  };
};
