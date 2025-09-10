import { Tv } from "lucide-react";
import { IconButton } from "@shared/ui";

export function IconTv() {
  return (
    <IconButton
      icon={<Tv />}
      to={`/tv`}
      tooltip={{
        content: "tv",
        position: "right",
        color: "primary",
      }}
    />
  );
}
