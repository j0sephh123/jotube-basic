import { Playlist } from "../../types";
import { useRemoveFromPlaylist } from "./useRemoveFromPlaylist";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import TitleCell from "./cells/TitleCell";
import ActionsCell from "./cells/ActionsCell";

type TableProps = {
  playlist: Playlist;
};

export default function Table({ playlist }: TableProps) {
  const { handleRemoveFromPlaylist, isPending } = useRemoveFromPlaylist();

  return (
    <TableHeader>
      {playlist.channels.map((channel) => (
        <TableRow
          key={channel.id}
          cols={[
            <TitleCell channel={channel} />,
            <ActionsCell
              channel={channel}
              onRemove={handleRemoveFromPlaylist}
              isRemoving={isPending}
            />,
          ]}
        />
      ))}
    </TableHeader>
  );
}
