import { Tooltip } from "@shared/ui";

export function TitleCell({ title, ytId }: { title: string; ytId: string }) {
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
        <span className="text-xs opacity-70">{ytId}</span>
      </div>
    </td>
  );
}
