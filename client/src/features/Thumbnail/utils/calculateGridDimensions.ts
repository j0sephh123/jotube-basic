export const calculateGridDimensions = (
  imageWidth: number,
  imageHeight: number,
  cols: number,
  spacing: number
): { rows: number; cols: number } => {
  const cellWidth = Math.floor((imageWidth - (cols - 1) * spacing) / cols);
  const cellHeight = Math.floor(cellWidth * (9 / 16));
  const rows = Math.ceil((imageHeight + spacing) / (cellHeight + spacing));
  return { rows, cols };
};
