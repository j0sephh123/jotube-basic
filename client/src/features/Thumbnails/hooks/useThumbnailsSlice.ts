// Local hook implementation to avoid cross-layer dependencies
const useLocalThumbnailsSlice = () => {
  return {
    thumbnails: [],
    setThumbnails: (_thumbnails: Record<string, unknown>[]) => {},
    addThumbnail: (_thumbnail: Record<string, unknown>) => {},
    removeThumbnail: (_id: string) => {},
  };
};

export const useThumbnailsSlice = useLocalThumbnailsSlice;
