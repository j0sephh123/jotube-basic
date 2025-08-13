import Tooltip from "@/shared/components/Tooltip";
import CopyValue from "@/shared/components/CopyValue";
import { Channel } from "../../../types";
import TableCol from "../TableCol";

type TitleCellProps = {
  channel: Channel;
};

export default function TitleCell({ channel }: TitleCellProps) {
  return (
    <TableCol className="max-w-[120px]">
      <div className="flex flex-col gap-1">
        <Tooltip content={channel.title} position="top">
          <div className="truncate max-w-[120px]">{channel.title}</div>
        </Tooltip>
        <Tooltip content={channel.ytId} position="right">
          <CopyValue type="id" value={channel.ytId} />
        </Tooltip>
      </div>
    </TableCol>
  );
}
