import type { SortOrder, UploadsListInput } from "@shared/api";
import {
  UploadsListDocument,
  UploadsYearCountsDocument,
  useUploadsListQuery,
  useUploadsYearCountsQuery,
} from "@shared/api";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { type UploadsType } from "@shared/types";

export function useUploads({
  id,
  uploadsType,
  year,
}: {
  id: UploadsListInput["id"];
  uploadsType: UploadsType;
  year?: number | null;
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
        year: year || undefined,
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

export function useUploadsYearCounts({
  id,
  uploadsType,
}: {
  id: UploadsListInput["id"];
  uploadsType: UploadsType;
}) {
  const yearCountsQuery = useUploadsYearCountsQuery({
    variables: {
      uploadsYearCountsInput: {
        id,
        type: uploadsType,
      },
    },
  });

  return {
    yearCounts: yearCountsQuery.data?.uploadsYearCounts || [],
    isLoadingYearCounts: yearCountsQuery.loading,
    errorYearCounts: yearCountsQuery.error,
    refetchYearCounts: yearCountsQuery.refetch,
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

export function useRefetchUploadsYearCounts() {
  const apolloClient = useApolloClient();

  return useCallback(() => {
    apolloClient.refetchQueries({
      include: [UploadsYearCountsDocument],
    });
  }, [apolloClient]);
}
