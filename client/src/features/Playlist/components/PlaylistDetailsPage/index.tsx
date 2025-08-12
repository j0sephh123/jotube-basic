import { Header } from "./Header";
import PlaylistDetailsContainer from "./PlaylistDetailsContainer";
import { Playlist } from "../../types";
import Tooltip from "@/shared/components/Tooltip";
import CopyValue from "@/shared/components/CopyValue";

export const PlaylistDetailsPage = () => {
  return (
    <PlaylistDetailsContainer>
      {(playlist: Playlist) => (
        <div className="container mx-auto p-6">
          <Header playlist={playlist} />

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th className="w-[120px]">Title</th>
                      <th>Processed</th>
                      <th>Saved</th>
                      <th>Last Updated</th>
                      <th>Actions</th>
                      <th>Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playlist.channels.map((channel) => (
                      <tr key={channel.id}>
                        <td className="max-w-[120px]">
                          <div className="flex flex-col gap-1">
                            <Tooltip content={channel.title} position="top">
                              <div className="truncate max-w-[120px]">
                                {channel.title}
                              </div>
                            </Tooltip>
                            <Tooltip
                              content={`Channel ID: ${channel.ytId}`}
                              position="top"
                            >
                              <CopyValue type="id" value={channel.ytId} />
                            </Tooltip>
                          </div>
                        </td>
                        <td>
                          <div className="text-sm font-mono">
                            {Math.floor(Math.random() * 1000) + 1}
                          </div>
                        </td>
                        <td>
                          <div className="text-sm font-mono">
                            {Math.floor(Math.random() * 100) + 1}
                          </div>
                        </td>
                        <td>
                          {new Date(channel.updatedAt).toLocaleDateString()}
                        </td>
                        <td>
                          <button className="btn btn-ghost btn-xs">View</button>
                        </td>
                        <td>
                          <span className="badge badge-info badge-sm">
                            Details
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </PlaylistDetailsContainer>
  );
};
