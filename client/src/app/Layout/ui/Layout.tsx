import { Outlet } from "react-router-dom";
import { TheCarousel } from "@features/Screenshot";
import { DialogProvider, ZoomModal } from "@shared/ui";
import { ThumbnailsProcessing } from "@features/Thumbnails";
import { StoryboardProcessing } from "@features/Storyboard";
import CreateChannel from "@features/CreateChannel";
import { SidePanel } from "@app/index";
import { Navbar } from "@widgets/Navbar";
import { AddChannelToPlaylistModal } from "@widgets/PlaylistAddChannel";
import { useZoom } from "@shared/hooks";

export default function Layout(): JSX.Element {
  const { isVisible, url, onClose } = useZoom();

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
      <ZoomModal isVisible={isVisible} url={url} onClose={onClose} />
    </DialogProvider>
  );
}
