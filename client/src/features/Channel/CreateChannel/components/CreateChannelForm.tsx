import { X, AlertCircle } from "lucide-react";
import IconYoutube from "@/shared/components/icons/IconYoutube";
import { useCreateChannelForm } from "../hooks/useCreateChannelForm";
import { YT_VIDEO_ID_LENGTH } from "../utils/validation";

type Props = {
  onClose: () => void;
  onSubmit: ({ ytVideoId }: { ytVideoId: string }) => void;
};

export default function CreateChannelForm({
  onSubmit,
  onClose,
}: Props): JSX.Element {
  const {
    ytVideoId,
    error,
    inputRef,
    isInputValid,
    handleInputChange,
    clearInput,
    validateInput,
  } = useCreateChannelForm();

  const handleSubmit = () => {
    if (validateInput(ytVideoId)) {
      onSubmit({ ytVideoId });
    }
  };

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
              Must be {YT_VIDEO_ID_LENGTH} characters
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
                Example: dQw4w9WgXcQ ({ytVideoId.length}/{YT_VIDEO_ID_LENGTH}{" "}
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
            onClick={handleSubmit}
            disabled={!isInputValid}
          >
            Create Channel
          </button>
        </div>
      </div>
    </div>
  );
}
