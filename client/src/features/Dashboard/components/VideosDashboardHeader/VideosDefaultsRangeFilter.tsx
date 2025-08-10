import { useMemo, useEffect } from "react";
import { useVideosDashboardContext } from "../../hooks/useVideosDashboardContext";
import { useStore } from "@/store/store";
import { VideosDashboardSlice } from "@/store/store-types";
import VideosRangePicker from "./VideosRangePicker";

type VideosRequestBodyKey = keyof VideosDashboardSlice["videosRequestBody"];

type VideosDefaultsRangeFilterBaseProps = {
  rangeKey: string;
  minKey: VideosRequestBodyKey;
  maxKey: VideosRequestBodyKey;
};

export function VideosDefaultsRangeFilterBase({
  rangeKey,
  minKey,
  maxKey,
}: VideosDefaultsRangeFilterBaseProps) {
  const { videosRequestBody } = useVideosDashboardContext();
  const { setVideosRangePicker, getVideosRangePicker } = useStore();
  const rangePicker = getVideosRangePicker(rangeKey);

  const currentFilter = useMemo(
    () => ({
      min: (videosRequestBody[minKey] as number) || 0,
      max: (videosRequestBody[maxKey] as number | null) || null,
    }),
    [videosRequestBody[minKey], videosRequestBody[maxKey]]
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
  ]);

  return (
    <div className="flex items-center gap-2">
      <VideosRangePicker rangeKey={rangeKey} />
    </div>
  );
}

export default function VideosDefaultsRangeFilter() {
  return (
    <VideosDefaultsRangeFilterBase
      rangeKey="defaultScreenshots"
      minKey="defaultMinScreenshots"
      maxKey="defaultMaxScreenshots"
    />
  );
}
