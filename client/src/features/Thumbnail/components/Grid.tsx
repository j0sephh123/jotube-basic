import { useStore } from "@/store/store";
import ThumbnailGridCell from "./ThumbnailGridCell";

type Props = {
  gridData: { rows: number; cols: number };
  spacing: number;
  handleZoom: (index: number) => void;
  batch: number;
  perRow: number;
};

export default function Grid({
  gridData,
  spacing,
  handleZoom,
  batch,
  perRow,
}: Props): JSX.Element {
  const { selectedImages, toggleSelectedImage } = useStore();

  return (
    <div
      className="absolute inset-0 grid"
      style={{
        gridTemplateColumns: `repeat(${gridData.cols}, 1fr)`,
        gridTemplateRows: `repeat(${gridData.rows}, 1fr)`,
        gap: `${spacing}px`,
      }}
    >
      {Array.from({ length: gridData.rows * gridData.cols }).map((_, index) => (
        <ThumbnailGridCell
          key={index}
          index={index}
          selectedImages={selectedImages}
          handleSelect={(i, b, p) => toggleSelectedImage(i, b, p)}
          handleZoom={handleZoom}
          batch={batch}
          perRow={perRow}
        />
      ))}
    </div>
  );
}
