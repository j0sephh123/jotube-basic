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
import { PlaylistControl } from "@features/Playlist";
import { YtIdToId } from "@shared/hoc";
// eslint-disable-next-line import/no-internal-modules
import { useChannelMetadataQuery } from "@entities/Channel/model/useChannelMetadata";

const ChannelHeaderInner = ({
  channelId,
  ytChannelId,
}: {
  channelId: number;
  ytChannelId: string;
}) => {
  const { data: channelMetadata, refetch: refetchMetadata } =
    useChannelMetadataQuery(channelId);

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
              <PlaylistControl
                isPlaylistPage={false}
                id={id}
                playlistId={playlist?.id ?? 0}
                playlistName={playlist?.name ?? "No playlist"}
              />
            </>
          }
          center={
            <>
              <Tabs />
              <ChannelControls
                leftSlot={
                  <>
                    <SyncUploadsButton
                      lastSyncedAt={channelMetadata?.lastSyncedAt ?? null}
                      ytChannelId={ytChannelId}
                      id={channelMetadata?.id ?? 0}
                    />
                    <CleanShortUploads channelId={channelId} />
                  </>
                }
              />
            </>
          }
          right={
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
                ytChannelId={ytChannelId}
                screenshotArtifactsCount={screenshotArtifactsCount}
              />
              {!fetchedUntilEnd && (
                <FetchUploadsButton
                  channelId={channelId}
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

const ChannelHeader = YtIdToId(ChannelHeaderInner);
export default ChannelHeader;
