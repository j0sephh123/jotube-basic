import { Button } from "@shared/ui";
import { RangePicker } from "@widgets/RangePicker";
import { SelectSortDirection, ViewTypeToggle } from "..";

export function ChannelsDashboardHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <SelectSortDirection />
        <RangePicker
          wrapperClassName="w-[120px]"
          minLabel="Min"
          maxLabel="Max"
          minKey="min"
          maxKey="max"
          identifier="channelsMinMax"
        />
        <RangePicker
          minLabel="Default Min"
          maxLabel="Default Max"
          minKey="defaultMin"
          maxKey="defaultMax"
          identifier="channelsDefaultMinMax"
        />
        <Button>Clear Filters</Button>
      </div>
      <ViewTypeToggle />
    </div>
  );
}
