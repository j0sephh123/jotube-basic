import { setZoom } from "@features/Screenshot";
import {
  ThumbnailGridCell,
  COLUMNS,
  GRID_DATA,
  SPACING,
} from "@features/Thumbnails";
import {
  toggleSelectedImage,
  setSelectedImages,
  useProcessingState,
} from "@shared/store";
import { generateThumbnailUrl } from "@shared/utils";

export default function Grid(): JSX.Element {
  const {
    currentIndex: batch,
    selectedItems: selectedImages,
    items: thumbnailsProcessingData,
  } = useProcessingState();

  const handleZoom = (index: number): void => {
    const url = generateThumbnailUrl(
      thumbnailsProcessingData[0]?.ytChannelId ?? "",
      thumbnailsProcessingData[0]?.ytVideoId ?? "",
      index
    );
    setZoom(url);
    setSelectedImages((prev) => [...prev, index]);
  };

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
