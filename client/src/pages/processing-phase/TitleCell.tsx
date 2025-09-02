import { Tooltip } from "@shared/ui";

export function TitleCell({
  title,
  channelTitle,
}: {
  title: string;
  channelTitle: string;
}) {
  return (
    <td>
      <div className="flex flex-col">
        <Tooltip content={title}>
          <span
            className="font-medium truncate block"
            style={{ maxWidth: "160px", width: "160px" }}
          >
            {title}
          </span>
        </Tooltip>
        <span className="text-xs opacity-70">{channelTitle}</span>
      </div>
    </td>
  );
}
