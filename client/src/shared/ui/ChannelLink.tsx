import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

type Props = PropsWithChildren<{
  ytId: string;
  where: "index" | "saved" | "gallery" | "storyboard" | "new-gallery";
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}>;

export default function ChannelLink({
  ytId,
  children,
  where,
  className,
  style,
  onClick,
}: Props) {
  let path = `/channels/${ytId}`;
  if (where !== "index") {
    path += `/${where}`;
  }

  return (
    <Link to={path} className={className} style={style} onClick={onClick}>
      {children}
    </Link>
  );
}
