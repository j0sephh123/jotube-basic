import { Outlet } from "react-router-dom";
import TheCarousel from "@features/Screenshot/components/TheCarousel";
import { useWebSocket } from "@shared/hooks/useWebSocket";
import { useGlobalWebSocket } from "@shared/hooks/useGlobalWebSocket";
import { DialogProvider } from "@shared/ui/dialog/DialogProvider";
import ThumbnailsProcessing from "@/features/Thumbnail";
import { AddChannelToPlaylistModal } from "@features/Playlist/components/AddChannelToPlaylistModal";
import ZoomModal from "@shared/ui/ZoomModal";
import StoryboardProcessing from "@features/Storyboard/StoryboardProcessing";
import CreateChannel from "@features/CreateChannel";
import SidePanel from "@widgets/SidePanel";
import Navbar from "@widgets/Navbar";

export default function Layout(): JSX.Element {
  useWebSocket();
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
