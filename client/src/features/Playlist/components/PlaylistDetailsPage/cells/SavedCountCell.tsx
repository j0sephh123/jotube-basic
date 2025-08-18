import { Save } from "lucide-react";
import { Link } from "react-router-dom";
import { routes } from "@/shared/routes";
import { PlaylistChannelWithCountsResponse } from "@/shared/api/generated/graphql";
import TableCol from "@/widgets/PlaylistDetails/ui/TableCol";

type SavedCountCellProps = {
  channel: PlaylistChannelWithCountsResponse;
};

export default function SavedCountCell({ channel }: SavedCountCellProps) {
  return (
    <TableCol className="text-center">
      <Link
        to={routes.savedChannel(channel.ytId)}
        className="flex items-center gap-2 hover:text-primary transition-colors"
      >
        <span className="font-medium">{channel.savedCount}</span>
        <Save className="w-4 h-4 text-base-content/60" />
      </Link>
    </TableCol>
  );
}
