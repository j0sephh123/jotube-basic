import { CustomLink } from "@shared/ui";
import { ArrowLeft } from "lucide-react";

export function PlaylistHeaderTitleSection({
  name,
  channelsLength,
}: {
  name: string;
  channelsLength: number;
}) {
  return (
    <div className="flex items-center gap-4">
      <CustomLink to={`/playlists`} className="btn btn-ghost btn-sm btn-circle">
        <ArrowLeft className="w-5 h-5" />
      </CustomLink>
      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-base-content/60">{channelsLength} channels</p>
      </div>
    </div>
  );
}
