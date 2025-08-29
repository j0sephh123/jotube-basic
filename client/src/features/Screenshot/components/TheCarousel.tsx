import { Lightbox } from "@shared/ui";
import {
  setSlides,
  useCarouselScreenshotsState,
} from "../model/carouselScreenshotsStore";

export default function TheCarousel() {
  const { slides } = useCarouselScreenshotsState();
  const onClose = () => setSlides([]);

  if (slides.length === 0) return null;

  return <Lightbox slides={slides} open={slides.length > 0} close={onClose} />;
}
