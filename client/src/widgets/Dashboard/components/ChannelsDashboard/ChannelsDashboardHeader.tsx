import { RangePicker } from "@widgets/RangePicker";
import {
  CommonDashboardHeaderWrapper,
  SortDirectionFilter,
  ChannelDashboardViewTypeToggle,
} from "@widgets/Dashboard";

export function ChannelsDashboardHeader() {
  return (
    <CommonDashboardHeaderWrapper>
      <SortDirectionFilter />
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
      <ChannelDashboardViewTypeToggle />
    </CommonDashboardHeaderWrapper>
  );
}
