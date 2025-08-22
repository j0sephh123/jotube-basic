import { useFetchCarousel } from "@shared/hooks";

export default function useViewScreenshots() {
  const fetchCarousel = useFetchCarousel();

  return (ytChannelIds: string[]) => {
    fetchCarousel(ytChannelIds);
  };
}
