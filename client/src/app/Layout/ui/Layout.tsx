import { Outlet } from "react-router-dom";
import { TheCarousel } from "@features/Screenshot";
import {
  DialogProvider,
  ZoomModal,
  VideoModal,
  GalleryModal,
  Notification,
} from "@shared/ui";
import { ThumbnailsProcessing } from "@features/Thumbnails";
import CreateChannel from "@widgets/CreateChannel";
import { Navbar } from "@widgets/Navbar";
import PlaylistModal from "@widgets/PlaylistModal";
import { usePlaylistModalState } from "@features/Playlist";
import { Debug } from "@shared/Debug";

export default function Layout(): JSX.Element {
  const { type } = usePlaylistModalState();

  return (
    <>
      <DialogProvider>
        <Navbar />
        <div className="w-full h-[99vh] overflow-auto">
          <Outlet />
        </div>
        <CreateChannel />
        <TheCarousel />
        <ThumbnailsProcessing />
        <ZoomModal />
        <GalleryModal />
        <Notification />
        {type !== null && <PlaylistModal />}
      </DialogProvider>
      <VideoModal />
      <Debug />
    </>
  );
}
