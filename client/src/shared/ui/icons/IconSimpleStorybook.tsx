import { BookOpen } from "lucide-react";
import { IconButton } from "@shared/ui";

export function IconSimpleStorybook() {
  return (
    <IconButton
      icon={<BookOpen />}
      to={`/simple-storybook`}
      tooltip={{
        content: "simple storybook",
        position: "right",
        color: "primary",
      }}
    />
  );
}
