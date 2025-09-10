import { VideosDashboard } from "@widgets/Dashboard";
import { VideosDashboardHeader } from "./VideosDashboardHeader";

export default function VideosDashboardPage() {
  return (
    <>
      <VideosDashboardHeader />
      <div className="flex-1 min-h-0 overflow-y-auto px-4">
        <VideosDashboard />
      </div>
    </>
  );
}
