import { memo } from "react";

type Props = {
  src: string;
};

const ThumbnailImage = memo(({ src }: Props) => {
  return (
    <img
      className="w-full"
      style={{ display: "block" }}
      src={src}
      alt="Thumbnail"
    />
  );
});

export default ThumbnailImage;
