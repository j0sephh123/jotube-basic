import { useState } from "react";
// eslint-disable-next-line boundaries/element-types
import { useGetPlaylists } from "@features/Playlist";
import PlaylistsPopoverWrapper from "./Wrapper";
import { PlaylistListItemNavbar } from "./PlaylistListItemNavbar";
import { type ReactNode } from "react";

type PlaylistsPopoverProps = {
  customTrigger?: ReactNode;
  onClick?: () => void;
  onPlaylistClick?: (playlistId: number) => void;
};

export default function PlaylistsPopover({
  customTrigger,
  onClick,
  onPlaylistClick,
}: PlaylistsPopoverProps) {
  const { data: playlists = [] } = useGetPlaylists();
  const [isOpen, setIsOpen] = useState(false);

  const playlistCount = playlists.length;

  return (
    <PlaylistsPopoverWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      playlistCount={playlistCount}
      customTrigger={customTrigger}
      onClick={() => {
        onClick?.();
        // TODO why doesnt this work??
        setIsOpen(false);
      }}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">Playlists</h3>
          <span className="text-sm text-zinc-400">
            {playlistCount} playlist{playlistCount !== 1 ? "s" : ""}
          </span>
        </div>

        {playlistCount === 0 ? (
          <div className="text-center py-8">
            <p className="text-zinc-400 text-sm">No playlists found</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700">
            {playlists.map((playlist) => (
              <PlaylistListItemNavbar
                key={playlist.id}
                playlist={playlist}
                onPlaylistClick={onPlaylistClick}
              />
            ))}
          </div>
        )}
      </div>
    </PlaylistsPopoverWrapper>
  );
}
