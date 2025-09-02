import { useParams } from "react-router-dom";
import { ViewType } from "@shared/api";

export enum DashboardViewType {
  SAVED = "saved",
  PROCESSED = "processed",
  NO_UPLOADS = "no-uploads",
  NO_SCREENSHOTS = "no-screenshots",
  THUMBNAILS = "thumbnails",
  HAS_STORYBOARDS = "has-storyboards",
}

export enum DashboardType {
  CHANNELS = "channels",
  VIDEOS = "videos",
}

type Variant = "ViewType" | "ytChannelId" | "DashboardParams" | "ytVideoId";

export function useTypedParams(variant: "ViewType"): ViewType | null;
export function useTypedParams(variant: "ytChannelId"): string;
export function useTypedParams(variant: "ytVideoId"): string;
export function useTypedParams(variant: "DashboardParams"): {
  type: DashboardType;
  viewType: DashboardViewType;
};
export function useTypedParams(
  variant: Variant
):
  | string
  | ViewType
  | null
  | { type: DashboardType; viewType: DashboardViewType } {
  const params = useParams();

  if (variant === "ytChannelId") {
    return params.ytChannelId as string;
  }

  if (variant === "ViewType") {
    return mapViewTypeToGraphQL(params.viewType) ?? null;
  }

  if (variant === "ytVideoId") {
    return params.ytVideoId as string;
  }

  if (variant === "DashboardParams") {
    const type = params.type as DashboardType;
    const viewType = params.viewType as DashboardViewType;
    return { type, viewType };
  }

  return "";
}

const mapViewTypeToGraphQL = (
  viewType: string | undefined
): ViewType | undefined => {
  if (!viewType) return undefined;

  switch (viewType) {
    case DashboardViewType.SAVED:
      return ViewType.Saved;
    case DashboardViewType.PROCESSED:
      return ViewType.Processed;
    case DashboardViewType.NO_UPLOADS:
      return ViewType.NoUploads;
    case DashboardViewType.NO_SCREENSHOTS:
      return ViewType.NoScreenshots;
    case DashboardViewType.THUMBNAILS:
      return ViewType.Thumbnails;
    case DashboardViewType.HAS_STORYBOARDS:
      return ViewType.HasStoryboards;
    default:
      throw new Error(`Invalid view type: ${viewType}`);
  }
};
