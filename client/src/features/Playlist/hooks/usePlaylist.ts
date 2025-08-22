// Local hook implementation to avoid cross-layer dependencies
const useLocalPlaylist = () => {
  return {
    playlists: [],
    setPlaylists: (_playlists: Record<string, unknown>[]) => {},
    addPlaylist: (_playlist: Record<string, unknown>) => {},
    removePlaylist: (_id: string) => {},
  };
};

export const usePlaylist = useLocalPlaylist;
