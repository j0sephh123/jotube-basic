import { clsx } from "clsx";
import { ListMusic, ChevronDown } from "lucide-react";
import { PlaylistsPopover } from "@shared/ui";
import { useCustomNavigate } from "@shared/hooks";
import { type To } from "@shared/types";
import { SegmentedButton } from "./SegmentedButton";
// eslint-disable-next-line import/no-internal-modules, boundaries/element-types
import { type DashboardType } from "@widgets/Dashboard/types";
// eslint-disable-next-line import/no-internal-modules, boundaries/element-types
import { useGetPlaylist } from "@features/Playlist";
import { useParams } from "react-router-dom";

type SegmentedSwitchProps = {
  leftLabel: string;
  rightLabel: string;
  value: DashboardType;
  onChange: (v: DashboardType) => void;
  className?: string;
};

export function SegmentedSwitch({
  leftLabel,
  rightLabel,
  value,
  onChange,
  className,
}: SegmentedSwitchProps) {
  const navigate = useCustomNavigate();
  const playlistId = useParams().playlistId;

  const { data } = useGetPlaylist(playlistId ? parseInt(playlistId) : null);

  const customTrigger = (
    <button
      type="button"
      className={clsx(
        "flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors duration-200 border-x border-primary/20",
        value === "playlists"
          ? "bg-primary text-primary-content"
          : "bg-base-200 text-base-content/80 hover:bg-base-300"
      )}
    >
      <ListMusic className="h-4 w-4" />
      <span>{data?.playlistDetails?.name || "Playlists"}</span>
      <ChevronDown className="h-3 w-3" />
    </button>
  );

  return (
    <div
      className={clsx(
        "flex w-80 rounded-full overflow-hidden border-2 border-primary bg-base-200",
        className
      )}
    >
      <SegmentedButton
        isActive={value === "channels"}
        onClick={() => onChange("channels")}
      >
        {leftLabel}
      </SegmentedButton>

      <PlaylistsPopover
        customTrigger={customTrigger}
        onPlaylistClick={(playlistId) => {
          navigate(`/dashboard/playlists/channels/${playlistId}` as To);
        }}
      />

      <SegmentedButton
        isActive={value === "videos"}
        onClick={() => onChange("videos")}
        className="flex items-center justify-center gap-2"
      >
        {rightLabel}
      </SegmentedButton>
    </div>
  );
}
