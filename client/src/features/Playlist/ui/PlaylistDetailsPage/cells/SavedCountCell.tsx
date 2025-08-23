import { Save } from "lucide-react";
import { Link } from "react-router-dom";
import type { PlaylistChannelWithCountsResponse } from "@shared/api";
import { TableCol } from "@shared/ui";

type SavedCountCellProps = {
  channel: PlaylistChannelWithCountsResponse;
};

const routes = {
  savedChannel: (ytChannelId: string) => `/channels/${ytChannelId}/saved`,
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
