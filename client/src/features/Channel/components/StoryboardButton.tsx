import { useState } from "react";
import { Button } from "@shared/ui";
import { useCreateStoryboard } from "@features/Upload";
import { useSelectedItemsState } from "@shared/store";
import { StoryboardLimitDialog } from "./StoryboardLimitDialog";

type StoryboardButtonProps = {
  ytChannelId: string;
  className?: string;
};

export function StoryboardButton({
  ytChannelId,
  className,
}: StoryboardButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutateAsync: downloadStoryboards, isPending } = useCreateStoryboard();
  const selectedItemsState = useSelectedItemsState();

  const handleGetStoryboards = (limit?: number) => {
    const payload =
      selectedItemsState.selectedIds.length === 0
        ? {
            ids: [ytChannelId],
            resourceType: "channel" as const,
            ...(limit && { limit }),
          }
        : {
            ids: selectedItemsState.selectedIds.slice(),
            resourceType: "video" as const,
            ...(limit && { limit }),
          };

    downloadStoryboards(payload);
    setIsDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Button
        variant="outline"
        color="secondary"
        onClick={handleOpenDialog}
        disabled={isPending}
        className={className}
      >
        {isPending ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Processing...
          </>
        ) : (
          "Get Storyboards"
        )}
      </Button>

      <StoryboardLimitDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleGetStoryboards}
        isLoading={isPending}
      />
    </>
  );
}
