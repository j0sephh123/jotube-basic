import { Channel } from "../../../types";
import TableCol from "../TableCol";
import { Save } from "lucide-react";
import { Link } from "react-router-dom";
import { routes } from "@/shared/utils/routes";

type SavedCountCellProps = {
  channel: Channel;
};

export default function SavedCountCell({ channel }: SavedCountCellProps) {
  const count = channel.counts?.savedCount ?? 0;

  return (
    <TableCol className="text-center w-[80px]">
      <Link
        to={routes.savedChannel(channel.ytId)}
        className="flex items-center gap-2 hover:text-primary transition-colors"
      >
        <span className="font-medium">{count}</span>
        <Save className="w-4 h-4 text-base-content/60" />
      </Link>
    </TableCol>
  );
}
