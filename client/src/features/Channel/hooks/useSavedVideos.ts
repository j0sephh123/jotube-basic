import { useUploadsListQuery, SortOrder } from "@shared/api";
import { IdType } from "@shared/api";

export function useSavedVideos(channelId: number) {
  const { data, loading, error } = useUploadsListQuery({
    variables: {
      uploadsListInput: {
        id: { type: IdType.Channel, value: channelId },
        type: "saved",
        sortOrder: SortOrder.Desc,
        take: 1000,
      },
    },
  });

  const savedVideos = data?.uploadsList?.map((upload) => upload.ytId) || [];

  return {
    savedVideos,
    isLoading: loading,
    error,
  };
}
