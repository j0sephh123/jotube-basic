import { useLazyQuery } from "@apollo/client";
import { UPLOADS_WITH_STORYBOARDS } from "@/api/graphql/queries/queries";

type UploadsWithStoryboardsResponse = {
  id: number;
  ytId: string;
  title: string;
  src: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  channelId: number;
  nextPageToken: string | null;
  duration: number | null;
  artifact: string;
  storyboard: {
    id: number;
    uploadsVideoId: number;
    fragments: number;
    url: string;
    createdAt: string;
    updatedAt: string;
  };
}[];

export function useGetUploadsWithStoryboards() {
  const [getUploadsWithStoryboards, { loading, error, data }] = useLazyQuery<{
    uploadsWithStoryboards: UploadsWithStoryboardsResponse;
  }>(UPLOADS_WITH_STORYBOARDS);

  return {
    mutateAsync: (ytChannelId: string) => {
      return getUploadsWithStoryboards({
        variables: { input: { ytChannelId } },
      });
    },
    isPending: loading,
    data: data?.uploadsWithStoryboards,
    error,
  };
}
