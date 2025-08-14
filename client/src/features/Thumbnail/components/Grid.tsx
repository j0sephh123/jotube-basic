import { useThumbnailsSlice, useZoom } from "@/store/store";
import ThumbnailGridCell from "./ThumbnailGridCell";
import { generateThumbnailUrl } from "@/shared/utils/image";
import { PER_ROW, SPACING } from "../utils/constants";

type Props = {
  gridData: { rows: number; cols: number };
  cacheBuster: number;
};

export default function Grid({
  gridData,
  cacheBuster,
}: Props): JSX.Element {
  const {
    currentIndex: batch,
    selectedImages,
    toggleSelectedImage,
    setSelectedImages,
    metadata: { ytChannelId, ytVideoId },
  } = useThumbnailsSlice();
  const { setZoom } = useZoom();

  const handleZoom = (index: number): void => {
    const url = `${generateThumbnailUrl(
      ytChannelId,
      ytVideoId,
      index
    )}?v=${cacheBuster}`;
    setZoom(true, url, () => {});
    setSelectedImages((prev) => [...prev, index]);
  };

  return (
    <div
      className="absolute inset-0 grid"
      style={{
        gridTemplateColumns: `repeat(${gridData.cols}, 1fr)`,
        gridTemplateRows: `repeat(${gridData.rows}, 1fr)`,
        gap: `${SPACING}px`,
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
          perRow={PER_ROW}
        />
      ))}
    </div>
  );
}
