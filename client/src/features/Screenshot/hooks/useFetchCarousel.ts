import { useMutation } from "@tanstack/react-query";
import { useStore } from "@/store/store";
import nestFetcher from "@/shared/api/nestFetcher";
import { SlideImage } from "yet-another-react-lightbox";

export type FetchCarouselDataRequest = string[];

export function useFetchCarousel() {
  const { setSlides } = useStore();

  const { mutateAsync } = useMutation<
    SlideImage[],
    unknown,
    FetchCarouselDataRequest
  >({
    mutationFn: (body) =>
      nestFetcher({
        url: "/thumbnails-api",
        method: "POST",
        body,
      }),
  });

  const handleFetch = async (body: FetchCarouselDataRequest) => {
    try {
      const data = await mutateAsync(body);
      setSlides(data);
    } catch (error) {
      console.log(error);
    }
  };

  return handleFetch;
}
