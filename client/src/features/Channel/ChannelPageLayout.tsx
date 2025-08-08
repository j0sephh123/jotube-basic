import { Outlet } from "react-router-dom";
import ChannelHeader from "./ChannelsHeader";

export default function ChannelPageLayout() {
  return (
    <div className="container mx-auto px-4 py-2">
      <ChannelHeader />
      <Outlet />
    </div>
  );
}
