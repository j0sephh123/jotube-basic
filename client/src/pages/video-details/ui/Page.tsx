import { useGetVideoByYtIdQuery } from "@shared/api";
import { useTypedParams } from "@shared/hooks";
import { OpenDirectoryButton, StaticStates } from "@shared/ui";

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
      <div className="container mx-auto p-6 mt-12">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">{video.title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="stats stats-vertical shadow">
                  <div className="stat">
                    <div className="stat-title">Video ID</div>
                    <div className="stat-value text-lg">{video.ytId}</div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">Channel</div>
                    <div className="stat-value text-lg">
                      {video.channelTitle}
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">Status</div>
                    <div className="stat-value text-lg capitalize">
                      {video.artifact.toLowerCase()}
                    </div>
                  </div>
                </div>

                <div className="stats stats-vertical shadow">
                  <div className="stat">
                    <div className="stat-title">Published</div>
                    <div className="stat-value text-sm">
                      {new Date(video.publishedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">Created</div>
                    <div className="stat-value text-sm">
                      {new Date(video.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">Updated</div>
                    <div className="stat-value text-sm">
                      {new Date(video.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="card bg-base-200">
                  <div className="card-body">
                    <h3 className="card-title text-lg">Source URL</h3>
                    <div className="break-all">
                      <a
                        href={video.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link link-primary"
                      >
                        {video.src}
                      </a>
                    </div>
                  </div>
                </div>

                {video.filesWithSize && video.filesWithSize.length > 0 && (
                  <div className="card bg-base-200">
                    <div className="card-body">
                      <h3 className="card-title text-lg">Files</h3>
                      <div className="overflow-x-auto">
                        <table className="table table-zebra">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Size (MB)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {video.filesWithSize.map((file, index) => (
                              <tr key={index}>
                                <td className="font-mono text-sm">
                                  {file.name}
                                </td>
                                <td>{file.sizeMB.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {(!video.filesWithSize || video.filesWithSize.length === 0) && (
                  <div className="card bg-base-200">
                    <div className="card-body">
                      <h3 className="card-title text-lg">Files</h3>
                      <div className="text-center text-gray-500 py-4">
                        No files found
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="card-actions justify-end mt-6">
              <OpenDirectoryButton ytChannelId={ytChannelId} ytVideoId={ytId} />
            </div>
          </div>
        </div>
      </div>
    </StaticStates>
  );
}
