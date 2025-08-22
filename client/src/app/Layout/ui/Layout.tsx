import { Outlet } from "react-router-dom";
import { TheCarousel } from "@features/Screenshot";
import { DialogProvider, ZoomModal } from "@shared/ui";
import { ThumbnailsProcessing } from "@features/Thumbnails";
import { StoryboardProcessing } from "@features/Storyboard";
import CreateChannel from "@features/CreateChannel";
import { SidePanel } from "@app";
import Navbar from "@widgets/Navbar";
import { AddChannelToPlaylistModal } from "@widgets/PlaylistAddChannel";

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
