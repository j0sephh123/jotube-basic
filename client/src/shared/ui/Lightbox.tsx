import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Lightbox from "yet-another-react-lightbox";
import type { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";

type LightboxProps = {
  slides: SlideImage[];
  open: boolean;
  close: () => void;
  animation?: {
    fade: number;
    swipe: number;
  };
  slideshow?: {
    delay: number;
  };
};

export default function LightboxComponent({
  slides,
  open,
  close,
  animation = { fade: 0, swipe: 0 },
  slideshow = { delay: 1500 },
}: LightboxProps) {
  return (
    <Lightbox
      slides={slides}
      open={open}
      animation={animation}
      close={close}
      plugins={[Fullscreen, Slideshow, Zoom, Counter]}
      slideshow={slideshow}
    />
  );
}
