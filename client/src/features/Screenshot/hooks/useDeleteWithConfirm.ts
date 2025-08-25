import { useDeleteChannelScreenshot } from "./useDeleteChannelScreenshot";
import { useDialog } from "@shared/hooks";
import { type ChannelScreenshot } from "./useFetchChannelScreenshots";
import { useCallback } from "react";

export function useDeleteWithConfirm() {
  const deleteScreenshot = useDeleteChannelScreenshot();
  const dialogHook = useDialog();

  return useCallback(
    (screenshot: ChannelScreenshot) => {
      dialogHook.confirm({
        title: "Delete Screenshot",
        message: "Are you sure you want to delete this screenshot?",
        confirmText: "Delete",
        cancelText: "Cancel",
        variant: "warning",
        onYes: () => {
          deleteScreenshot.mutate(screenshot.id);
        },
      });
    },
    [deleteScreenshot, dialogHook]
  );
}
