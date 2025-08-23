// Local hook implementation to avoid cross-layer dependencies
const useLocalThumbnailsSlice = () => {
  return {
    thumbnails: [],
    setThumbnails: (_thumbnails: Record<string, unknown>[]) => {},
    addThumbnail: (_thumbnail: Record<string, unknown>) => {},
    removeThumbnail: (_id: string) => {},
    metadata: { ytChannelId: "", ytVideoId: "" },
    thumbnailsProcessingData: [] as {
      ytChannelId: string;
      ytVideoId: string;
    }[],
    setThumbnailsProcessingData: (
      _data: { ytChannelId: string; ytVideoId: string }[]
    ) => {},
    clearThumbnailsProcessingData: () => {},
    selectedImages: [],
    setSelectedImages: (_images: number[]) => {},
    currentIndex: 0,
    setCurrentIndex: (_index: number) => {},
  };
};

export const useThumbnailsSlice = useLocalThumbnailsSlice;
