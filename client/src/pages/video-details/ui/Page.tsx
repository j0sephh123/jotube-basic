import {
  type UploadsWithThumbnailsResponse,
  useGetVideoByYtIdQuery,
} from "@shared/api";
import { useTypedParams } from "@shared/hooks";
import { StaticStates, DateDisplay, Button } from "@shared/ui";
import { VideoHeader } from "./VideoHeader";
import { ArtifactControl } from "./ArtifactControl";
import { VideoPlayer } from "@features/Upload";
import { VideoFiles } from "./VideoFiles";
import { VideoDetailsWrapper } from "./VideoDetailsWrapper";
import { setProcessingData } from "@shared/store";
import { useScreenshotsForCarousel } from "@features/Screenshot";
import { setGalleryModal } from "@features/Gallery";

export function VideoDetailsPage() {
  const ytChannelId = useTypedParams("ytChannelId");
  const ytVideoId = useTypedParams("ytVideoId");
  const { data, loading, error, refetch } = useGetVideoByYtIdQuery({
    variables: {
      getVideoByYtIdInput: {
        ytChannelId,
        ytId: ytVideoId,
      },
    },
  });

  const handleViewThumbnails = () => {
    setProcessingData("thumbnails", [
      {
        ytChannelId,
        ytVideoId,
        channelTitle: data?.getVideoByYtId.channelTitle,
      },
    ] as UploadsWithThumbnailsResponse[]);
  };

  const handleViewScreenshots = useScreenshotsForCarousel(ytVideoId);

  const handleGalleryClick = () => {
    setGalleryModal({
      ytVideoId,
      ytChannelIds: [ytChannelId],
    });
  };

  if (!data) return null;

  const video = data.getVideoByYtId;

  return (
    <StaticStates isLoading={loading} isError={!!error} isEmpty={!video}>
      <VideoDetailsWrapper>
        <VideoHeader
          channelTitle={video.channelTitle}
          videoTitle={video.title}
          videoId={video.id}
          onRefetch={() => refetch()}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <ArtifactControl artifact={video.artifact} />

            <div className="flex gap-2">
              <DateDisplay value={video.createdAt} label="Created" />
              <DateDisplay value={video.updatedAt} label="Updated" />
              <DateDisplay value={video.publishedAt} label="Published" />
            </div>
            <VideoPlayer
              ytId={ytVideoId}
              src={video.src}
              id={video.id}
              title={video.title}
            />
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-4">
              <div className="flex gap-2">
                {video.artifact === "SCREENSHOT" && (
                  <>
                    <Button onClick={handleGalleryClick}>Gallery</Button>
                    <Button
                      onClick={() => handleViewScreenshots([ytChannelId])}
                    >
                      Screenshots {`(${video.screenshots})`}
                    </Button>
                  </>
                )}
                {video.artifact === "THUMBNAIL" && (
                  <Button onClick={handleViewThumbnails}>Thumbnails</Button>
                )}
              </div>
            </div>
            <VideoFiles
              ytChannelId={ytChannelId}
              ytVideoId={ytVideoId}
              filesWithSize={video.filesWithSize}
              directoriesWithSize={video.directoriesWithSize}
              totalSizeMB={video.totalSizeMB}
            />
          </div>
        </div>
      </VideoDetailsWrapper>
    </StaticStates>
  );
}
