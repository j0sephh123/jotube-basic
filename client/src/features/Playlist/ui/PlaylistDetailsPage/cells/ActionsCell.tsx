import { Trash2 } from "lucide-react";
import type { PlaylistChannelWithCountsResponse } from "@/shared/api/generated/graphql";
import TableCol from "@/widgets/PlaylistDetails/ui/TableCol";

type ActionsCellProps = {
  channel: PlaylistChannelWithCountsResponse;
  onRemove: (channelId: number) => void;
  isRemoving: boolean;
};

export default function ActionsCell({
  channel,
  onRemove,
  isRemoving,
}: ActionsCellProps) {
  return (
    <TableCol className="text-center">
      <button
        onClick={() => onRemove(channel.id)}
        disabled={isRemoving}
        className="btn btn-sm btn-error btn-outline"
        title="Remove from playlist"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </TableCol>
  );
}
