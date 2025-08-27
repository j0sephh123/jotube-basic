/* eslint-disable import/no-internal-modules */
/* eslint-disable boundaries/element-types */
import { useLazyQuery } from "@apollo/client";
import { GET_SHUFFLED_SCREENSHOTS } from "@entities/Screenshot";
import type { SlideImage } from "yet-another-react-lightbox";
import { useCarouselScreenshots } from "@app/providers/store/store";
import { type ChannelScreenshot } from "./useFetchChannelScreenshots";

export function useScreenshotsForCarousel() {
  const [getScreenshotsQuery] = useLazyQuery(GET_SHUFFLED_SCREENSHOTS, {
    fetchPolicy: "no-cache",
  });
  const { setSlides } = useCarouselScreenshots();

  const handleFetch = async (ytChannelIds: string[]) => {
    try {
      const result = await getScreenshotsQuery({
        variables: {
          input: { ytChannelIds },
        },
      });
      const data = result.data?.getScreenshots || [];
      const transformedData: SlideImage[] = data.map(
        (item: ChannelScreenshot) => ({
          type: "image",
          src: item.src,
          alt: `Screenshot at ${item.second}s from video ${item.ytVideoId}`,
        })
      );
      setSlides(transformedData);
    } catch (error) {
      console.log(error);
    }
  };

  return handleFetch;
}
