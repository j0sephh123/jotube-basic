import type { GalleryItemProps, WithSrc } from "./types";

export function GalleryItem({ item, src }: GalleryItemProps<WithSrc>) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <img src={src} alt={item.src} />
    </div>
  );
}
