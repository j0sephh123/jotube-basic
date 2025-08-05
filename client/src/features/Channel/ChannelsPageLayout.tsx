import { Outlet } from "react-router-dom";
import ChannelsHeader from "./ChannelsHeader/components/ChannelsHeader";

export default function ChannelsPageLayout() {
  return (
    <div className="container mx-auto px-4 py-2">
      <ChannelsHeader />
      <Outlet />
    </div>
  );
}
