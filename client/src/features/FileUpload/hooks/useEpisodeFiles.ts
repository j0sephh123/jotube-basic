import { nestFetcher } from "@shared/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { type UploadedFileInfo } from "../types";
import { QUERY_KEYS } from "./constants";

export function useEpisodeFiles() {
  const { episodeId } = useParams<{ episodeId: string }>();

  const {
    data: uploadedFiles = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.uploadedFiles,
    queryFn: () =>
      nestFetcher<UploadedFileInfo[]>({
        method: "GET",
        url: `/file-upload/files/${episodeId}`,
      }),
    enabled: !!episodeId,
  });

  return {
    uploadedFiles,
    isLoading,
    error,
    refetch,
  };
}
