import { Link } from "react-router-dom";
import Tooltip, { TooltipProps } from "../Tooltip";

type Props = {
  icon: React.ReactNode;
  to: string;
  tooltip?: Pick<TooltipProps, "color" | "position" | "content">;
};

export default function IconButton({ icon, to, tooltip }: Props) {
  const content = (
    <Link to={to} className="btn btn-ghost">
      {icon}
    </Link>
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
