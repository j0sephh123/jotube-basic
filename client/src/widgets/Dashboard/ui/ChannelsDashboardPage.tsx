import { type ViewType } from "@features/Dashboard";
import { useTypedParams } from "@shared/hooks";
import ChannelsDashboard from "./ChannelsDashboard";
import { ChannelsDashboardHeader } from "./ChannelsDashboardHeader";

export default function ChannelsDashboardPage() {
  const { viewType } = useTypedParams("DashboardParams");

  return (
    <div className="h-screen flex flex-col p-2 pb-14">
      <div className="bg-base-100 rounded-lg flex flex-col h-full">
        <ChannelsDashboardHeader />
        <div className="flex-1 min-h-0 overflow-y-auto px-4">
          <ChannelsDashboard viewType={viewType as unknown as ViewType} />
        </div>
      </div>
    </div>
  );
}
