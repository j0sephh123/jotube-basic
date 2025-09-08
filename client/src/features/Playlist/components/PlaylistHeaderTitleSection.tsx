import { CustomLink } from "@shared/ui";
import { ArrowLeft } from "lucide-react";

export function PlaylistHeaderTitleSection({
  name,
  channelsLength,
  playlistId,
}: {
  name: string;
  channelsLength: number;
  playlistId: number;
}) {
  return (
    <div className="flex items-center gap-4">
      <CustomLink
        to={`/playlists/${playlistId}`}
        className="btn btn-ghost btn-sm btn-circle"
      >
        <ArrowLeft className="w-5 h-5" />
      </CustomLink>
      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-base-content/60">{channelsLength} channels</p>
      </div>
    </div>
  );
}
