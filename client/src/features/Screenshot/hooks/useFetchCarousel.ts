import { useLazyQuery } from "@apollo/client";
import { useStore } from "@/store/store";
import { GET_SLIDES } from "@/shared/api/graphql/screenshotQueries";

export type FetchCarouselDataRequest = string[];

export function useFetchCarousel() {
  const { setSlides } = useStore();

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
      setSlides(data);
    } catch (error) {
      console.log(error);
    }
  };

  return handleFetch;
}
