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

export function VideoFiles({
  ytChannelId,
  ytVideoId,
  filesWithSize,
  directoriesWithSize,
  totalSizeMB,
}: VideoFilesProps) {
  const hasFiles =
    (filesWithSize && filesWithSize.length > 0) ||
    (directoriesWithSize && directoriesWithSize.length > 0);

  if (hasFiles) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Files
            </h3>
            <OpenDirectoryButton
              collection={ytChannelId}
              media={ytVideoId}
            />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Total size: {totalSizeMB} MB
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600">
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    Size (MB)
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filesWithSize.map((file, index) => (
                  <tr
                    key={`file-${index}`}
                    className={`border-b border-gray-100 dark:border-gray-700 ${
                      index % 2 === 0
                        ? "bg-white dark:bg-gray-800"
                        : "bg-gray-50 dark:bg-gray-700"
                    }`}
                  >
                    <td className="py-3 px-4 font-mono text-sm text-gray-900 dark:text-gray-100">
                      {file.name}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {file.sizeMB}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        {(file.name.endsWith(".mp4") ||
                          file.name.endsWith(".mkv") ||
                          file.name.endsWith(".wmv") ||
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
                  <tr
                    key={`directory-${index}`}
                    className="border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800"
                  >
                    <td className="py-3 px-4 font-mono text-sm text-gray-900 dark:text-gray-100">
                      {directory.name}/
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {directory.sizeMB}
                    </td>
                    <td className="py-3 px-4">
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Files
          </h3>
          <OpenDirectoryButton
            collection={ytChannelId}
            media={ytVideoId}
          />
        </div>
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No files found
        </div>
      </div>
    </div>
  );
}
