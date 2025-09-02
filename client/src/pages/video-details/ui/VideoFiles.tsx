import { OpenDirectoryButton, DeleteFileButton } from "@shared/ui";
import { Trash2 } from "lucide-react";

interface FileWithSize {
  name: string;
  sizeMB: number;
}

interface DirectoryWithSize {
  name: string;
  sizeMB: number;
}

interface VideoFilesProps {
  ytChannelId: string;
  ytVideoId: string;
  filesWithSize: FileWithSize[];
  directoriesWithSize: DirectoryWithSize[];
  totalSizeMB: number;
}

export function VideoFiles({ ytChannelId, ytVideoId, filesWithSize, directoriesWithSize, totalSizeMB }: VideoFilesProps) {
  const hasFiles = (filesWithSize && filesWithSize.length > 0) || (directoriesWithSize && directoriesWithSize.length > 0);

  if (hasFiles) {
    return (
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h3 className="card-title text-lg">Files</h3>
            <OpenDirectoryButton
              ytChannelId={ytChannelId}
              ytVideoId={ytVideoId}
            />
          </div>
          <div className="text-sm text-base-content/70 mb-2">
            Total size: {totalSizeMB} MB
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
                {filesWithSize.map((file, index) => (
                  <tr key={`file-${index}`}>
                    <td className="font-mono text-sm">
                      {file.name}
                    </td>
                    <td>{file.sizeMB}</td>
                    <td>
                      <div className="flex gap-1">
                        {(file.name.endsWith(".mp4") ||
                          file.name.endsWith(".mkv") ||
                          file.name.endsWith(".webm") ||
                          file.name.endsWith(".avi") ||
                          file.name.endsWith(".mov") ||
                          file.name.endsWith(".m4v") ||
                          file.name.endsWith(".part")) && (
                          <DeleteFileButton
                            ytChannelId={ytChannelId}
                            ytVideoId={ytVideoId}
                            deleteType="VIDEO"
                            className=""
                          >
                            <Trash2 className="w-4 h-4" />
                          </DeleteFileButton>
                        )}
                        {file.name === "saved_screenshots" && (
                          <DeleteFileButton
                            ytChannelId={ytChannelId}
                            ytVideoId={ytVideoId}
                            deleteType="SAVED_SCREENSHOTS"
                            className=""
                          >
                            <Trash2 className="w-4 h-4" />
                          </DeleteFileButton>
                        )}
                        {file.name === "all_screenshots" && (
                          <DeleteFileButton
                            ytChannelId={ytChannelId}
                            ytVideoId={ytVideoId}
                            deleteType="ALL_SCREENSHOTS"
                            className=""
                          >
                            <Trash2 className="w-4 h-4" />
                          </DeleteFileButton>
                        )}
                        {file.name === "thumbnails" && (
                          <DeleteFileButton
                            ytChannelId={ytChannelId}
                            ytVideoId={ytVideoId}
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
                {directoriesWithSize.map((directory, index) => (
                  <tr key={`directory-${index}`}>
                    <td className="font-mono text-sm">
                      {directory.name}/
                    </td>
                    <td>{directory.sizeMB}</td>
                    <td>
                      <div className="flex gap-1">
                        {directory.name === "saved_screenshots" && (
                          <DeleteFileButton
                            ytChannelId={ytChannelId}
                            ytVideoId={ytVideoId}
                            deleteType="SAVED_SCREENSHOTS"
                            className=""
                          >
                            <Trash2 className="w-4 h-4" />
                          </DeleteFileButton>
                        )}
                        {directory.name === "all_screenshots" && (
                          <DeleteFileButton
                            ytChannelId={ytChannelId}
                            ytVideoId={ytVideoId}
                            deleteType="ALL_SCREENSHOTS"
                            className=""
                          >
                            <Trash2 className="w-4 h-4" />
                          </DeleteFileButton>
                        )}
                        {directory.name === "thumbnails" && (
                          <DeleteFileButton
                            ytChannelId={ytChannelId}
                            ytVideoId={ytVideoId}
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
    );
  }

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h3 className="card-title text-lg">Files</h3>
          <OpenDirectoryButton
            ytChannelId={ytChannelId}
            ytVideoId={ytVideoId}
          />
        </div>
        <div className="text-center text-gray-500 py-4">
          No files found
        </div>
      </div>
    </div>
  );
}
