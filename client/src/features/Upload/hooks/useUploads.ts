import type { SortOrder, UploadsListInput } from "@shared/api";
import { UploadsListDocument, useUploadsListQuery } from "@shared/api";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { type UploadsType } from "@shared/types";

export function useUploads({
  id,
  uploadsType,
}: {
  id: UploadsListInput["id"];
  uploadsType: UploadsType;
}) {
  const [searchParams] = useSearchParams();
  const sortOrder = (searchParams.get("sort") || "DESC") as SortOrder;

  const query = useUploadsListQuery({
    variables: {
      uploadsListInput: {
        id,
        sortOrder,
        type: uploadsType,
        take: 150,
      },
    },
  });

  return {
    data: query.data,
    isLoading: query.loading,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useRefetchChannelUploads() {
  const apolloClient = useApolloClient();

  return useCallback(() => {
    apolloClient.refetchQueries({
      include: [UploadsListDocument],
    });
  }, [apolloClient]);
}
