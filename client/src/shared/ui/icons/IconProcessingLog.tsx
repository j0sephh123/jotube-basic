import { DatabaseIcon } from "lucide-react";
import { IconButton } from "@shared/ui";

export function IconProcessingLog() {
  return (
    <IconButton
      icon={<DatabaseIcon />}
      to={`/processing-phase/latest`}
      tooltip={{
        content: "processing log",
        position: "bottom",
        color: "primary",
      }}
      text="Processing Log"
    />
  );
}
