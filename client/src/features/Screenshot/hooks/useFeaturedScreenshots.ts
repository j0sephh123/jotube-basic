import { createFeaturedScreenshot } from "@shared/utils";
import { useMemo, useState } from "react";
import type { FeaturedScreenshotResponse } from "@shared/api";

export function useFeaturedScreenshots(
  featuredScreenshots: FeaturedScreenshotResponse[],
  src: string
) {
  const [currentFeaturedScreenshotIndex, setCurrentFeaturedScreenshotIndex] =
    useState(0);
  const getSrc = useMemo(() => {
    if (featuredScreenshots.length < 2) {
      const first = featuredScreenshots[0];
      return first ? createFeaturedScreenshot(first.src) : src;
    }

    return createFeaturedScreenshot(
      featuredScreenshots[currentFeaturedScreenshotIndex]?.src || src
    );
  }, [featuredScreenshots, src, currentFeaturedScreenshotIndex]);
  const handleThumbnailClick = () => {
    if (featuredScreenshots.length > 1) {
      setCurrentFeaturedScreenshotIndex(
        (currentFeaturedScreenshotIndex + 1) % featuredScreenshots.length
      );
    }
  };

  return { getSrc, handleThumbnailClick };
} 