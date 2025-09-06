import { useGetEpisodesWithThumbnailsQuery } from "@shared/api";

export function useGetEpisodesWithThumbnails() {
  const { mutateAsync, ...rest } = useGetEpisodesWithThumbnailsQuery({
    variables: { input: { episodeIds: [] } },
    skip: true,
  });

  return {
    mutateAsync: (episodeIds: number[]) =>
      mutateAsync({
        variables: { input: { episodeIds } },
      }),
    ...rest,
  };
}
