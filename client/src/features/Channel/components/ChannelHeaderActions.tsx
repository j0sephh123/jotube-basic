/* eslint-disable import/no-internal-modules */
import { setGalleryModal } from "@features/Gallery/model/galleryModalStore";
import { useChannelMetadataQuery } from "@entities/Channel/model/useChannelMetadata";
import { useGetUploadsWithStoryboards } from "@features/Storyboard";
import { Iterator } from "@shared/ui";
import { match } from "ts-pattern";
import { useViewThumbnails } from "@features/Thumbnails";
import { IdType } from "@shared/api";
import { useScreenshotsForCarousel } from "@features/Screenshot";

interface TopRightProps {
  channelId: number;
}

export const ChannelHeaderActions = ({ channelId }: TopRightProps) => {
  const { data: channelMetadata } = useChannelMetadataQuery(channelId);
  const { mutateAsync: getStoryboards } = useGetUploadsWithStoryboards();
  const viewThumbnails = useViewThumbnails();
  const viewScreenshots = useScreenshotsForCarousel();

  if (!channelMetadata) return null;

  const {
    screenshotArtifactsCount,
    thumbnailArtifactsCount,
    storyboardArtifactsCount,
  } = channelMetadata;

  return (
    <Iterator
      variant="click"
      items={[
        {
          name: "storyboards",
          count: storyboardArtifactsCount,
        },
        {
          name: "thumbnails",
          count: thumbnailArtifactsCount,
        },
        {
          name: "screenshots",
          count: screenshotArtifactsCount,
        },
        {
          name: "gallery",
          count: screenshotArtifactsCount,
        },
      ]}
      onClick={(name) => {
        match(name)
          .with("storyboards", () => {
            getStoryboards([channelId]);
          })
          .with("thumbnails", () => {
            viewThumbnails({
              channelIds: [channelId],
              idType: IdType.Channel,
            });
          })
          .with("screenshots", () => {
            viewScreenshots([channelId]);
          })
          .with("gallery", () => {
            setGalleryModal({
              ytVideoId: "",
              channelIds: [channelId],
            });
          })
          .run();
      }}
    />
  );
};
