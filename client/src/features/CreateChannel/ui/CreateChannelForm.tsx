import Title from "./Title";
import Label from "./Label";

type Props = {
  actions: React.ReactNode;
  ytVideoId: string;
  inputRef: React.RefObject<HTMLInputElement>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CreateChannelForm({
  actions,
  ytVideoId,
  inputRef,
  handleInputChange,
}: Props) {
  return (
    <div className="bg-transparent p-4 w-[90%] mx-auto min-h-[400px] flex flex-col justify-center">
      <Title />
      <div className="form-control w-full mb-4">
        <Label />
        <div className="relative">
          <input
            type="text"
            ref={inputRef}
            className="input input-bordered w-full bg-base-100 focus:ring-2 h-12 text-lg focus:ring-primary"
            onChange={handleInputChange}
            value={ytVideoId}
            placeholder="Enter YouTube video ID"
          />
        </div>
        <label className="label py-1">
          <span className="label-text-alt text-xs">
            Example: dQw4w9WgXcQ ({ytVideoId.length} characters)
          </span>
        </label>
      </div>
      {actions}
    </div>
  );
}
