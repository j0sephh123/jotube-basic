import { Channel } from "../../../types";
import TableCol from "../TableCol";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { routes } from "@/shared/utils/routes";

type VideoCountCellProps = {
  channel: Channel;
};

export default function VideoCountCell({ channel }: VideoCountCellProps) {
  const count = channel.counts?.videoCount ?? 0;

  return (
    <TableCol className="text-center w-[80px]">
      <Link
        to={routes.channel(channel.ytId)}
        className="flex items-center gap-2 hover:text-primary transition-colors"
      >
        <span className="font-medium">{count}</span>
        <Play className="w-4 h-4 text-base-content/60" />
      </Link>
    </TableCol>
  );
}
