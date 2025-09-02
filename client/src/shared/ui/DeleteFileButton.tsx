import React from "react";
import { useDeleteFileOrDirectory } from "@shared/hooks";
import { useDialog } from "@shared/hooks";
import clsx from "clsx";

type DeleteFileButtonProps = {
  ytChannelId: string;
  ytVideoId: string;
  deleteType: "VIDEO" | "SAVED_SCREENSHOTS" | "ALL_SCREENSHOTS" | "THUMBNAILS";
  className?: string;
  children: React.ReactNode;
};

const getDeleteTypeLabel = (deleteType: string) => {
  switch (deleteType) {
    case "VIDEO":
      return "video file";
    case "SAVED_SCREENSHOTS":
      return "saved screenshots directory";
    case "ALL_SCREENSHOTS":
      return "all screenshots directory";
    case "THUMBNAILS":
      return "thumbnails directory";
    default:
      return "file/directory";
  }
};

export const DeleteFileButton: React.FC<DeleteFileButtonProps> = ({
  ytChannelId,
  ytVideoId,
  deleteType,
  className = "",
  children,
}) => {
  const { mutate, isPending } = useDeleteFileOrDirectory();
  const dialogHook = useDialog();

  const handleDelete = () => {
    const label = getDeleteTypeLabel(deleteType);

    dialogHook.confirm({
      title: "Delete File/Directory",
      message: `Are you sure you want to delete the ${label}? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "error",
      onYes: async () => {
        try {
          const result = await mutate({
            variables: {
              deleteFileInput: {
                ytChannelId,
                ytVideoId,
                deleteType,
              },
            },
          });

          if (result.data?.deleteFileOrDirectory.success) {
            // Success is handled by refetchQueries
          } else {
            alert(
              `Failed to delete ${label}: ${
                result.data?.deleteFileOrDirectory.message || "Unknown error"
              }`
            );
          }
        } catch (error) {
          console.error("Error deleting file/directory:", error);
          alert(
            `Error deleting ${label}: ${
              error instanceof Error ? error.message : "Unknown error"
            }`
          );
        }
      },
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className={clsx(
        "btn btn-ghost btn-sm text-base-content/60 hover:text-error hover:bg-error/10",
        className
      )}
    >
      {isPending ? "Deleting..." : children}
    </button>
  );
};
