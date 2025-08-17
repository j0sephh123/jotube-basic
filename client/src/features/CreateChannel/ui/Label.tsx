import { YT_VIDEO_ID_LENGTH } from "../lib/validation";

export default function Label() {
  return (
    <label className="label py-1">
      <span className="label-text text-base font-semibold">
        YouTube Video ID
      </span>
      <span className="label-text-alt text-xs opacity-70">
        Must be {YT_VIDEO_ID_LENGTH} characters
      </span>
    </label>
  );
}
