/* eslint-disable import/no-internal-modules */
/* eslint-disable boundaries/element-types */
import { setSlides } from "../model/carouselScreenshotsStore";
import {
  type GetScreenshotsInput,
  useGetScreenshotsLazyQuery,
} from "@shared/api";

export function useScreenshotsForCarousel(ytVideoId?: string) {
  const [getScreenshotsQuery] = useGetScreenshotsLazyQuery({
    fetchPolicy: "no-cache",
  });
  const handleFetch = async (channelIds: GetScreenshotsInput["channelIds"]) => {
    try {
      const result = await getScreenshotsQuery({
        variables: {
          input: { channelIds, type: "channel", shuffle: true },
        },
      });
      if (!result.data) return;
      if (ytVideoId) {
        result.data.getScreenshots = result.data.getScreenshots.filter(
          (item) => item.ytVideoId === ytVideoId
        );
      }
      const transformedData = result.data?.getScreenshots.map((item) => ({
        type: "image" as const,
        src: item.src,
        alt: `Screenshot at ${item.second}s from video ${item.ytVideoId}`,
      }));

      if (transformedData) {
        setSlides(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return handleFetch;
}
