import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type ChannelForPlaylistResponse = {
  __typename?: 'ChannelForPlaylistResponse';
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  ytId: Scalars['String']['output'];
};

/** Possible messages for channel creation responses */
export enum ChannelMessage {
  AlreadyExists = 'ALREADY_EXISTS',
  CreatedSuccessfully = 'CREATED_SUCCESSFULLY',
  FailedToCreate = 'FAILED_TO_CREATE',
  InvalidVideoId = 'INVALID_VIDEO_ID'
}

export type ChannelMetadataResponse = {
  __typename?: 'ChannelMetadataResponse';
  fetchedUntilEnd: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  lastSyncedAt?: Maybe<Scalars['String']['output']>;
  playlist?: Maybe<PlaylistInfo>;
  savedArtifactsCount: Scalars['Int']['output'];
  screenshotArtifactsCount: Scalars['Int']['output'];
  storyboardArtifactsCount: Scalars['Int']['output'];
  thumbnailArtifactsCount: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  videoArtifactsCount: Scalars['Int']['output'];
  videoCount: Scalars['Int']['output'];
};

export type ChannelResponse = {
  __typename?: 'ChannelResponse';
  id: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  ytId: Scalars['String']['output'];
};

export type ChannelUploadsResponse = {
  __typename?: 'ChannelUploadsResponse';
  createdAt: Scalars['String']['output'];
  fetchStartVideoId: Scalars['String']['output'];
  fetchedUntilEnd: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  lastSyncedAt?: Maybe<Scalars['String']['output']>;
  src: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  uploads: Array<UploadsListUploadResponse>;
  videoCount: Scalars['Int']['output'];
  ytId: Scalars['String']['output'];
};

export type ChannelsDashboardResponse = {
  __typename?: 'ChannelsDashboardResponse';
  channels: Array<DashboardChannelResponse>;
  total: Scalars['Int']['output'];
};

export type CleanShortUploadsInput = {
  ytChannelId: Scalars['String']['input'];
};

export type CleanShortUploadsResponse = {
  __typename?: 'CleanShortUploadsResponse';
  deletedCount: Scalars['Int']['output'];
};

export type CreateChannelInput = {
  ytVideoId: Scalars['String']['input'];
};

export type CreateChannelResponse = {
  __typename?: 'CreateChannelResponse';
  message: ChannelMessage;
  ytChannelId?: Maybe<Scalars['String']['output']>;
};

export type CreatePlaylistInput = {
  name: Scalars['String']['input'];
};

export type CreatePlaylistResponse = {
  __typename?: 'CreatePlaylistResponse';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type DashboardChannelResponse = {
  __typename?: 'DashboardChannelResponse';
  createdAt: Scalars['DateTime']['output'];
  defaults: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  lastSyncedAt?: Maybe<Scalars['DateTime']['output']>;
  playlist?: Maybe<DashboardPlaylistResponse>;
  saved: Scalars['Int']['output'];
  screenshotsCount: Scalars['Int']['output'];
  src: Scalars['String']['output'];
  storyboard: Scalars['Int']['output'];
  thumbnails: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  videoCount: Scalars['Int']['output'];
  ytId: Scalars['String']['output'];
};

export type DashboardPlaylistResponse = {
  __typename?: 'DashboardPlaylistResponse';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type DashboardVideoResponse = {
  __typename?: 'DashboardVideoResponse';
  channelId: Scalars['Int']['output'];
  channelTitle: Scalars['String']['output'];
  channelYtId: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  screenshotCount: Scalars['Int']['output'];
  src: Scalars['String']['output'];
  title: Scalars['String']['output'];
  ytId: Scalars['String']['output'];
};

export type DeleteChannelResponse = {
  __typename?: 'DeleteChannelResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type DeletePlaylistResponse = {
  __typename?: 'DeletePlaylistResponse';
  success: Scalars['Boolean']['output'];
};

export type DeleteUploadsResponse = {
  __typename?: 'DeleteUploadsResponse';
  success: Scalars['Boolean']['output'];
};

export type FetchDashboardInput = {
  defaultMax?: InputMaybe<Scalars['Float']['input']>;
  defaultMin?: InputMaybe<Scalars['Float']['input']>;
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
  page: Scalars['Float']['input'];
  sortOrder: Scalars['String']['input'];
  viewType?: InputMaybe<ViewType>;
};

export type FetchUploadsInput = {
  ytChannelId: Scalars['String']['input'];
};

export type FetchUploadsResponse = {
  __typename?: 'FetchUploadsResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  uploadIds?: Maybe<Array<Scalars['String']['output']>>;
};

export type FinishProcessUploadResponse = {
  __typename?: 'FinishProcessUploadResponse';
  artifact: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  ytId: Scalars['String']['output'];
};

export type GetSlidesInput = {
  ytChannelIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type GetSlidesResponse = {
  __typename?: 'GetSlidesResponse';
  id: Scalars['Float']['output'];
  isFav?: Maybe<Scalars['Boolean']['output']>;
  second: Scalars['Float']['output'];
  src: Scalars['String']['output'];
  ytVideoId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  cleanShortUploads: CleanShortUploadsResponse;
  createChannel: CreateChannelResponse;
  createPlaylist: CreatePlaylistResponse;
  deleteChannel: DeleteChannelResponse;
  deletePlaylist: DeletePlaylistResponse;
  deleteUploads: DeleteUploadsResponse;
  fetchUploads: FetchUploadsResponse;
  finishProcessingUpload: FinishProcessUploadResponse;
  saveUpload: SaveUploadResponse;
  syncUploads: SyncUploadsResponse;
  updateChannelPlaylist: UpdateChannelPlaylistResponse;
  updatePlaylist: UpdatePlaylistResponse;
};


export type MutationCleanShortUploadsArgs = {
  cleanShortUploadsInput: CleanShortUploadsInput;
};


export type MutationCreateChannelArgs = {
  createChannelInput: CreateChannelInput;
};


export type MutationCreatePlaylistArgs = {
  createPlaylistInput: CreatePlaylistInput;
};


export type MutationDeleteChannelArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeletePlaylistArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteUploadsArgs = {
  ytChannelId: Scalars['String']['input'];
  ytVideoIds: Array<Scalars['String']['input']>;
};


export type MutationFetchUploadsArgs = {
  fetchUploadsInput: FetchUploadsInput;
};


export type MutationFinishProcessingUploadArgs = {
  savedSeconds: Array<Scalars['Float']['input']>;
  ytChannelId: Scalars['String']['input'];
  ytVideoId: Scalars['String']['input'];
};


export type MutationSaveUploadArgs = {
  saveUploadInput: SaveUploadInput;
};


export type MutationSyncUploadsArgs = {
  syncUploadsInput: SyncUploadsInput;
};


export type MutationUpdateChannelPlaylistArgs = {
  updateChannelPlaylistInput: UpdateChannelPlaylistInput;
};


export type MutationUpdatePlaylistArgs = {
  id: Scalars['Int']['input'];
  updatePlaylistInput: UpdatePlaylistInput;
};

export type PlaylistChannelResponse = {
  __typename?: 'PlaylistChannelResponse';
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  ytId: Scalars['String']['output'];
};

export type PlaylistChannelWithCountsResponse = {
  __typename?: 'PlaylistChannelWithCountsResponse';
  id: Scalars['Int']['output'];
  savedCount: Scalars['Int']['output'];
  screenshotCount: Scalars['Int']['output'];
  src: Scalars['String']['output'];
  thumbnailCount: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  videoCount: Scalars['Int']['output'];
  ytId: Scalars['String']['output'];
};

export type PlaylistDetailsResponse = {
  __typename?: 'PlaylistDetailsResponse';
  channels: Array<PlaylistChannelWithCountsResponse>;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type PlaylistInfo = {
  __typename?: 'PlaylistInfo';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type PlaylistResponse = {
  __typename?: 'PlaylistResponse';
  channels: Array<PlaylistChannelResponse>;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  channelForPlaylist: ChannelForPlaylistResponse;
  channelMetadata: ChannelMetadataResponse;
  channelScreenshots: Array<GetSlidesResponse>;
  channelsCount: Scalars['Int']['output'];
  fetchDashboard: ChannelsDashboardResponse;
  fetchVideosDashboard: VideosDashboardResponse;
  getSlides: Array<GetSlidesResponse>;
  playlistDetails?: Maybe<PlaylistDetailsResponse>;
  playlists: Array<PlaylistResponse>;
  randomChannel: ChannelForPlaylistResponse;
  savedUploads: Array<SavedUploadsResponse>;
  screenshots: Array<ScreenshotsCountsResponse>;
  screenshotsByVideo: Array<VideoScreenshotResponse>;
  searchChannels: Array<SearchChannelResult>;
  searchVideos: Array<SearchVideoResult>;
  statisticsCounts: StatisticsCountsResponse;
  storyboards: Array<UploadsVideoStoryboardResponse>;
  thumbnailByVideoId?: Maybe<ThumbnailByVideoIdResponse>;
  uploadsList?: Maybe<ChannelUploadsResponse>;
  uploadsWithStoryboards: Array<UploadWithStoryboardResponse>;
  uploadsWithThumbnails: Array<UploadsWithThumbnailsResponse>;
};


export type QueryChannelForPlaylistArgs = {
  ytChannelId: Scalars['String']['input'];
};


export type QueryChannelMetadataArgs = {
  ytChannelId: Scalars['String']['input'];
};


export type QueryChannelScreenshotsArgs = {
  ytChannelId: Scalars['String']['input'];
};


export type QueryFetchDashboardArgs = {
  fetchDashboardInput: FetchDashboardInput;
};


export type QueryFetchVideosDashboardArgs = {
  page?: InputMaybe<Scalars['Float']['input']>;
  screenshotMax?: InputMaybe<Scalars['Float']['input']>;
  screenshotMin?: InputMaybe<Scalars['Float']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetSlidesArgs = {
  input: GetSlidesInput;
};


export type QueryPlaylistDetailsArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySavedUploadsArgs = {
  savedUploadsInput: SavedUploadsInput;
};


export type QueryScreenshotsByVideoArgs = {
  ytVideoId: Scalars['String']['input'];
};


export type QuerySearchChannelsArgs = {
  searchInput: SearchInput;
};


export type QuerySearchVideosArgs = {
  searchInput: SearchInput;
};


export type QueryStoryboardsArgs = {
  ytChannelId: Scalars['String']['input'];
};


export type QueryThumbnailByVideoIdArgs = {
  ytVideoId: Scalars['String']['input'];
};


export type QueryUploadsListArgs = {
  uploadsListInput: UploadsListInput;
};


export type QueryUploadsWithStoryboardsArgs = {
  input: StoryboardQueryInput;
};


export type QueryUploadsWithThumbnailsArgs = {
  input: UploadsWithThumbnailsInput;
};

export type SaveUploadInput = {
  uploads: Array<SaveUploadItemInput>;
};

export type SaveUploadItemInput = {
  ytChannelId: Scalars['String']['input'];
  ytVideoId: Scalars['String']['input'];
};

export type SaveUploadResponse = {
  __typename?: 'SaveUploadResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type SavedUploadsInput = {
  ytChannelIds: Array<Scalars['String']['input']>;
};

export type SavedUploadsResponse = {
  __typename?: 'SavedUploadsResponse';
  channel?: Maybe<UploadsChannelResponse>;
  totalUploads: Scalars['Int']['output'];
  uploads: Array<UploadResponse>;
  ytChannelId: Scalars['String']['output'];
};

export type ScreenshotsCountsResponse = {
  __typename?: 'ScreenshotsCountsResponse';
  count: Scalars['Float']['output'];
  month: Scalars['String']['output'];
};

export type SearchChannelResult = {
  __typename?: 'SearchChannelResult';
  src: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  ytId: Scalars['String']['output'];
};

export type SearchInput = {
  search: Scalars['String']['input'];
};

export type SearchVideoResult = {
  __typename?: 'SearchVideoResult';
  channelYtId: Scalars['String']['output'];
  src: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  ytId: Scalars['String']['output'];
};

/** Sort order for uploads list */
export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StatisticsCountsResponse = {
  __typename?: 'StatisticsCountsResponse';
  totalSaved: Scalars['Float']['output'];
  totalScreenshots: Scalars['Float']['output'];
  totalThumbnails: Scalars['Float']['output'];
};

export type StoryboardDataResponse = {
  __typename?: 'StoryboardDataResponse';
  createdAt: Scalars['String']['output'];
  fragments: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
  uploadsVideoId: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type StoryboardFragmentResponse = {
  __typename?: 'StoryboardFragmentResponse';
  createdAt: Scalars['String']['output'];
  fragments: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
  uploadsVideoId: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type StoryboardQueryInput = {
  ytChannelId: Scalars['String']['input'];
};

export type SyncUploadsInput = {
  channelId: Scalars['Int']['input'];
  ytChannelId: Scalars['String']['input'];
};

export type SyncUploadsResponse = {
  __typename?: 'SyncUploadsResponse';
  count: Scalars['Int']['output'];
};

export type ThumbnailByVideoIdResponse = {
  __typename?: 'ThumbnailByVideoIdResponse';
  createdAt: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  perRow: Scalars['Float']['output'];
  thumbnailsCount: Scalars['Float']['output'];
  totalSeconds: Scalars['Float']['output'];
  updatedAt: Scalars['String']['output'];
  uploadsVideo: UploadsVideoResponse;
  uploadsVideoId: Scalars['Float']['output'];
};

export type UpdateChannelPlaylistInput = {
  channelId: Scalars['Int']['input'];
  playlistId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateChannelPlaylistResponse = {
  __typename?: 'UpdateChannelPlaylistResponse';
  id: Scalars['Int']['output'];
  playlistId?: Maybe<Scalars['Int']['output']>;
  src: Scalars['String']['output'];
  title: Scalars['String']['output'];
  videoCount: Scalars['Int']['output'];
  ytId: Scalars['String']['output'];
};

export type UpdatePlaylistInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePlaylistResponse = {
  __typename?: 'UpdatePlaylistResponse';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type UploadResponse = {
  __typename?: 'UploadResponse';
  artifact: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  duration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  publishedAt: Scalars['String']['output'];
  src: Scalars['String']['output'];
  title: Scalars['String']['output'];
  ytId: Scalars['String']['output'];
};

export type UploadWithStoryboardResponse = {
  __typename?: 'UploadWithStoryboardResponse';
  artifact: Scalars['String']['output'];
  channelId: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  duration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  nextPageToken?: Maybe<Scalars['String']['output']>;
  publishedAt: Scalars['String']['output'];
  src: Scalars['String']['output'];
  storyboard: StoryboardFragmentResponse;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  ytId: Scalars['String']['output'];
};

export type UploadsChannelResponse = {
  __typename?: 'UploadsChannelResponse';
  id: Scalars['Int']['output'];
  src: Scalars['String']['output'];
  title: Scalars['String']['output'];
  totalUploads: Scalars['Int']['output'];
  uploads: Array<UploadResponse>;
  ytId: Scalars['String']['output'];
};

export type UploadsListInput = {
  sortOrder: SortOrder;
  ytChannelId: Scalars['String']['input'];
};

export type UploadsListUploadResponse = {
  __typename?: 'UploadsListUploadResponse';
  artifact: Scalars['String']['output'];
  channelId: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  duration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  nextPageToken?: Maybe<Scalars['String']['output']>;
  publishedAt: Scalars['String']['output'];
  src: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  ytId: Scalars['String']['output'];
};

export type UploadsVideoResponse = {
  __typename?: 'UploadsVideoResponse';
  channel: ChannelResponse;
  ytId: Scalars['String']['output'];
};

export type UploadsVideoStoryboardResponse = {
  __typename?: 'UploadsVideoStoryboardResponse';
  artifact: Scalars['String']['output'];
  channelId: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  duration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  nextPageToken?: Maybe<Scalars['String']['output']>;
  publishedAt: Scalars['String']['output'];
  src: Scalars['String']['output'];
  storyboard: StoryboardDataResponse;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  ytId: Scalars['String']['output'];
};

export type UploadsWithThumbnailsInput = {
  channelIds: Array<Scalars['Float']['input']>;
};

export type UploadsWithThumbnailsResponse = {
  __typename?: 'UploadsWithThumbnailsResponse';
  ytChannelId: Scalars['String']['output'];
  ytVideoId: Scalars['String']['output'];
};

export type VideoScreenshotResponse = {
  __typename?: 'VideoScreenshotResponse';
  id: Scalars['Float']['output'];
  isFav?: Maybe<Scalars['Boolean']['output']>;
  second: Scalars['Float']['output'];
  src: Scalars['String']['output'];
  ytChannelId: Scalars['String']['output'];
  ytVideoId: Scalars['String']['output'];
};

export type VideosDashboardResponse = {
  __typename?: 'VideosDashboardResponse';
  total: Scalars['Int']['output'];
  videos: Array<DashboardVideoResponse>;
};

/** Available view types for dashboard filtering */
export enum ViewType {
  HasStoryboards = 'HAS_STORYBOARDS',
  NoScreenshots = 'NO_SCREENSHOTS',
  NoUploads = 'NO_UPLOADS',
  Processed = 'PROCESSED',
  Saved = 'SAVED',
  Thumbnails = 'THUMBNAILS'
}

export type RandomChannelQueryVariables = Exact<{ [key: string]: never; }>;


export type RandomChannelQuery = { __typename?: 'Query', randomChannel: { __typename?: 'ChannelForPlaylistResponse', id: number, title: string, ytId: string } };

export type ChannelsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type ChannelsCountQuery = { __typename?: 'Query', channelsCount: number };


export const RandomChannelDocument = gql`
    query RandomChannel {
  randomChannel {
    id
    title
    ytId
  }
}
    `;

/**
 * __useRandomChannelQuery__
 *
 * To run a query within a React component, call `useRandomChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useRandomChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRandomChannelQuery({
 *   variables: {
 *   },
 * });
 */
export function useRandomChannelQuery(baseOptions?: Apollo.QueryHookOptions<RandomChannelQuery, RandomChannelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RandomChannelQuery, RandomChannelQueryVariables>(RandomChannelDocument, options);
      }
export function useRandomChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RandomChannelQuery, RandomChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RandomChannelQuery, RandomChannelQueryVariables>(RandomChannelDocument, options);
        }
export function useRandomChannelSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RandomChannelQuery, RandomChannelQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RandomChannelQuery, RandomChannelQueryVariables>(RandomChannelDocument, options);
        }
export type RandomChannelQueryHookResult = ReturnType<typeof useRandomChannelQuery>;
export type RandomChannelLazyQueryHookResult = ReturnType<typeof useRandomChannelLazyQuery>;
export type RandomChannelSuspenseQueryHookResult = ReturnType<typeof useRandomChannelSuspenseQuery>;
export type RandomChannelQueryResult = Apollo.QueryResult<RandomChannelQuery, RandomChannelQueryVariables>;
export const ChannelsCountDocument = gql`
    query ChannelsCount {
  channelsCount
}
    `;

/**
 * __useChannelsCountQuery__
 *
 * To run a query within a React component, call `useChannelsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useChannelsCountQuery(baseOptions?: Apollo.QueryHookOptions<ChannelsCountQuery, ChannelsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChannelsCountQuery, ChannelsCountQueryVariables>(ChannelsCountDocument, options);
      }
export function useChannelsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelsCountQuery, ChannelsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChannelsCountQuery, ChannelsCountQueryVariables>(ChannelsCountDocument, options);
        }
export function useChannelsCountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ChannelsCountQuery, ChannelsCountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ChannelsCountQuery, ChannelsCountQueryVariables>(ChannelsCountDocument, options);
        }
export type ChannelsCountQueryHookResult = ReturnType<typeof useChannelsCountQuery>;
export type ChannelsCountLazyQueryHookResult = ReturnType<typeof useChannelsCountLazyQuery>;
export type ChannelsCountSuspenseQueryHookResult = ReturnType<typeof useChannelsCountSuspenseQuery>;
export type ChannelsCountQueryResult = Apollo.QueryResult<ChannelsCountQuery, ChannelsCountQueryVariables>;