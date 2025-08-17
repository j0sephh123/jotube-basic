import { Outlet } from "react-router-dom";
import TheCarousel from "@/features/Screenshot/components/TheCarousel";
import { useWebSocket } from "@/shared/hooks/useWebSocket";
import { useGlobalWebSocket } from "@/shared/hooks/useGlobalWebSocket";
import { DialogProvider } from "./dialog/DialogProvider";
import ThumbnailsProcessing from "@/features/Thumbnail";
import { AddChannelToPlaylistModal } from "@/features/Playlist/components/AddChannelToPlaylistModal";
import ZoomModal from "./ZoomModal";
import StoryboardProcessing from "@/features/Storyboard/StoryboardProcessing";
import CreateChannel from "@/features/Channel/CreateChannel";
import { ToastProvider } from "../../app/providers/ToastProvider";
import ScreenshotsSidePanel from "@/widgets/ScreenshotsSidePanel";
import Navbar from "@/widgets/Navbar";

export default function Layout(): JSX.Element {
  useWebSocket();
  useGlobalWebSocket();
  return (
    <ToastProvider>
      <DialogProvider>
        <Navbar />
        <div className="w-full h-[99vh] overflow-auto">
          <Outlet />
        </div>
        <CreateChannel />
        <TheCarousel />
        <ThumbnailsProcessing />
        <StoryboardProcessing />
        <ScreenshotsSidePanel />
        <AddChannelToPlaylistModal />
        <ZoomModal />
      </DialogProvider>
    </ToastProvider>
  );
}
