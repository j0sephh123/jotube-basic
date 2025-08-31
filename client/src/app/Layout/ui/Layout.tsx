import { Outlet } from "react-router-dom";
import { TheCarousel } from "@features/Screenshot";
import {
  DialogProvider,
  ZoomModal,
  VideoModal,
  GalleryModal,
  Notification,
} from "@shared/ui";
import { ThumbnailsProcessing, useThumbnailsState } from "@features/Thumbnails";
import { StoryboardProcessing } from "@features/Storyboard";
import CreateChannel from "@widgets/CreateChannel";
import { Navbar } from "@widgets/Navbar";
import PlaylistModal from "@widgets/PlaylistModal";
import { usePlaylistModalState } from "@features/Playlist";
import { Debug } from "@shared/Debug";

export default function Layout(): JSX.Element {
  const { thumbnailsProcessingData } = useThumbnailsState();
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
        {thumbnailsProcessingData.length > 0 && <ThumbnailsProcessing />}
        <StoryboardProcessing />
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
