import ChannelsHeader from "@/features/Channel/ChannelsHeader";
import { Outlet } from "react-router-dom";

export default function ChannelsPageLayout() {
  return (
    <div className="container mx-auto px-4 py-2">
      <ChannelsHeader />
      <Outlet />
    </div>
  );
}
