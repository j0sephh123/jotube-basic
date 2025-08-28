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
import { useZoom } from "@features/Screenshot";

export default function Layout(): JSX.Element {
  const { isVisible, url, onClose } = useZoom();
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
        <ZoomModal isVisible={isVisible} url={url} onClose={onClose} />
        <GalleryModal />
      </DialogProvider>
      <VideoModal />
    </>
  );
}
