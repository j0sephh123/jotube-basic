import { SelectSortDirection, ViewTypeToggle } from "@widgets/Dashboard";
import { type ViewType } from "@features/Dashboard";
import { useTypedParams } from "@shared/hooks";
import { RangePicker } from "@widgets/RangePicker";
import ChannelsDashboard from "./ChannelsDashboard";

export default function ChannelsDashboardPage() {
  const { viewType } = useTypedParams("DashboardParams");

  return (
    <div className="h-screen flex flex-col p-2 pb-14">
      <div className="bg-base-100 rounded-lg flex flex-col h-full">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <SelectSortDirection />
            <RangePicker
              minLabel="Min"
              maxLabel="Max"
              minKey="min"
              maxKey="max"
            />
            <RangePicker
              minLabel="Default Min"
              maxLabel="Default Max"
              minKey="defaultMin"
              maxKey="defaultMax"
            />
          </div>
          <ViewTypeToggle />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto px-4">
          <ChannelsDashboard viewType={viewType as unknown as ViewType} />
        </div>
      </div>
    </div>
  );
}
