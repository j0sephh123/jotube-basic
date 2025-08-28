import { useChannelMetadataQuery } from "@entities/Channel";
import { useLocation } from "react-router-dom";
import { useTypedChannelYtId } from "@features/Dashboard";
import HeaderLayout from "./HeaderLayout";
import ChannelControls from "./ChannelControls";
import {
  SyncUploadsButton,
  CleanShortUploads,
  FetchUploadsButton,
} from "@features/Upload";
import { CardMenu, ChannelLink } from "@shared/ui";
import Tabs from "./Tabs";
import ViewThumbnails from "./ViewThumbnails";
import { ViewScreenshots } from "@features/Thumbnails";
import { ViewStoryboards } from "@widgets/Storyboard";

const ChannelHeader = () => {
  const ytChannelId = useTypedChannelYtId();
  const { pathname } = useLocation();

  const { data: metadata, refetch: refetchMetadata } =
    useChannelMetadataQuery(ytChannelId);

  const areControlsDisabled =
    pathname.includes("/gallery") ||
    pathname.includes("/saved") ||
    pathname.includes("/storyboard") ||
    pathname.includes("/new-gallery");

  if (!metadata) return null;

  const {
    title,
    screenshotArtifactsCount,
    id,
    thumbnailArtifactsCount,
    videoCount,
    fetchedUntilEnd,
    storyboardArtifactsCount,
  } = metadata;

  return (
    <div className="bg-base-200 rounded-lg px-6 pt-16 shadow-md">
      <div className="flex flex-col">
        <HeaderLayout
          left={
            <>
              <ChannelLink ytId={ytChannelId} where="saved">
                <h2 className="text-xl font-bold pr-4">{title}</h2>
              </ChannelLink>
              <CardMenu id={id} ytId={ytChannelId} />
            </>
          }
          center={
            <>
              <Tabs ytChannelId={ytChannelId} />
              <ChannelControls
                areControlsDisabled={areControlsDisabled}
                leftSlot={
                  <>
                    <SyncUploadsButton
                      isDisabled={areControlsDisabled}
                      lastSyncedAt={metadata?.lastSyncedAt ?? null}
                      ytChannelId={ytChannelId}
                      id={metadata?.id ?? 0}
                    />
                    <CleanShortUploads
                      isDisabled={areControlsDisabled}
                      ytChannelId={ytChannelId}
                    />
                  </>
                }
              />
            </>
          }
          right={
            <div className="flex items-center gap-2">
              <ViewStoryboards
                ytChannelId={ytChannelId}
                storyboardArtifactsCount={storyboardArtifactsCount}
              />
              <ViewThumbnails
                id={id}
                thumbnailArtifactsCount={thumbnailArtifactsCount}
              />
              <ViewScreenshots
                ytChannelId={ytChannelId}
                screenshotArtifactsCount={screenshotArtifactsCount}
              />
              {!fetchedUntilEnd && (
                <FetchUploadsButton
                  ytChannelId={ytChannelId}
                  videoCount={videoCount}
                  onSuccess={refetchMetadata}
                />
              )}
            </div>
          }
        />
      </div>
    </div>
  );
};

export default ChannelHeader;
