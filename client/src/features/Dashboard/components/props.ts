export type DashboardResponseData = {
  channels: Array<
    {
      id: number;
      createdAt: Date;
      title: string;
      ytId: string;
      src: string;
      lastSyncedAt: string | null;
    } & {
      saved?: number;
      thumbnails: number;
      defaults?: number;
      uploadsWithScreenshots?: number;
      screenshotsCount?: number;
      uploads?: {
        id: number;
        title: string;
        ytId: string;
        src: string;
        status: number;
        publishedAt: string;
        duration: number;
        amountOfSavedScreenshots: number;
      }[];
      screenshots: {
        ytVideoId: string;
        second: number;
      }[];
    }
  >;
  total: number;
};

export type DashboardItemListProps = {
  data: DashboardResponseData;
  refetchDashboardQuery: () => void;
};

export type HeaderProps = {
  total: number;
};

export type PaginationControlProps = {
  total: number;
};

export type BasicSelectProps<T> = {
  value: T;
  setValue: (value: T) => void;
  label: string;
  optionsProps: string[];
};
