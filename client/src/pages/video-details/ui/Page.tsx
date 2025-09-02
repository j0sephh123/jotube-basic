import { useGetVideoByYtIdQuery } from "@shared/api";
import { useTypedParams } from "@shared/hooks";
import { StaticStates, DateDisplay, Button } from "@shared/ui";
import { VideoHeader } from "./VideoHeader";
import { ArtifactControl } from "./ArtifactControl";
import { VideoPlayer } from "@features/Upload";
import { VideoFiles } from "./VideoFiles";
import { VideoDetailsWrapper } from "./VideoDetailsWrapper";

export function VideoDetailsPage() {
  const ytChannelId = useTypedParams("ytChannelId");
  const ytId = useTypedParams("ytVideoId");
  const { data, loading, error, refetch } = useGetVideoByYtIdQuery({
    variables: {
      getVideoByYtIdInput: {
        ytChannelId,
        ytId,
      },
    },
  });

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
              ytId={video.ytId}
              src={video.src}
              id={video.id}
              title={video.title}
            />
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-4">
              <div className="flex gap-2">
                <Button >
                  Gallery
                </Button>
                <Button>
                  Screenshots
                </Button>
                <Button>
                  Thumbnails
                </Button>
              </div>
            </div>
            <VideoFiles
              ytChannelId={ytChannelId}
              ytVideoId={ytId}
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
