import { HoverableDiv } from "@features/Thumbnail/components/HoverableDiv";

type Props = {
  index: number;
  selectedImages: number[];
  handleSelect: (index: number, batch: number, perRow: number) => void;
  handleZoom: (index: number) => void;
  batch: number;
  perRow: number;
};

export default function ThumbnailGridCell({
  index,
  selectedImages,
  handleSelect,
  handleZoom,
  batch,
  perRow,
}: Props): JSX.Element {
  const imageIndex = batch * 40 + index + 1;

  return (
    <div
      key={index}
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        border: selectedImages.includes(imageIndex)
          ? "2px solid #00FF00"
          : "none",
      }}
    >
      <HoverableDiv
        onClick={() => {
          handleSelect(index, batch, perRow);
        }}
        color="rgba(0, 0, 255, 0.2)"
      />
      <HoverableDiv
        onClick={() => handleZoom(imageIndex)}
        color="rgba(255, 0, 0, 0.2)"
      />
    </div>
  );
}
