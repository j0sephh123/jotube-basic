import { Outlet } from "react-router-dom";
import TheCarousel from "@features/Screenshot/components/TheCarousel";
import { DialogProvider } from "@shared/ui/dialog/DialogProvider";
import ThumbnailsProcessing from "@/features/Thumbnails/ui";
import ZoomModal from "@shared/ui/ZoomModal";
import StoryboardProcessing from "@features/Storyboard/StoryboardProcessing";
import CreateChannel from "@features/CreateChannel";
import SidePanel from "@widgets/SidePanel/ui/SidePanel";
import Navbar from "@widgets/Navbar";
import { AddChannelToPlaylistModal } from "@/widgets/PlaylistAddChannel/ui/AddChannelToPlaylistModal";

export default function Layout(): JSX.Element {
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
