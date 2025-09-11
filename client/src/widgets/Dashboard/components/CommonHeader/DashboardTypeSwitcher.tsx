import { useSetUrlParam } from "@shared/hooks";
import { SegmentedSwitch } from "@shared/ui";
// eslint-disable-next-line import/no-internal-modules
import { type DashboardType } from "@widgets/Dashboard/types";
import { useParams } from "react-router-dom";

export function DashboardTypeSwitcher() {
  const setUrlParam = useSetUrlParam();
  const { dashboardType } = useParams<{ dashboardType: DashboardType }>();

  return (
    <SegmentedSwitch
      leftLabel="Channels"
      rightLabel="Videos"
      value={dashboardType as DashboardType}
      onChange={(value) => {
        setUrlParam("dashboardType", value);
      }}
    />
  );
}
