import { generateChannelAvatarUrl } from "@shared/utils";
import { useState, useEffect } from "react";

const placeholderAvatar =
  "https://linda-hoang.com/wp-content/uploads/2014/10/img-placeholder-dark.jpg";

/**
 * Priority should be the following:
 * 
 * 1. if avatar is present, then show it
 * 2. show an image from saved screenshots
 * 3. show youtube src
 * 4. show placeholder
 */
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
