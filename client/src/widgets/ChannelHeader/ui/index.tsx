/* eslint-disable import/no-internal-modules */
import { ChannelControls } from "./ChannelControls";
import {
  SyncUploadsButton,
  CleanShortUploads,
  FetchUploadsButton,
} from "@features/Upload";
import { CardMenu, CustomLink } from "@shared/ui";
import ViewThumbnails from "./ViewThumbnails";
import { ViewScreenshots } from "@features/Thumbnails";
import { ViewStoryboards } from "@widgets/Storyboard";
import { makeYtChannelId } from "@shared/types";
import { PlaylistControl } from "@features/Playlist";
import { setGalleryModal } from "@features/Gallery/model/galleryModalStore";
// eslint-disable-next-line import/no-internal-modules
import { useChannelMetadataQuery } from "@entities/Channel/model/useChannelMetadata";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

export const ChannelHeader = ({
  channelId,
  ytChannelId,
}: {
  channelId: number;
  ytChannelId: string;
}) => {
  const { data: channelMetadata, refetch: refetchMetadata } =
    useChannelMetadataQuery(channelId);
  const location = useLocation();
  const isUploadsPage = location.pathname.includes("/default");
  const isSavedPage = location.pathname.includes("/saved");
  const isThumbnailsPage = location.pathname.includes("/thumbnails");
  const isScreenshotsPage = location.pathname.includes("/screenshots");
  const isGalleryPage = location.pathname.includes("/gallery");

  if (!channelMetadata) return null;

  const {
    title,
    screenshotArtifactsCount,
    id,
    thumbnailArtifactsCount,
    videoCount,
    fetchedUntilEnd,
    storyboardArtifactsCount,
    playlist,
    videoArtifactsCount,
    savedArtifactsCount,
  } = channelMetadata;

  const handleGalleryClick = () => {
    setGalleryModal({
      ytVideoId: "",
      channelIds: [channelId],
    });
  };

  return (
    <div className="bg-base-200 rounded-lg px-6 pt-16 shadow-md">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CustomLink to={`/channels/${makeYtChannelId(ytChannelId)}/saved`}>
              <h2 className="text-xl font-bold pr-4">{title}</h2>
            </CustomLink>
            <CardMenu id={id} ytId={ytChannelId} />
            <PlaylistControl
              isPlaylistPage={false}
              id={id}
              playlistId={playlist?.id ?? 0}
              playlistName={playlist?.name ?? "No playlist"}
            />
            {isUploadsPage && (
              <>
                <SyncUploadsButton
                  lastSyncedAt={channelMetadata?.lastSyncedAt ?? null}
                  id={channelMetadata?.id ?? 0}
                />
                <CleanShortUploads channelId={channelId} />
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <ViewStoryboards
              channelId={channelId}
              storyboardArtifactsCount={storyboardArtifactsCount}
            />
            <ViewThumbnails
              id={id}
              thumbnailArtifactsCount={thumbnailArtifactsCount}
            />
            <ViewScreenshots
              channelId={channelId}
              screenshotArtifactsCount={screenshotArtifactsCount}
            />
            <button onClick={handleGalleryClick} className="btn btn-sm">
              Image Viewer ({screenshotArtifactsCount})
            </button>
            {!fetchedUntilEnd && (
              <FetchUploadsButton
                channelId={channelId}
                videoCount={videoCount}
                onSuccess={refetchMetadata}
              />
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <ChannelControls />

          <div className="tabs tabs-boxed bg-base-100">
            <CustomLink
              to={`/channels/${makeYtChannelId(ytChannelId)}`}
              className={clsx("tab tab-sm", {
                "tab-active bg-primary text-primary-content": isUploadsPage,
              })}
            >
              Uploads ({videoArtifactsCount})
            </CustomLink>
            <CustomLink
              to={`/channels/${makeYtChannelId(ytChannelId)}/saved`}
              className={clsx("tab tab-sm", {
                "tab-active bg-primary text-primary-content": isSavedPage,
              })}
            >
              Saved ({savedArtifactsCount})
            </CustomLink>
            <CustomLink
              to={`/channels/${makeYtChannelId(ytChannelId)}/thumbnails`}
              className={clsx("tab tab-sm", {
                "tab-active bg-primary text-primary-content": isThumbnailsPage,
              })}
            >
              Thumbnails ({thumbnailArtifactsCount})
            </CustomLink>
            <CustomLink
              to={`/channels/${makeYtChannelId(ytChannelId)}/screenshots`}
              className={clsx("tab tab-sm", {
                "tab-active bg-primary text-primary-content": isScreenshotsPage,
              })}
            >
              Screenshots ({screenshotArtifactsCount})
            </CustomLink>
            <CustomLink
              to={`/channels/${makeYtChannelId(ytChannelId)}/gallery`}
              className={clsx("tab tab-sm", {
                "tab-active bg-primary text-primary-content": isGalleryPage,
              })}
            >
              Gallery
            </CustomLink>
          </div>
        </div>
      </div>
    </div>
  );
};
