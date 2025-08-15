import { Link } from "react-router-dom";
import Tooltip from "@/shared/components/Tooltip";
import CopyValue from "@/shared/components/CopyValue";
import Avatar from "@/shared/components/Avatar";
import { Channel } from "../../../types";
import TableCol from "../TableCol";
import { routes } from "@/shared/utils/routes";
import SyncUploadsButton from "@/features/Upload/components/SyncUploadsButton";

type TitleCellProps = {
  channel: Channel;
  refetchPlaylist: () => void;
};

export default function TitleCell({ channel, refetchPlaylist }: TitleCellProps) {
  return (
    <TableCol className="max-w-[200px]">
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
              lastSyncedAt={channel.lastSyncedAt}
              ytChannelId={channel.ytId}
              id={channel.id}
              onSuccess={refetchPlaylist}
            />
          </div>
        </div>
      </div>
    </TableCol>
  );
}
