import { useGetVideoByYtIdQuery } from "@shared/api";
import { useTypedParams } from "@shared/hooks";
import {
  OpenDirectoryButton,
  StaticStates,
  CopyValue,
  CustomLink,
  DateDisplay,
  DeleteFileButton,
} from "@shared/ui";
import { makeYtChannelId } from "@shared/types";
import { useVideoPlayer } from "@features/Upload";
import { Trash2 } from "lucide-react";

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

  const { playingVideos, handleVideoClick, getEmbedUrl } = useVideoPlayer();

  if (!data) return null;

  const video = data.getVideoByYtId;

  return (
    <StaticStates isLoading={loading} isError={!!error} isEmpty={!video}>
      <div className="container mx-auto p-6 mt-12">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-4 mb-4 min-w-0">
              <CustomLink
                to={`/channels/${makeYtChannelId(ytChannelId)}`}
                className="text-base text-blue-600 hover:text-blue-800 font-medium flex-shrink-0"
              >
                ← Back to Channel
              </CustomLink>
              <div className="text-lg text-base-content font-semibold font-mono truncate min-w-0">
                {video.channelTitle}
              </div>
              <div className="text-base-content/40 text-lg">•</div>
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <h2 className="text-base font-bold text-base-content font-sans truncate min-w-0">
                  {video.title}
                </h2>
                <CopyValue value={video.id.toString()} type="id" />
                <CopyValue value={video.ytId} type="youtube" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-base-200 rounded-lg overflow-hidden">
                  {playingVideos[video.ytId] ? (
                    <div className="w-full aspect-video">
                      <iframe
                        src={getEmbedUrl(video.ytId)}
                        title={video.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <figure
                      className="relative cursor-pointer aspect-video"
                      onClick={() => handleVideoClick(video.ytId)}
                    >
                      <img
                        src={video.src}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30">
                        <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="w-8 h-8"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </figure>
                  )}
                </div>

                <div className="stats stats-vertical shadow">
                  <div className="stat">
                    <div className="stat-title text-sm">Status</div>
                    <div className="stat-value text-lg capitalize">
                      {video.artifact.toLowerCase()}
                    </div>
                  </div>
                </div>

                <div className="stats stats-vertical shadow">
                  <DateDisplay value={video.createdAt} label="Created" />
                  <DateDisplay value={video.updatedAt} label="Updated" />
                  <DateDisplay value={video.publishedAt} label="Published" />
                </div>
              </div>

              <div className="space-y-4">
                {video.filesWithSize && video.filesWithSize.length > 0 && (
                  <div className="card bg-base-200">
                    <div className="card-body">
                      <div className="flex justify-between items-center">
                        <h3 className="card-title text-lg">Files</h3>
                        <OpenDirectoryButton
                          ytChannelId={ytChannelId}
                          ytVideoId={ytId}
                        />
                      </div>
                      <div className="overflow-x-auto">
                        <table className="table table-zebra">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Size (MB)</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {video.filesWithSize.map((file, index) => (
                              <tr key={index}>
                                <td className="font-mono text-sm">
                                  {file.name}
                                </td>
                                <td>{file.sizeMB.toFixed(2)}</td>
                                <td>
                                  <div className="flex gap-1">
                                    {/* Check for common video file extensions */}
                                    {(file.name.endsWith(".mp4") ||
                                      file.name.endsWith(".mkv") ||
                                      file.name.endsWith(".webm") ||
                                      file.name.endsWith(".avi") ||
                                      file.name.endsWith(".mov") ||
                                      file.name.endsWith(".m4v")) && (
                                      <DeleteFileButton
                                        ytChannelId={ytChannelId}
                                        ytVideoId={ytId}
                                        deleteType="VIDEO"
                                        className=""
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </DeleteFileButton>
                                    )}
                                    {file.name === "saved_screenshots" && (
                                      <DeleteFileButton
                                        ytChannelId={ytChannelId}
                                        ytVideoId={ytId}
                                        deleteType="SAVED_SCREENSHOTS"
                                        className=""
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </DeleteFileButton>
                                    )}
                                    {file.name === "all_screenshots" && (
                                      <DeleteFileButton
                                        ytChannelId={ytChannelId}
                                        ytVideoId={ytId}
                                        deleteType="ALL_SCREENSHOTS"
                                        className=""
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </DeleteFileButton>
                                    )}
                                    {file.name === "thumbnails" && (
                                      <DeleteFileButton
                                        ytChannelId={ytChannelId}
                                        ytVideoId={ytId}
                                        deleteType="THUMBNAILS"
                                        className=""
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </DeleteFileButton>
                                    )}
                                  </div>
                                </td>
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
                      <div className="flex justify-between items-center">
                        <h3 className="card-title text-lg">Files</h3>
                        <OpenDirectoryButton
                          ytChannelId={ytChannelId}
                          ytVideoId={ytId}
                        />
                      </div>
                      <div className="text-center text-gray-500 py-4">
                        No files found
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StaticStates>
  );
}
