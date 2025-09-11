import { useSetUrlParam } from "@shared/hooks";
import { SegmentedSwitch } from "@shared/ui";
import { useParams } from "react-router-dom";

export function DashboardTypeSwitcher() {
  const setUrlParam = useSetUrlParam();
  const { dashboardType } = useParams<{ dashboardType: string }>();

  return (
    <SegmentedSwitch
      leftLabel="Channels"
      rightLabel="Videos"
      value={dashboardType === "channels" ? "left" : "right"}
      onChange={(value) => {
        setUrlParam("dashboardType", value === "left" ? "channels" : "videos");
      }}
    />
  );
}
