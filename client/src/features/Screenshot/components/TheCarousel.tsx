import { useSlides } from "@features/Screenshot";
import { Lightbox } from "@shared/ui";

export default function TheCarousel() {
  const { slides, setSlides } = useSlides();
  const onClose = () => setSlides([]);

  if (slides.length === 0) return null;

  return <Lightbox slides={slides} open={slides.length > 0} close={onClose} />;
}
