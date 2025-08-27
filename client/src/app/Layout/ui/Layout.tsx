import { Outlet } from "react-router-dom";
import { TheCarousel } from "@features/Screenshot";
import {
  DialogProvider,
  ZoomModal,
  VideoModal,
  GalleryModal,
} from "@shared/ui";
import { ThumbnailsProcessing, useThumbnailsSlice } from "@features/Thumbnails";
import { StoryboardProcessing } from "@features/Storyboard";
import CreateChannel from "@widgets/CreateChannel";
import { Navbar } from "@widgets/Navbar";
import { AddChannelToPlaylistModal } from "@widgets/PlaylistAddChannel";
import { useZoom } from "@features/Screenshot";
import { useVideoModal } from "@app/index";

export default function Layout(): JSX.Element {
  const { isVisible, url, onClose } = useZoom();
  const { isVideoModalVisible, videoId, embedUrl, startTime, closeVideoModal } =
    useVideoModal();
  const { metadata } = useThumbnailsSlice();

  return (
    <>
      <DialogProvider>
        <Navbar />
        <div className="w-full h-[99vh] overflow-auto">
          <Outlet />
        </div>
        <CreateChannel />
        <TheCarousel />
        {metadata.ytVideoId && <ThumbnailsProcessing />}
        <StoryboardProcessing />
        <AddChannelToPlaylistModal />
        <ZoomModal isVisible={isVisible} url={url} onClose={onClose} />
        <GalleryModal />
      </DialogProvider>
      <VideoModal
        isVisible={isVideoModalVisible}
        onClose={closeVideoModal}
        videoId={videoId}
        embedUrl={embedUrl}
        startTime={startTime}
      />
    </>
  );
}
