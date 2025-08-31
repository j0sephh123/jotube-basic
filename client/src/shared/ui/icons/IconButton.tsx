import type { TooltipProps } from "@shared/ui";
import { Tooltip } from "@shared/ui";
import { CustomLink, type CustomLinkProps } from "../CustomLink";

type Props = {
  icon: React.ReactNode;
  to?: CustomLinkProps["to"];
  onClick?: () => void;
  tooltip?: Pick<TooltipProps, "color" | "position" | "content">;
  tip?: number;
};

export default function IconButton({ icon, to, onClick, tooltip, tip }: Props) {
  const content = to ? (
    <CustomLink to={to} className="btn btn-ghost">
      {icon}
      {tip && (
        <span className="absolute -top-1 -right-1 text-xs bg-zinc-600 text-white rounded-full px-1 py-0 text-[10px] leading-tight min-w-4 text-center">
          {tip.toString()}
        </span>
      )}
    </CustomLink>
  ) : (
    <button onClick={onClick} className="btn btn-ghost">
      {icon}
      {tip && (
        <span className="absolute -top-1 -right-1 text-xs bg-zinc-600 text-white rounded-full px-1 py-0 text-[10px] leading-tight min-w-4 text-center">
          {tip.toString()}
        </span>
      )}
    </button>
  );

  if (tooltip) {
    return (
      <Tooltip
        position={tooltip.position}
        color={tooltip.color}
        content={tooltip.content}
      >
        {content}
      </Tooltip>
    );
  }

  return content;
}
