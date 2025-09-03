import { useChannelMetadataQuery } from "@entities/Channel";
import HeaderLayout from "./HeaderLayout";
import ChannelControls from "./ChannelControls";
import {
  SyncUploadsButton,
  CleanShortUploads,
  FetchUploadsButton,
} from "@features/Upload";
import { CardMenu, CustomLink } from "@shared/ui";
import Tabs from "./Tabs";
import ViewThumbnails from "./ViewThumbnails";
import { ViewScreenshots } from "@features/Thumbnails";
import { ViewStoryboards } from "@widgets/Storyboard";
import { makeYtChannelId } from "@shared/types";
import { useTypedParams } from "@shared/hooks";

const ChannelHeader = () => {
  const ytChannelId = useTypedParams("ytChannelId");

  const { data: channelMetadata, refetch: refetchMetadata } =
    useChannelMetadataQuery(ytChannelId);

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
  } = channelMetadata;

  console.log({
    playlist,
  });

  return (
    <div className="bg-base-200 rounded-lg px-6 pt-16 shadow-md">
      <div className="flex flex-col">
        <HeaderLayout
          left={
            <>
              <CustomLink
                to={`/channels/${makeYtChannelId(ytChannelId)}/saved`}
              >
                <h2 className="text-xl font-bold pr-4">{title}</h2>
              </CustomLink>
              <CardMenu id={id} ytId={ytChannelId} />
            </>
          }
          center={
            <>
              <Tabs ytChannelId={ytChannelId} />
              <ChannelControls
                leftSlot={
                  <>
                    <SyncUploadsButton
                      lastSyncedAt={channelMetadata?.lastSyncedAt ?? null}
                      ytChannelId={ytChannelId}
                      id={channelMetadata?.id ?? 0}
                    />
                    <CleanShortUploads ytChannelId={ytChannelId} />
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
