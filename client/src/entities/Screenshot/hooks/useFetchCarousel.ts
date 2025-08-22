import { useLazyQuery } from "@apollo/client";
import { useSlides } from "@features/Screenshot/hooks/useSlides";
import { GET_SLIDES } from "@entities/Screenshot";
import type { SlideImage } from "yet-another-react-lightbox";

export type FetchCarouselDataRequest = string[];

export type GetSlidesResponse = {
  __typename?: "GetSlidesResponse";
  id: number;
  src: string;
  ytVideoId: string;
  second: number;
  isFav?: boolean | null;
};

export function useFetchCarousel() {
  const { setSlides } = useSlides();

  const [getSlides] = useLazyQuery(GET_SLIDES, {
    fetchPolicy: "no-cache",
  });

  const handleFetch = async (body: FetchCarouselDataRequest) => {
    try {
      const result = await getSlides({
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
