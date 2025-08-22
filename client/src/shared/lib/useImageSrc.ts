import { generateChannelAvatarUrl } from "@shared/utils/image";
import { useState, useEffect } from "react";

const placeholderAvatar =
  "https://linda-hoang.com/wp-content/uploads/2014/10/img-placeholder-dark.jpg";

export default function useImageSrc(src: string, ytId: string, id: number) {
  const localAvatar = generateChannelAvatarUrl(ytId, id.toString());
  const [imageSrc, setImageSrc] = useState<string>(src || localAvatar);

  useEffect(() => {
    if (src) {
      setImageSrc(src);
    } else {
      setImageSrc(localAvatar);
    }
  }, [src, localAvatar]);

  function handleImageError(): void {
    if (imageSrc === src) {
      setImageSrc(localAvatar);
    } else if (imageSrc === localAvatar) {
      setImageSrc(placeholderAvatar);
    } else {
      setImageSrc(placeholderAvatar);
    }
  }

  return { imageSrc, handleImageError };
}
