import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { routes } from "@shared/routes";
import type { PlaylistChannelWithCountsResponse } from "@shared/api/generated/graphql";

type VideoCountCellProps = {
  channel: PlaylistChannelWithCountsResponse;
};

export default function VideoCountCell({ channel }: VideoCountCellProps) {
  return (
    <div className="text-center">
      <Link
        to={routes.channel(channel.ytId)}
        className="flex items-center gap-2 hover:text-primary transition-colors"
      >
        <span className="font-medium">{channel.videoCount}</span>
        <Play className="w-4 h-4 text-base-content/60" />
      </Link>
    </div>
  );
}
