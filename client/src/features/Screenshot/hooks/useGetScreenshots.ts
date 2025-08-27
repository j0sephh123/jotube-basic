/* eslint-disable import/no-internal-modules */
/* eslint-disable boundaries/element-types */
import { useLazyQuery } from "@apollo/client";
import { GET_SLIDES } from "@entities/Screenshot";
import type { SlideImage } from "yet-another-react-lightbox";
import { useSlides } from "@app/providers/store/store";

export type FetchCarouselDataRequest = string[];

export type GetSlidesResponse = {
  __typename?: "GetSlidesResponse";
  id: number;
  src: string;
  ytVideoId: string;
  second: number;
  isFav?: boolean | null;
};

export function useGetScreenshots() {
  const [getSlidesQuery] = useLazyQuery(GET_SLIDES, {
    fetchPolicy: "no-cache",
  });
  const { setSlides } = useSlides();

  const handleFetch = async (body: FetchCarouselDataRequest) => {
    try {
      const result = await getSlidesQuery({
        variables: {
          input: { ytChannelIds: body },
        },
      });
      const data = result.data?.getSlides || [];
      const transformedData: SlideImage[] = data.map(
        (item: GetSlidesResponse) => ({
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
