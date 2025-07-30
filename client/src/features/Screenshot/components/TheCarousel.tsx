import { useStore } from "@/store/store";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";

export default function TheCarousel() {
  const onClose = () => setSlides([]);
  const { slides, setSlides } = useStore();

  if (slides.length === 0) return null;

  return (
    <Lightbox
      slides={slides}
      open={slides.length > 0}
      animation={{
        fade: 0,
        swipe: 0,
      }}
      close={onClose}
      plugins={[Fullscreen, Slideshow, Zoom, Counter]}
      slideshow={{
        delay: 1500,
      }}
    />
  );
}
