import { useState, useRef, useEffect } from "react";
import { useCreateStoryboard } from "@features/Upload";
import { useSelectedItemsState } from "@shared/store";
import { Film } from "lucide-react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

type StoryboardIconProps = {
  ytChannelId?: string;
  playlistId?: number;
  className?: string;
};

export function StoryboardButton({
  ytChannelId,
  playlistId,
  className,
}: StoryboardIconProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [numberValue, setNumberValue] = useState<string>("10");
  const { mutateAsync: downloadStoryboards, isPending } = useCreateStoryboard();
  const selectedItemsState = useSelectedItemsState();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleGetStoryboards = (limit?: number) => {
    let payload;

    if (playlistId) {
      payload = {
        ids: [playlistId.toString()],
        resourceType: "playlist" as const,
        ...(limit && { limit }),
      };
    } else if (selectedItemsState.selectedIds.length === 0) {
      payload = {
        ids: [ytChannelId!],
        resourceType: "channel" as const,
        ...(limit && { limit }),
      };
    } else {
      payload = {
        ids: selectedItemsState.selectedIds.slice(),
        resourceType: "video" as const,
        ...(limit && { limit }),
      };
    }

    downloadStoryboards(payload);
    setIsOpen(false);
  };

  const handleGetAllStoryboards = () => {
    handleGetStoryboards();
  };

  const handleGetCustomStoryboards = () => {
    const num = parseInt(numberValue);
    if (num > 0 && num <= 100) {
      handleGetStoryboards(num);
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && parseInt(value) <= 100)) {
      setNumberValue(value);
    }
  };

  const isValidNumber =
    numberValue !== "" &&
    parseInt(numberValue) > 0 &&
    parseInt(numberValue) <= 100;

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <PopoverPrimitive.Trigger asChild>
        <div
          className={`cursor-pointer hover:text-primary transition-colors ${
            className || ""
          }`}
        >
          {isPending ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <Film className="w-4 h-4" />
          )}
        </div>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="bottom"
          align="start"
          sideOffset={5}
          className="bg-zinc-900 shadow-md rounded-md border border-zinc-700 p-4 w-[300px] z-50"
        >
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-white">
              {playlistId ? "Get Playlist Storyboards" : "Get Storyboards"}
            </h3>
            <p className="text-zinc-400 text-sm">
              {playlistId
                ? "How many storyboards would you like to fetch for this playlist?"
                : "How many storyboards would you like to fetch?"}
            </p>

            <div className="space-y-3">
              <button
                className="btn btn-outline btn-success btn-block"
                onClick={handleGetAllStoryboards}
                disabled={isPending}
              >
                Get All Storyboards
              </button>

              <div className="space-y-2">
                <label className="text-sm text-zinc-300">
                  Custom number (1-100):
                </label>
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={numberValue}
                    onChange={handleNumberChange}
                    placeholder="10"
                    className="input input-bordered input-sm flex-1"
                    disabled={isPending}
                    maxLength={3}
                  />
                  <button
                    className="btn btn-outline btn-primary btn-sm"
                    onClick={handleGetCustomStoryboards}
                    disabled={!isValidNumber || isPending}
                  >
                    Get
                  </button>
                </div>
                {numberValue !== "" &&
                  (parseInt(numberValue) <= 0 ||
                    parseInt(numberValue) > 100) && (
                    <div className="text-xs text-warning">
                      Please enter a number between 1 and 100
                    </div>
                  )}
              </div>
            </div>
          </div>
          <PopoverPrimitive.Arrow className="fill-zinc-900" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
