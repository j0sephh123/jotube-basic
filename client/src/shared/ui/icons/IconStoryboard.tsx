import { LayoutDashboard } from "lucide-react";
import { IconButton } from "@shared/ui";
// eslint-disable-next-line boundaries/element-types
import { useGetUploadsWithStoryboards } from "@features/Storyboard";

export function IconStoryboard({ count }: { count: number }) {
  const { mutateAsync: getStoryboards } = useGetUploadsWithStoryboards();

  return (
    <IconButton
      icon={<LayoutDashboard />}
      onClick={() => getStoryboards([])}
      tooltip={{
        content: "storyboard",
        position: "bottom",
        color: "primary",
      }}
      tip={count}
    />
  );
}
