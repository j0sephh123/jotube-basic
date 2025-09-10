import {
  SelectSortDirection,
  VideosDashboard,
  ViewTypeToggle,
} from "@widgets/Dashboard";
import { DashboardType } from "@features/Dashboard";
import { useTypedParams } from "@shared/hooks";
import { RangePicker } from "@widgets/RangePicker";

export default function VideosDashboardPage() {
  const { type } = useTypedParams("DashboardParams");

  return (
    <div className="h-screen flex flex-col p-2 pb-14">
      <div className="bg-base-100 rounded-lg flex flex-col h-full">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <SelectSortDirection />
            {type === DashboardType.CHANNELS && <ViewTypeToggle />}
            {type === DashboardType.CHANNELS && (
              <>
                <RangePicker
                  minLabel="Min"
                  maxLabel="Max"
                  minKey="min"
                  maxKey="max"
                  identifier="videosMinMax"
                />
                <RangePicker
                  minLabel="Default Min"
                  maxLabel="Default Max"
                  minKey="defaultMin"
                  maxKey="defaultMax"
                  identifier="videosDefaultMinMax"
                />
              </>
            )}
          </div>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto px-4">
          <VideosDashboard />
        </div>
      </div>
    </div>
  );
}
