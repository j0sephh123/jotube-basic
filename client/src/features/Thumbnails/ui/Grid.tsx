import {
  ThumbnailGridCell,
  COLUMNS,
  GRID_DATA,
  SPACING,
} from "@features/Thumbnails";
import {
  toggleSelectedImage,
  useThumbnailsProcessingState,
} from "@shared/store";

type Props = {
  handleZoom: (index: number) => void;
};

export default function Grid({ handleZoom }: Props): JSX.Element {
  const { currentIndex: batch, selectedItems: selectedImages } =
    useThumbnailsProcessingState();

  return (
    <div
      className="absolute inset-0 grid"
      style={{
        gridTemplateColumns: `repeat(${GRID_DATA.cols}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_DATA.rows}, 1fr)`,
        gap: `${SPACING}px`,
      }}
    >
      {Array.from({ length: GRID_DATA.rows * GRID_DATA.cols }).map(
        (_, index) => (
          <ThumbnailGridCell
            key={index}
            index={index}
            selectedImages={selectedImages as number[]}
            handleSelect={(i, b) => toggleSelectedImage(i, b)}
            handleZoom={handleZoom}
            batch={batch}
            perRow={COLUMNS}
          />
        )
      )}
    </div>
  );
}
