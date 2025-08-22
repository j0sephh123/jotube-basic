import { useMemo, useEffect } from "react";
import {
  useVideosDashboardContext,
  useVideosRangePickers,
} from "@features/Dashboard";
import VideosRangePicker from "./VideosRangePicker";

type VideosRequestBodyKey =
  | "sortOrder"
  | "page"
  | "minScreenshots"
  | "maxScreenshots";

type VideosRangeFilterBaseProps = {
  rangeKey: string;
  minKey: VideosRequestBodyKey;
  maxKey: VideosRequestBodyKey;
};

export function VideosRangeFilterBase({
  rangeKey,
  minKey,
  maxKey,
}: VideosRangeFilterBaseProps) {
  const { videosRequestBody } = useVideosDashboardContext();
  const { setVideosRangePicker, getVideosRangePicker } =
    useVideosRangePickers();
  const rangePicker = getVideosRangePicker(rangeKey);

  const currentFilter = useMemo(
    () => ({
      min: (videosRequestBody[minKey] as number) || 0,
      max: (videosRequestBody[maxKey] as number | null) || null,
    }),
    [videosRequestBody, minKey, maxKey]
  );

  useEffect(() => {
    if (!rangePicker) return;
    const maxValue =
      currentFilter.max === null ? rangePicker.max : currentFilter.max;
    const shouldUpdate =
      rangePicker.values[0] !== currentFilter.min ||
      rangePicker.values[1] !== maxValue;
    if (shouldUpdate) {
      setVideosRangePicker(rangeKey, {
        values: [currentFilter.min, maxValue],
        min: rangePicker.min,
        max: rangePicker.max,
        stepSize: rangePicker.stepSize,
      });
    }
  }, [
    currentFilter.min,
    currentFilter.max,
    setVideosRangePicker,
    rangePicker,
    rangeKey,
    maxKey,
    minKey,
    videosRequestBody,
  ]);

  return (
    <div className="flex items-center gap-2">
      <VideosRangePicker rangeKey={rangeKey} />
    </div>
  );
}

export default function VideosRangeFilter() {
  return (
    <VideosRangeFilterBase
      rangeKey="screenshots"
      minKey="minScreenshots"
      maxKey="maxScreenshots"
    />
  );
}
