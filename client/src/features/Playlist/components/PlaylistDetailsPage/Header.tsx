import { PlaylistDetailsResponse } from "@/generated/graphql";
import { routes } from "@/shared/utils/routes";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

type HeaderProps = {
  playlist: PlaylistDetailsResponse;
};

export default function Header({ playlist }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <Link
          to={routes.playlists()}
          className="btn btn-ghost btn-sm btn-circle"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{playlist.name}</h1>
          <p className="text-base-content/60">
            {playlist.channels.length} channels
          </p>
        </div>
      </div>
    </div>
  );
}
