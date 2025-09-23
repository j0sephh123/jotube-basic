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
import CreateResource from "@widgets/CreateResource";
import { Navbar } from "@widgets/Navbar";
import PlaylistModal from "@widgets/PlaylistModal";
import { usePlaylistModalState } from "@features/Playlist";
import { useRecentlyViewedChannels } from "@features/Channel";
import { TvModal, useTvModalState } from "@features/Tv";
import { Sidepanel } from "./Sidepanel";
import { useGalleryModalState } from "@features/Gallery";

export default function Layout(): JSX.Element {
  const { type } = usePlaylistModalState();
  const { type: tvModalType } = useTvModalState();
  const { isVisible } = useGalleryModalState();
  useRecentlyViewedChannels();

  return (
    <>
      <DialogProvider>
        <Navbar />
        <div className="flex">
          <Sidepanel />
          <div className="w-full h-[90vh] overflow-hidden">
            <Outlet />
          </div>
        </div>
        <CreateResource />
        <TheCarousel />
        <ThumbnailsProcessing />
        <ZoomModal />
        {isVisible && <GalleryModal />}
        <Notification />
        {type !== null && <PlaylistModal />}
        {tvModalType !== null && <TvModal />}
      </DialogProvider>
      <VideoModal />
    </>
  );
}
