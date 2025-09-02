import { useGetVideoByYtIdQuery } from "@shared/api";
import { useTypedParams } from "@shared/hooks";
import { StaticStates, DateDisplay } from "@shared/ui";
import { VideoHeader } from "./VideoHeader";
import { ArtifactControl } from "./ArtifactControl";
import { VideoPlayer } from "@features/Upload";
import { VideoFiles } from "./VideoFiles";
import { VideoDetailsWrapper } from "./VideoDetailsWrapper";

export function VideoDetailsPage() {
  const ytChannelId = useTypedParams("ytChannelId");
  const ytId = useTypedParams("ytVideoId");
  const { data, loading, error } = useGetVideoByYtIdQuery({
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
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-base-200 rounded-lg overflow-hidden">
              <VideoPlayer
                ytId={video.ytId}
                src={video.src}
                id={video.id}
                title={video.title}
              />
            </div>

            <ArtifactControl artifact={video.artifact} />

            <div className="stats stats-vertical shadow">
              <DateDisplay value={video.createdAt} label="Created" />
              <DateDisplay value={video.updatedAt} label="Updated" />
              <DateDisplay value={video.publishedAt} label="Published" />
            </div>
          </div>

          <div className="space-y-4">
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
