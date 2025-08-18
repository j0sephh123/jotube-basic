import { Outlet } from "react-router-dom";
import TheCarousel from "@features/Screenshot/components/TheCarousel";
import { useGlobalWebSocket } from "@/app/providers/ws/useGlobalWebSocket";
import { DialogProvider } from "@shared/ui/dialog/DialogProvider";
import ThumbnailsProcessing from "@/widgets/Thumbnails/ui";
import { AddChannelToPlaylistModal } from "@features/Playlist/components/AddChannelToPlaylistModal";
import ZoomModal from "@shared/ui/ZoomModal";
import StoryboardProcessing from "@features/Storyboard/StoryboardProcessing";
import CreateChannel from "@features/CreateChannel";
import SidePanel from "@widgets/SidePanel/ui/SidePanel";
import Navbar from "@widgets/Navbar";

export default function Layout(): JSX.Element {
  useGlobalWebSocket();
  return (
    <DialogProvider>
      <Navbar />
      <div className="w-full h-[99vh] overflow-auto">
        <Outlet />
      </div>
      <CreateChannel />
      <TheCarousel />
      <ThumbnailsProcessing />
      <StoryboardProcessing />
      <SidePanel />
      <AddChannelToPlaylistModal />
      <ZoomModal />
    </DialogProvider>
  );
}
