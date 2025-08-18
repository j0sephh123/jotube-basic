import { useFetchCarousel } from "@features/Screenshot/hooks/useFetchCarousel";

export default function useViewScreenshots() {
  const fetchCarousel = useFetchCarousel();

  return (ytChannelIds: string[]) => {
    fetchCarousel(ytChannelIds);
  };
}
