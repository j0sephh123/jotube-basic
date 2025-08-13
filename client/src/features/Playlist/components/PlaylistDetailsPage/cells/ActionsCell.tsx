import { Trash2 } from "lucide-react";
import { Channel } from "../../../types";

type ActionsCellProps = {
  onRemove: (channelId: number) => void;
  isRemoving: boolean;
  channel: Channel;
};

export default function ActionsCell({
  onRemove,
  isRemoving,
  channel,
}: ActionsCellProps) {
  return (
    <td>
      <div className="flex gap-2">
        <button
          onClick={() => onRemove(channel.id)}
          className="btn btn-error btn-xs"
          disabled={isRemoving}
        >
          <Trash2 className="w-4 h-4" />
          Remove
        </button>
      </div>
    </td>
  );
}
