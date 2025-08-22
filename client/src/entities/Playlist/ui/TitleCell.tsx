import { Link } from "react-router-dom";
import { Tooltip, CopyValue, Avatar } from "@shared/ui";
import type { PlaylistChannelWithCountsResponse } from "@shared/api";
import { routes } from "@shared/routes";
import PlaylistTableCol from "./PlaylistTableCol";

type TitleCellProps = {
  channel: PlaylistChannelWithCountsResponse;
  refetchPlaylist: () => void;
  SyncUploadsButton: React.ComponentType<{
    ytChannelId: string;
    id: number;
    onSuccess: () => void;
  }>;
};

export default function TitleCell({
  channel,
  refetchPlaylist,
  SyncUploadsButton,
}: TitleCellProps) {
  return (
    <PlaylistTableCol className="max-w-[200px]">
      <div className="flex items-center gap-3">
        <Avatar
          ytId={channel.ytId}
          id={channel.id}
          src={channel.src}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col gap-1 min-w-0">
          <Link
            to={routes.channel(channel.ytId)}
            className="truncate hover:text-primary hover:underline cursor-pointer"
          >
            {channel.title}
          </Link>
          <div className="flex">
            <Tooltip content={channel.ytId} position="right">
              <CopyValue type="id" value={channel.ytId} />
            </Tooltip>
            <SyncUploadsButton
              ytChannelId={channel.ytId}
              id={channel.id}
              onSuccess={refetchPlaylist}
            />
          </div>
        </div>
      </div>
    </PlaylistTableCol>
  );
}
