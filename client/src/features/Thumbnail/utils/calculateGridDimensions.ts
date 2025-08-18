import { COLUMNS, SPACING } from "@features/Thumbnail/utils/constants";

export const calculateGridDimensions = (
  imageWidth: number,
  imageHeight: number
): { rows: number; cols: number } => {
  const cellWidth = Math.floor(
    (imageWidth - (COLUMNS - 1) * SPACING) / COLUMNS
  );
  const cellHeight = Math.floor(cellWidth * (9 / 16));
  const rows = Math.ceil((imageHeight + SPACING) / (cellHeight + SPACING));

  return { rows, cols: COLUMNS };
};
