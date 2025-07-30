import { useCallback, useState, useRef, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import IconYoutube from "@/shared/components/icons/IconYoutube";

const YT_VIDEO_ID_LENGTH = 11;

type Props = {
  onClose: () => void;
  onCreate: ({ ytVideoId }: { ytVideoId: string }) => void;
};

// TODO this component is ugly and needs refinement
export default function CreateChannel({
  onCreate,
  onClose,
}: Props): JSX.Element {
  const [ytVideoId, setVideoId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, []);

  const validateYoutubeId = useCallback((id: string): boolean => {
    const trimmedId = id.trim();
    if (trimmedId.length !== YT_VIDEO_ID_LENGTH) {
      setError(`YouTube ID must be exactly ${YT_VIDEO_ID_LENGTH} characters`);
      return false;
    }
    setError(null);
    return true;
  }, []);

  const handleCreate = useCallback(() => {
    if (validateYoutubeId(ytVideoId)) {
      onCreate({ ytVideoId });
    }
  }, [onCreate, validateYoutubeId, ytVideoId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setVideoId(value);

    if (!value) {
      setError(null);
    } else if (value.length > YT_VIDEO_ID_LENGTH) {
      setError(`YouTube ID must be exactly ${YT_VIDEO_ID_LENGTH} characters`);
    } else if (value.length === YT_VIDEO_ID_LENGTH) {
      validateYoutubeId(value);
    }
  };

  const clearInput = () => {
    setVideoId("");
    setError(null);
  };

  const isInputValid = ytVideoId.trim().length === YT_VIDEO_ID_LENGTH;

  return (
    <div className="bg-transparent p-4 w-[90%] mx-auto min-h-[400px] flex flex-col justify-center">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-center flex items-center justify-center gap-2">
          <IconYoutube />
          <span>Create YouTube Channel</span>
        </h2>

        <div className="form-control w-full mb-4">
          <label className="label py-1">
            <span className="label-text text-base font-semibold">
              YouTube Video ID
            </span>
            <span className="label-text-alt text-xs opacity-70">
              Must be YT_VIDEO_ID_LENGTH characters
            </span>
          </label>
          <div className="relative">
            <input
              type="text"
              ref={inputRef}
              className={`input input-bordered w-full pr-10 bg-base-100 focus:ring-2 h-12 text-lg ${
                error ? "input-error" : "focus:ring-primary"
              }`}
              onChange={handleInputChange}
              value={ytVideoId}
              placeholder="Enter YouTube video ID"
              maxLength={YT_VIDEO_ID_LENGTH}
            />
            {ytVideoId && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={clearInput}
                aria-label="Clear input"
              >
                <X size={20} />
              </button>
            )}
          </div>
          {error ? (
            <label className="label py-1">
              <span className="label-text-alt text-error flex items-center gap-1">
                <AlertCircle size={14} />
                {error}
              </span>
            </label>
          ) : (
            <label className="label py-1">
              <span className="label-text-alt text-xs">
                Example: dQw4w9WgXcQ ({ytVideoId.length}/YT_VIDEO_ID_LENGTH
                characters)
              </span>
            </label>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button className="btn btn-outline h-12 px-6" onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary h-12 px-6 gap-2"
            onClick={handleCreate}
            disabled={!isInputValid}
          >
            Create Channel
          </button>
        </div>
      </div>
    </div>
  );
}
