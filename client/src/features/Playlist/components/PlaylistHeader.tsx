/* eslint-disable boundaries/element-types */
import { IdType, type PlaylistDetailsResponse } from "@shared/api";
import { useScreenshotsForCarousel } from "@features/Screenshot";
import { setGalleryModal } from "@features/Gallery";
import { Iterator } from "@shared/ui";
import { useTypedParams } from "@shared/hooks";
import { useGetUploadsWithStoryboards } from "@features/Storyboard";
// eslint-disable-next-line import/no-internal-modules, boundaries/element-types
import { SmallCard } from "@widgets/PlaylistDetails/ui/SmallCard";
import { useViewThumbnails } from "@features/Thumbnails";
import { GenericHeaderContainer } from "@widgets/GenericHeaderContainer";
import { PlaylistHeaderTitleSection } from "./PlaylistHeaderTitleSection";

type HeaderProps = {
  playlist: PlaylistDetailsResponse;
};

export function PlaylistHeader({
  playlist: { id, name, channels },
}: HeaderProps) {
  const handleGetScreenshots = useScreenshotsForCarousel();
  const handleGetStoryboards = useGetUploadsWithStoryboards().mutateAsync;
  const handleGetThumbnails = useViewThumbnails();

  const uploadsType = useTypedParams("uploadsType");

  const totalCounts = channels.reduce(
    (acc, channel) => ({
      videoCount: acc.videoCount + channel.videoCount,
      savedCount: acc.savedCount + channel.savedCount,
      screenshotCount: acc.screenshotCount + channel.screenshotCount,
      thumbnailCount: acc.thumbnailCount + channel.thumbnailCount,
      storyboardCount: acc.storyboardCount + channel.storyboardCount,
    }),
    {
      videoCount: 0,
      savedCount: 0,
      screenshotCount: 0,
      thumbnailCount: 0,
      storyboardCount: 0,
    }
  );

  return (
    <GenericHeaderContainer
      topLeft={
        <PlaylistHeaderTitleSection
          name={name}
          channelsLength={channels.length}
        />
      }
      topRight={
        <>
          <SmallCard
            onClick={() =>
              setGalleryModal({
                ytVideoId: "",
                channelIds: channels.map((channel) => channel.id),
              })
            }
            title="Gallery"
            value={totalCounts.screenshotCount}
            className="text-primary"
            wrapperClassName="bg-primary/10"
          />
          <SmallCard
            onClick={() =>
              handleGetScreenshots(channels.map((channel) => channel.id))
            }
            title="Screenshots"
            value={totalCounts.screenshotCount}
            className="text-warning"
            wrapperClassName="bg-warning/10"
          />
          <SmallCard
            onClick={() =>
              handleGetThumbnails({
                playlistId: id,
                idType: IdType.Playlist,
              })
            }
            title="Thumbnails"
            value={totalCounts.thumbnailCount}
            className="text-info"
            wrapperClassName="bg-info/10"
          />
          <SmallCard
            onClick={() =>
              handleGetStoryboards(channels.map((channel) => channel.id))
            }
            title="Storyboards"
            value={totalCounts.storyboardCount}
            className="text-error"
            wrapperClassName="bg-error/10"
          />
        </>
      }
      bottomLeft={null}
      bottomRight={
        <Iterator
          baseLink={`/playlists/${id}/uploads`}
          items={[
            {
              name: "default",
              count: totalCounts.videoCount,
            },
            {
              name: "saved",
              count: totalCounts.savedCount,
            },
          ]}
          getActive={(name: string) => uploadsType === name}
          variant="link"
        />
      }
    />
  );
}
