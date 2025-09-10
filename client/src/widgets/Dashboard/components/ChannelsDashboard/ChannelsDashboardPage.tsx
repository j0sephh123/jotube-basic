import { type ViewType } from "@features/Dashboard";
import { useTypedParams } from "@shared/hooks";
import ChannelsDashboard from ".";
import { ChannelsDashboardHeader } from "./ChannelsDashboardHeader";

export default function ChannelsDashboardPage() {
  const { viewType } = useTypedParams("DashboardParams");

  return (
    <>
      <ChannelsDashboardHeader />
      <div className="flex-1 min-h-0 overflow-y-auto px-4">
        <ChannelsDashboard viewType={viewType as unknown as ViewType} />
      </div>
    </>
  );
}
