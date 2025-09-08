/* eslint-disable boundaries/element-types */
import { IdType, type PlaylistDetailsResponse } from "@shared/api";
import { useScreenshotsForCarousel } from "@features/Screenshot";
import { setGalleryModal } from "@features/Gallery";
import { Iterator } from "@shared/ui";
import { useTypedParams } from "@shared/hooks";
import { useGetUploadsWithStoryboards } from "@features/Storyboard";
// eslint-disable-next-line import/no-internal-modules, boundaries/element-types
import { useViewThumbnails } from "@features/Thumbnails";
import { GenericHeaderContainer } from "@widgets/GenericHeaderContainer";
import { PlaylistHeaderTitleSection } from "./PlaylistHeaderTitleSection";
import { match } from "ts-pattern";

type HeaderProps = {
  playlist: PlaylistDetailsResponse;
};

export function PlaylistHeader({
  playlist: { id, name, channels },
}: HeaderProps) {
  const viewScreenshots = useScreenshotsForCarousel();
  const getStoryboards = useGetUploadsWithStoryboards().mutateAsync;
  const viewThumbnails = useViewThumbnails();

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
        <Iterator
          variant="click"
          items={[
            {
              name: "gallery",
              count: totalCounts.screenshotCount,
            },
            {
              name: "storyboards",
              count: totalCounts.storyboardCount,
            },
            {
              name: "thumbnails",
              count: totalCounts.thumbnailCount,
            },
            {
              name: "screenshots",
              count: totalCounts.screenshotCount,
            },
          ]}
          onClick={(name) => {
            match(name)
              .with("storyboards", () => {
                getStoryboards(channels.map((channel) => channel.id));
              })
              .with("thumbnails", () => {
                viewThumbnails({
                  idType: IdType.Playlist,
                  playlistId: id,
                });
              })
              .with("screenshots", () => {
                viewScreenshots(channels.map((channel) => channel.id));
              })
              .with("gallery", () => {
                setGalleryModal({
                  ytVideoId: "",
                  channelIds: channels.map((channel) => channel.id),
                });
              })
              .run();
          }}
        />
      }
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
