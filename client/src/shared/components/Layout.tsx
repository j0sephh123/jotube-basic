import { Outlet } from "react-router-dom";
import TheCarousel from "@/features/Screenshot/components/TheCarousel";
import { CreateChannelButton } from "@/features/Channel/CreateChannel";
import { useWebSocket } from "@/shared/hooks/useWebSocket";
import { useGlobalWebSocket } from "@/shared/hooks/useGlobalWebSocket";
import TheNavbar from "@/shared/components/Navbar";
import { DialogProvider } from "./dialog/DialogProvider";
import ThumbnailsProcessing from "@/features/Thumbnail";
import ScreenshotsSidePanel from "./ScreenshotsSidePanel";
import { AddChannelToPlaylistModal } from "@/features/Playlist/components/AddChannelToPlaylistModal";
import ZoomModal from "./ZoomModal";
import StoryboardProcessing from "@/features/Storyboard/StoryboardProcessing";

export default function Layout(): JSX.Element {
  useWebSocket();
  useGlobalWebSocket();

  return (
    <DialogProvider>
      <TheNavbar />
      <div className="w-full h-[99vh] overflow-auto">
        <Outlet />
      </div>
      <CreateChannelButton />
      <TheCarousel />
      <ThumbnailsProcessing />
      <StoryboardProcessing />
      <ScreenshotsSidePanel />
      <AddChannelToPlaylistModal />
      <ZoomModal />
    </DialogProvider>
  );
}
