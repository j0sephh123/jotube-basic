import { useDialog } from "@/shared/hooks/useDialog";
import { useUpdateChannelPlaylist } from "../../hooks";

export const useRemoveFromPlaylist = () => {
  const dialogHook = useDialog();
  const updateChannelPlaylist = useUpdateChannelPlaylist();

  const handleRemoveFromPlaylist = (channelId: number) => {
    dialogHook.confirm({
      title: "Remove from Playlist",
      message:
        "Are you sure you want to remove this channel from the playlist?",
      confirmText: "Remove",
      cancelText: "Cancel",
      variant: "warning",
      onYes: () => {
        updateChannelPlaylist.mutate({
          id: channelId,
          data: { playlistId: null },
        });
      },
    });
  };

  return {
    handleRemoveFromPlaylist,
    isPending: updateChannelPlaylist.isPending,
  };
};
