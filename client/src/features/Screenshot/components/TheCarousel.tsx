import { Lightbox } from "@shared/ui";
import {
  setSlides,
  useCarouselScreenshotsState,
} from "@features/Screenshot";
import type { SlideImage } from "yet-another-react-lightbox";

export default function TheCarousel() {
  const { slides } = useCarouselScreenshotsState();
  const onClose = () => setSlides([]);

  if (slides.length === 0) return null;

  return (
    <Lightbox
      slides={slides as SlideImage[]}
      open={slides.length > 0}
      close={onClose}
    />
  );
}
