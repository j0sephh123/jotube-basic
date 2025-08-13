import { Channel } from "../../../types";
import TableCol from "../TableCol";
import { Film } from "lucide-react";
import { Link } from "react-router-dom";
import { routes } from "@/shared/utils/routes";

type StoryboardCountCellProps = {
  channel: Channel;
};

export default function StoryboardCountCell({
  channel,
}: StoryboardCountCellProps) {
  const count = channel.counts?.storyboardCount ?? 0;

  return (
    <TableCol className="text-center w-[80px]">
      <Link
        to={routes.channel(channel.ytId)}
        className="flex items-center gap-2 hover:text-primary transition-colors"
      >
        <span className="font-medium">{count}</span>
        <Film className="w-4 h-4 text-base-content/60" />
      </Link>
    </TableCol>
  );
}
