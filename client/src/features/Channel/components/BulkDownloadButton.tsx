import { useState, useRef, useEffect } from "react";
import { Download } from "lucide-react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useDownload } from "@features/Upload";
import { useSavedVideos } from "@features/Channel";

type BulkDownloadButtonProps = {
  channelId: number;
  className?: string;
};

export function BulkDownloadButton({
  channelId,
  className,
}: BulkDownloadButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [numberValue, setNumberValue] = useState<string>("10");
  const { mutateAsync: downloadVideos, isPending } = useDownload();
  const { savedVideos, isLoading } = useSavedVideos(channelId);
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

  const handleDownloadVideos = (limit?: number) => {
    if (!savedVideos || savedVideos.length === 0) return;

    const videosToDownload = limit ? savedVideos.slice(0, limit) : savedVideos;

    downloadVideos([
      {
        channelId,
        ytVideoIds: videosToDownload,
      },
    ]);
    setIsOpen(false);
  };

  const handleDownloadAll = () => {
    handleDownloadVideos();
  };

  const handleDownloadCustom = () => {
    const num = parseInt(numberValue);
    if (num > 0 && num <= 100) {
      handleDownloadVideos(num);
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

  const hasVideos = savedVideos && savedVideos.length > 0;

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          className={`btn btn-ghost btn-sm ${className || ""}`}
          disabled={isLoading || !hasVideos || isPending}
        >
          <Download className="w-4 h-4" />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg p-4 w-80 z-50"
          sideOffset={5}
        >
          <div className="space-y-3">
            <h3 className="font-semibold text-white">Download Videos</h3>
            <p className="text-sm text-zinc-300">
              {isLoading
                ? "Loading videos..."
                : hasVideos
                ? `Found ${savedVideos.length} saved videos`
                : "No saved videos found"}
            </p>

            {hasVideos && (
              <div className="space-y-3">
                <button
                  className="btn btn-outline btn-success btn-block"
                  onClick={handleDownloadAll}
                  disabled={isPending}
                >
                  Download All Videos
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
                      onClick={handleDownloadCustom}
                      disabled={!isValidNumber || isPending}
                    >
                      Download
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
            )}
          </div>
          <PopoverPrimitive.Arrow className="fill-zinc-900" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
