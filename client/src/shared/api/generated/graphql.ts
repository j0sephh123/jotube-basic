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
  featuredScreenshots: Array<FeaturedScreenshotResponse>;
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
  featuredScreenshots: Array<FeaturedScreenshotResponse>;
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

export type FeaturedScreenshotResponse = {
  __typename?: 'FeaturedScreenshotResponse';
  id: Scalars['Int']['output'];
  second: Scalars['Int']['output'];
  src: Scalars['String']['output'];
  ytVideoId: Scalars['String']['output'];
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

export type GetScreenshotsInput = {
  ytChannelIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type GetScreenshotsResponse = {
  __typename?: 'GetScreenshotsResponse';
  id: Scalars['Float']['output'];
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
  featuredScreenshots: Array<FeaturedScreenshotResponse>;
  id: Scalars['Int']['output'];
  lastSyncedAt?: Maybe<Scalars['String']['output']>;
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

export type PlaylistUploadsListInput = {
  playlistId: Scalars['Int']['input'];
  uploadsType: Scalars['String']['input'];
};

export type PlaylistUploadsListResponse = {
  __typename?: 'PlaylistUploadsListResponse';
  uploads: Array<PlaylistUploadsListUploadResponse>;
};

export type PlaylistUploadsListUploadResponse = {
  __typename?: 'PlaylistUploadsListUploadResponse';
  channelTitle: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  publishedAt: Scalars['String']['output'];
  src: Scalars['String']['output'];
  title: Scalars['String']['output'];
  ytChannelId: Scalars['String']['output'];
  ytId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  channelForPlaylist: ChannelForPlaylistResponse;
  channelMetadata: ChannelMetadataResponse;
  channelScreenshots: Array<GetScreenshotsResponse>;
  fetchDashboard: ChannelsDashboardResponse;
  fetchVideosDashboard: VideosDashboardResponse;
  getScreenshots: Array<GetScreenshotsResponse>;
  playlistDetails?: Maybe<PlaylistDetailsResponse>;
  playlistUploadsList: PlaylistUploadsListResponse;
  playlists: Array<PlaylistResponse>;
  searchChannels: Array<SearchChannelResult>;
  searchVideos: Array<SearchVideoResult>;
  statisticsCounts: StatisticsCountsResponse;
  storyboards: Array<UploadsVideoStoryboardResponse>;
  thumbnailByVideoId?: Maybe<ThumbnailByVideoIdResponse>;
  uploadsList: UploadsListResponse;
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
  input: GetScreenshotsInput;
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


export type QueryGetScreenshotsArgs = {
  input: GetScreenshotsInput;
};


export type QueryPlaylistDetailsArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPlaylistUploadsListArgs = {
  playlistUploadsListInput: PlaylistUploadsListInput;
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

export type UploadsListInput = {
  sortOrder: SortOrder;
  take: Scalars['Int']['input'];
  type: Scalars['String']['input'];
  ytChannelId: Scalars['String']['input'];
};

export type UploadsListMetadata = {
  __typename?: 'UploadsListMetadata';
  take: Scalars['Int']['output'];
};

export type UploadsListResponse = {
  __typename?: 'UploadsListResponse';
  createdAt: Scalars['String']['output'];
  fetchStartVideoId: Scalars['String']['output'];
  fetchedUntilEnd: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  lastSyncedAt?: Maybe<Scalars['String']['output']>;
  metadata: UploadsListMetadata;
  src: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  uploads: Array<UploadsListUploadResponse>;
  videoCount: Scalars['Int']['output'];
  ytId: Scalars['String']['output'];
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
  channelTitle: Scalars['String']['output'];
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

export type CreateChannelMutationVariables = Exact<{
  createChannelInput: CreateChannelInput;
}>;


export type CreateChannelMutation = { __typename?: 'Mutation', createChannel: { __typename?: 'CreateChannelResponse', message: ChannelMessage, ytChannelId?: string | null } };

export type DeleteChannelMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeleteChannelMutation = { __typename?: 'Mutation', deleteChannel: { __typename?: 'DeleteChannelResponse', success: boolean, message: string } };

export type GetChannelForPlaylistQueryVariables = Exact<{
  ytChannelId: Scalars['String']['input'];
}>;


export type GetChannelForPlaylistQuery = { __typename?: 'Query', channelForPlaylist: { __typename?: 'ChannelForPlaylistResponse', id: number, title: string } };

export type GetChannelMetadataQueryVariables = Exact<{
  ytChannelId: Scalars['String']['input'];
}>;


export type GetChannelMetadataQuery = { __typename?: 'Query', channelMetadata: { __typename?: 'ChannelMetadataResponse', id: number, title: string, fetchedUntilEnd: boolean, videoCount: number, lastSyncedAt?: string | null, videoArtifactsCount: number, savedArtifactsCount: number, thumbnailArtifactsCount: number, screenshotArtifactsCount: number, storyboardArtifactsCount: number, playlist?: { __typename?: 'PlaylistInfo', id: number, name: string } | null } };

export type GetChannelScreenshotsQueryVariables = Exact<{
  input: GetScreenshotsInput;
}>;


export type GetChannelScreenshotsQuery = { __typename?: 'Query', channelScreenshots: Array<{ __typename?: 'GetScreenshotsResponse', ytVideoId: string, id: number, second: number, src: string }> };

export type ChannelFragmentFragment = { __typename?: 'PlaylistChannelResponse', id: number, ytId: string };

export type CreatePlaylistMutationVariables = Exact<{
  createPlaylistInput: CreatePlaylistInput;
}>;


export type CreatePlaylistMutation = { __typename?: 'Mutation', createPlaylist: { __typename?: 'CreatePlaylistResponse', id: number, name: string, createdAt: string, updatedAt: string } };

export type GetPlaylistsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlaylistsQuery = { __typename?: 'Query', playlists: Array<{ __typename?: 'PlaylistResponse', id: number, name: string, createdAt: string, updatedAt: string, channels: Array<{ __typename?: 'PlaylistChannelResponse', title: string, id: number, ytId: string }> }> };

export type GetPlaylistDetailsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetPlaylistDetailsQuery = { __typename?: 'Query', playlistDetails?: { __typename?: 'PlaylistDetailsResponse', id: number, name: string, createdAt: string, updatedAt: string, channels: Array<{ __typename?: 'PlaylistChannelWithCountsResponse', id: number, title: string, ytId: string, src: string, videoCount: number, savedCount: number, screenshotCount: number, thumbnailCount: number }> } | null };

export type UpdatePlaylistMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  updatePlaylistInput: UpdatePlaylistInput;
}>;


export type UpdatePlaylistMutation = { __typename?: 'Mutation', updatePlaylist: { __typename?: 'UpdatePlaylistResponse', id: number, name: string, createdAt: string, updatedAt: string } };

export type DeletePlaylistMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeletePlaylistMutation = { __typename?: 'Mutation', deletePlaylist: { __typename?: 'DeletePlaylistResponse', success: boolean } };

export type UpdateChannelPlaylistMutationVariables = Exact<{
  updateChannelPlaylistInput: UpdateChannelPlaylistInput;
}>;


export type UpdateChannelPlaylistMutation = { __typename?: 'Mutation', updateChannelPlaylist: { __typename?: 'UpdateChannelPlaylistResponse', id: number, title: string, ytId: string, src: string, videoCount: number, playlistId?: number | null } };

export type GetPlaylistUploadsListQueryVariables = Exact<{
  playlistUploadsListInput: PlaylistUploadsListInput;
}>;


export type GetPlaylistUploadsListQuery = { __typename?: 'Query', playlistUploadsList: { __typename?: 'PlaylistUploadsListResponse', uploads: Array<{ __typename?: 'PlaylistUploadsListUploadResponse', id: number, ytId: string, title: string, publishedAt: string, channelTitle: string, ytChannelId: string, src: string }> } };

export type GetScreenshotsQueryVariables = Exact<{
  input: GetScreenshotsInput;
}>;


export type GetScreenshotsQuery = { __typename?: 'Query', getScreenshots: Array<{ __typename?: 'GetScreenshotsResponse', ytVideoId: string, id: number, second: number, src: string }> };

export type FetchDashboardQueryVariables = Exact<{
  fetchDashboardInput: FetchDashboardInput;
}>;


export type FetchDashboardQuery = { __typename?: 'Query', fetchDashboard: { __typename?: 'ChannelsDashboardResponse', total: number, channels: Array<{ __typename?: 'DashboardChannelResponse', id: number, createdAt: any, title: string, ytId: string, src: string, lastSyncedAt?: any | null, videoCount: number, thumbnails: number, saved: number, defaults: number, storyboard: number, screenshotsCount: number, playlist?: { __typename?: 'DashboardPlaylistResponse', id: number, name: string } | null, featuredScreenshots: Array<{ __typename?: 'FeaturedScreenshotResponse', src: string, id: number, second: number, ytVideoId: string }> }> } };

export type FetchVideosDashboardQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
  screenshotMin?: InputMaybe<Scalars['Float']['input']>;
  screenshotMax?: InputMaybe<Scalars['Float']['input']>;
}>;


export type FetchVideosDashboardQuery = { __typename?: 'Query', fetchVideosDashboard: { __typename?: 'VideosDashboardResponse', total: number, videos: Array<{ __typename?: 'DashboardVideoResponse', id: number, ytId: string, title: string, src: string, channelId: number, channelTitle: string, channelYtId: string, screenshotCount: number, featuredScreenshots: Array<{ __typename?: 'FeaturedScreenshotResponse', src: string, id: number, second: number, ytVideoId: string }> }> } };

export type SearchVideosQueryVariables = Exact<{
  searchInput: SearchInput;
}>;


export type SearchVideosQuery = { __typename?: 'Query', searchVideos: Array<{ __typename?: 'SearchVideoResult', title: string, ytId: string, src: string, channelYtId: string, type: string }> };

export type SearchChannelsQueryVariables = Exact<{
  searchInput: SearchInput;
}>;


export type SearchChannelsQuery = { __typename?: 'Query', searchChannels: Array<{ __typename?: 'SearchChannelResult', title: string, ytId: string, src: string, type: string }> };

export type GetStatisticsCountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStatisticsCountsQuery = { __typename?: 'Query', statisticsCounts: { __typename?: 'StatisticsCountsResponse', totalScreenshots: number, totalThumbnails: number, totalSaved: number } };

export type StoryboardsQueryVariables = Exact<{
  ytChannelId: Scalars['String']['input'];
}>;


export type StoryboardsQuery = { __typename?: 'Query', storyboards: Array<{ __typename?: 'UploadsVideoStoryboardResponse', id: number, ytId: string, title: string, src: string, publishedAt: string, createdAt: string, updatedAt: string, channelId: number, nextPageToken?: string | null, duration?: number | null, artifact: string, storyboard: { __typename?: 'StoryboardDataResponse', id: number, uploadsVideoId: number, fragments: number, url: string, createdAt: string, updatedAt: string } }> };

export type GetThumbnailByVideoIdQueryVariables = Exact<{
  ytVideoId: Scalars['String']['input'];
}>;


export type GetThumbnailByVideoIdQuery = { __typename?: 'Query', thumbnailByVideoId?: { __typename?: 'ThumbnailByVideoIdResponse', createdAt: string, id: number, perRow: number, updatedAt: string, uploadsVideoId: number, totalSeconds: number, thumbnailsCount: number, uploadsVideo: { __typename?: 'UploadsVideoResponse', ytId: string, channel: { __typename?: 'ChannelResponse', id: number, ytId: string, title: string } } } | null };

export type SaveUploadMutationVariables = Exact<{
  saveUploadInput: SaveUploadInput;
}>;


export type SaveUploadMutation = { __typename?: 'Mutation', saveUpload: { __typename?: 'SaveUploadResponse', success: boolean, message: string } };

export type FetchUploadsMutationVariables = Exact<{
  fetchUploadsInput: FetchUploadsInput;
}>;


export type FetchUploadsMutation = { __typename?: 'Mutation', fetchUploads: { __typename?: 'FetchUploadsResponse', success: boolean, message: string, uploadIds?: Array<string> | null } };

export type UploadsWithStoryboardsQueryVariables = Exact<{
  input: StoryboardQueryInput;
}>;


export type UploadsWithStoryboardsQuery = { __typename?: 'Query', uploadsWithStoryboards: Array<{ __typename?: 'UploadWithStoryboardResponse', id: number, ytId: string, title: string, src: string, publishedAt: string, createdAt: string, updatedAt: string, channelId: number, nextPageToken?: string | null, duration?: number | null, artifact: string, storyboard: { __typename?: 'StoryboardFragmentResponse', id: number, uploadsVideoId: number, fragments: number, url: string, createdAt: string, updatedAt: string } }> };

export type SyncUploadsMutationVariables = Exact<{
  syncUploadsInput: SyncUploadsInput;
}>;


export type SyncUploadsMutation = { __typename?: 'Mutation', syncUploads: { __typename?: 'SyncUploadsResponse', count: number } };

export type CleanShortUploadsMutationVariables = Exact<{
  cleanShortUploadsInput: CleanShortUploadsInput;
}>;


export type CleanShortUploadsMutation = { __typename?: 'Mutation', cleanShortUploads: { __typename?: 'CleanShortUploadsResponse', deletedCount: number } };

export type UploadsListQueryVariables = Exact<{
  uploadsListInput: UploadsListInput;
}>;


export type UploadsListQuery = { __typename?: 'Query', uploadsList: { __typename?: 'UploadsListResponse', id: number, createdAt: string, updatedAt: string, title: string, ytId: string, src: string, videoCount: number, fetchStartVideoId: string, fetchedUntilEnd: boolean, lastSyncedAt?: string | null, uploads: Array<{ __typename?: 'UploadsListUploadResponse', artifact: string, channelId: number, createdAt: string, duration?: number | null, id: number, nextPageToken?: string | null, publishedAt: string, src: string, title: string, updatedAt: string, ytId: string }> } };

export type UploadsWithThumbnailsQueryVariables = Exact<{
  input: UploadsWithThumbnailsInput;
}>;


export type UploadsWithThumbnailsQuery = { __typename?: 'Query', uploadsWithThumbnails: Array<{ __typename?: 'UploadsWithThumbnailsResponse', ytChannelId: string, ytVideoId: string, channelTitle: string }> };

export type DeleteUploadsMutationVariables = Exact<{
  ytChannelId: Scalars['String']['input'];
  ytVideoIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type DeleteUploadsMutation = { __typename?: 'Mutation', deleteUploads: { __typename?: 'DeleteUploadsResponse', success: boolean } };

export type FinishProcessingUploadMutationVariables = Exact<{
  ytChannelId: Scalars['String']['input'];
  ytVideoId: Scalars['String']['input'];
  savedSeconds: Array<Scalars['Float']['input']> | Scalars['Float']['input'];
}>;


export type FinishProcessingUploadMutation = { __typename?: 'Mutation', finishProcessingUpload: { __typename?: 'FinishProcessUploadResponse', id: number, ytId: string, artifact: string } };

export const ChannelFragmentFragmentDoc = gql`
    fragment ChannelFragment on PlaylistChannelResponse {
  id
  ytId
}
    `;
export const CreateChannelDocument = gql`
    mutation CreateChannel($createChannelInput: CreateChannelInput!) {
  createChannel(createChannelInput: $createChannelInput) {
    message
    ytChannelId
  }
}
    `;
export type CreateChannelMutationFn = Apollo.MutationFunction<CreateChannelMutation, CreateChannelMutationVariables>;

/**
 * __useCreateChannelMutation__
 *
 * To run a mutation, you first call `useCreateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMutation, { data, loading, error }] = useCreateChannelMutation({
 *   variables: {
 *      createChannelInput: // value for 'createChannelInput'
 *   },
 * });
 */
export function useCreateChannelMutation(baseOptions?: Apollo.MutationHookOptions<CreateChannelMutation, CreateChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CreateChannelDocument, options);
      }
export type CreateChannelMutationHookResult = ReturnType<typeof useCreateChannelMutation>;
export type CreateChannelMutationResult = Apollo.MutationResult<CreateChannelMutation>;
export type CreateChannelMutationOptions = Apollo.BaseMutationOptions<CreateChannelMutation, CreateChannelMutationVariables>;
export const DeleteChannelDocument = gql`
    mutation DeleteChannel($id: Float!) {
  deleteChannel(id: $id) {
    success
    message
  }
}
    `;
export type DeleteChannelMutationFn = Apollo.MutationFunction<DeleteChannelMutation, DeleteChannelMutationVariables>;

/**
 * __useDeleteChannelMutation__
 *
 * To run a mutation, you first call `useDeleteChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChannelMutation, { data, loading, error }] = useDeleteChannelMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteChannelMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChannelMutation, DeleteChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteChannelMutation, DeleteChannelMutationVariables>(DeleteChannelDocument, options);
      }
export type DeleteChannelMutationHookResult = ReturnType<typeof useDeleteChannelMutation>;
export type DeleteChannelMutationResult = Apollo.MutationResult<DeleteChannelMutation>;
export type DeleteChannelMutationOptions = Apollo.BaseMutationOptions<DeleteChannelMutation, DeleteChannelMutationVariables>;
export const GetChannelForPlaylistDocument = gql`
    query GetChannelForPlaylist($ytChannelId: String!) {
  channelForPlaylist(ytChannelId: $ytChannelId) {
    id
    title
  }
}
    `;

/**
 * __useGetChannelForPlaylistQuery__
 *
 * To run a query within a React component, call `useGetChannelForPlaylistQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelForPlaylistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelForPlaylistQuery({
 *   variables: {
 *      ytChannelId: // value for 'ytChannelId'
 *   },
 * });
 */
export function useGetChannelForPlaylistQuery(baseOptions: Apollo.QueryHookOptions<GetChannelForPlaylistQuery, GetChannelForPlaylistQueryVariables> & ({ variables: GetChannelForPlaylistQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChannelForPlaylistQuery, GetChannelForPlaylistQueryVariables>(GetChannelForPlaylistDocument, options);
      }
export function useGetChannelForPlaylistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelForPlaylistQuery, GetChannelForPlaylistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChannelForPlaylistQuery, GetChannelForPlaylistQueryVariables>(GetChannelForPlaylistDocument, options);
        }
export function useGetChannelForPlaylistSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChannelForPlaylistQuery, GetChannelForPlaylistQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChannelForPlaylistQuery, GetChannelForPlaylistQueryVariables>(GetChannelForPlaylistDocument, options);
        }
export type GetChannelForPlaylistQueryHookResult = ReturnType<typeof useGetChannelForPlaylistQuery>;
export type GetChannelForPlaylistLazyQueryHookResult = ReturnType<typeof useGetChannelForPlaylistLazyQuery>;
export type GetChannelForPlaylistSuspenseQueryHookResult = ReturnType<typeof useGetChannelForPlaylistSuspenseQuery>;
export type GetChannelForPlaylistQueryResult = Apollo.QueryResult<GetChannelForPlaylistQuery, GetChannelForPlaylistQueryVariables>;
export const GetChannelMetadataDocument = gql`
    query GetChannelMetadata($ytChannelId: String!) {
  channelMetadata(ytChannelId: $ytChannelId) {
    id
    title
    fetchedUntilEnd
    videoCount
    lastSyncedAt
    playlist {
      id
      name
    }
    videoArtifactsCount
    savedArtifactsCount
    thumbnailArtifactsCount
    screenshotArtifactsCount
    storyboardArtifactsCount
  }
}
    `;

/**
 * __useGetChannelMetadataQuery__
 *
 * To run a query within a React component, call `useGetChannelMetadataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelMetadataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelMetadataQuery({
 *   variables: {
 *      ytChannelId: // value for 'ytChannelId'
 *   },
 * });
 */
export function useGetChannelMetadataQuery(baseOptions: Apollo.QueryHookOptions<GetChannelMetadataQuery, GetChannelMetadataQueryVariables> & ({ variables: GetChannelMetadataQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChannelMetadataQuery, GetChannelMetadataQueryVariables>(GetChannelMetadataDocument, options);
      }
export function useGetChannelMetadataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelMetadataQuery, GetChannelMetadataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChannelMetadataQuery, GetChannelMetadataQueryVariables>(GetChannelMetadataDocument, options);
        }
export function useGetChannelMetadataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChannelMetadataQuery, GetChannelMetadataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChannelMetadataQuery, GetChannelMetadataQueryVariables>(GetChannelMetadataDocument, options);
        }
export type GetChannelMetadataQueryHookResult = ReturnType<typeof useGetChannelMetadataQuery>;
export type GetChannelMetadataLazyQueryHookResult = ReturnType<typeof useGetChannelMetadataLazyQuery>;
export type GetChannelMetadataSuspenseQueryHookResult = ReturnType<typeof useGetChannelMetadataSuspenseQuery>;
export type GetChannelMetadataQueryResult = Apollo.QueryResult<GetChannelMetadataQuery, GetChannelMetadataQueryVariables>;
export const GetChannelScreenshotsDocument = gql`
    query GetChannelScreenshots($input: GetScreenshotsInput!) {
  channelScreenshots(input: $input) {
    ytVideoId
    id
    second
    src
  }
}
    `;

/**
 * __useGetChannelScreenshotsQuery__
 *
 * To run a query within a React component, call `useGetChannelScreenshotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelScreenshotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelScreenshotsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetChannelScreenshotsQuery(baseOptions: Apollo.QueryHookOptions<GetChannelScreenshotsQuery, GetChannelScreenshotsQueryVariables> & ({ variables: GetChannelScreenshotsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChannelScreenshotsQuery, GetChannelScreenshotsQueryVariables>(GetChannelScreenshotsDocument, options);
      }
export function useGetChannelScreenshotsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelScreenshotsQuery, GetChannelScreenshotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChannelScreenshotsQuery, GetChannelScreenshotsQueryVariables>(GetChannelScreenshotsDocument, options);
        }
export function useGetChannelScreenshotsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChannelScreenshotsQuery, GetChannelScreenshotsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChannelScreenshotsQuery, GetChannelScreenshotsQueryVariables>(GetChannelScreenshotsDocument, options);
        }
export type GetChannelScreenshotsQueryHookResult = ReturnType<typeof useGetChannelScreenshotsQuery>;
export type GetChannelScreenshotsLazyQueryHookResult = ReturnType<typeof useGetChannelScreenshotsLazyQuery>;
export type GetChannelScreenshotsSuspenseQueryHookResult = ReturnType<typeof useGetChannelScreenshotsSuspenseQuery>;
export type GetChannelScreenshotsQueryResult = Apollo.QueryResult<GetChannelScreenshotsQuery, GetChannelScreenshotsQueryVariables>;
export const CreatePlaylistDocument = gql`
    mutation CreatePlaylist($createPlaylistInput: CreatePlaylistInput!) {
  createPlaylist(createPlaylistInput: $createPlaylistInput) {
    id
    name
    createdAt
    updatedAt
  }
}
    `;
export type CreatePlaylistMutationFn = Apollo.MutationFunction<CreatePlaylistMutation, CreatePlaylistMutationVariables>;

/**
 * __useCreatePlaylistMutation__
 *
 * To run a mutation, you first call `useCreatePlaylistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlaylistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlaylistMutation, { data, loading, error }] = useCreatePlaylistMutation({
 *   variables: {
 *      createPlaylistInput: // value for 'createPlaylistInput'
 *   },
 * });
 */
export function useCreatePlaylistMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlaylistMutation, CreatePlaylistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlaylistMutation, CreatePlaylistMutationVariables>(CreatePlaylistDocument, options);
      }
export type CreatePlaylistMutationHookResult = ReturnType<typeof useCreatePlaylistMutation>;
export type CreatePlaylistMutationResult = Apollo.MutationResult<CreatePlaylistMutation>;
export type CreatePlaylistMutationOptions = Apollo.BaseMutationOptions<CreatePlaylistMutation, CreatePlaylistMutationVariables>;
export const GetPlaylistsDocument = gql`
    query GetPlaylists {
  playlists {
    id
    name
    createdAt
    updatedAt
    channels {
      ...ChannelFragment
      title
    }
  }
}
    ${ChannelFragmentFragmentDoc}`;

/**
 * __useGetPlaylistsQuery__
 *
 * To run a query within a React component, call `useGetPlaylistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlaylistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlaylistsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPlaylistsQuery(baseOptions?: Apollo.QueryHookOptions<GetPlaylistsQuery, GetPlaylistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlaylistsQuery, GetPlaylistsQueryVariables>(GetPlaylistsDocument, options);
      }
export function useGetPlaylistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlaylistsQuery, GetPlaylistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlaylistsQuery, GetPlaylistsQueryVariables>(GetPlaylistsDocument, options);
        }
export function useGetPlaylistsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPlaylistsQuery, GetPlaylistsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlaylistsQuery, GetPlaylistsQueryVariables>(GetPlaylistsDocument, options);
        }
export type GetPlaylistsQueryHookResult = ReturnType<typeof useGetPlaylistsQuery>;
export type GetPlaylistsLazyQueryHookResult = ReturnType<typeof useGetPlaylistsLazyQuery>;
export type GetPlaylistsSuspenseQueryHookResult = ReturnType<typeof useGetPlaylistsSuspenseQuery>;
export type GetPlaylistsQueryResult = Apollo.QueryResult<GetPlaylistsQuery, GetPlaylistsQueryVariables>;
export const GetPlaylistDetailsDocument = gql`
    query GetPlaylistDetails($id: Int!) {
  playlistDetails(id: $id) {
    id
    name
    createdAt
    updatedAt
    channels {
      id
      title
      ytId
      src
      videoCount
      savedCount
      screenshotCount
      thumbnailCount
    }
  }
}
    `;

/**
 * __useGetPlaylistDetailsQuery__
 *
 * To run a query within a React component, call `useGetPlaylistDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlaylistDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlaylistDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPlaylistDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetPlaylistDetailsQuery, GetPlaylistDetailsQueryVariables> & ({ variables: GetPlaylistDetailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlaylistDetailsQuery, GetPlaylistDetailsQueryVariables>(GetPlaylistDetailsDocument, options);
      }
export function useGetPlaylistDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlaylistDetailsQuery, GetPlaylistDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlaylistDetailsQuery, GetPlaylistDetailsQueryVariables>(GetPlaylistDetailsDocument, options);
        }
export function useGetPlaylistDetailsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPlaylistDetailsQuery, GetPlaylistDetailsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlaylistDetailsQuery, GetPlaylistDetailsQueryVariables>(GetPlaylistDetailsDocument, options);
        }
export type GetPlaylistDetailsQueryHookResult = ReturnType<typeof useGetPlaylistDetailsQuery>;
export type GetPlaylistDetailsLazyQueryHookResult = ReturnType<typeof useGetPlaylistDetailsLazyQuery>;
export type GetPlaylistDetailsSuspenseQueryHookResult = ReturnType<typeof useGetPlaylistDetailsSuspenseQuery>;
export type GetPlaylistDetailsQueryResult = Apollo.QueryResult<GetPlaylistDetailsQuery, GetPlaylistDetailsQueryVariables>;
export const UpdatePlaylistDocument = gql`
    mutation UpdatePlaylist($id: Int!, $updatePlaylistInput: UpdatePlaylistInput!) {
  updatePlaylist(id: $id, updatePlaylistInput: $updatePlaylistInput) {
    id
    name
    createdAt
    updatedAt
  }
}
    `;
export type UpdatePlaylistMutationFn = Apollo.MutationFunction<UpdatePlaylistMutation, UpdatePlaylistMutationVariables>;

/**
 * __useUpdatePlaylistMutation__
 *
 * To run a mutation, you first call `useUpdatePlaylistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlaylistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlaylistMutation, { data, loading, error }] = useUpdatePlaylistMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updatePlaylistInput: // value for 'updatePlaylistInput'
 *   },
 * });
 */
export function useUpdatePlaylistMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlaylistMutation, UpdatePlaylistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePlaylistMutation, UpdatePlaylistMutationVariables>(UpdatePlaylistDocument, options);
      }
export type UpdatePlaylistMutationHookResult = ReturnType<typeof useUpdatePlaylistMutation>;
export type UpdatePlaylistMutationResult = Apollo.MutationResult<UpdatePlaylistMutation>;
export type UpdatePlaylistMutationOptions = Apollo.BaseMutationOptions<UpdatePlaylistMutation, UpdatePlaylistMutationVariables>;
export const DeletePlaylistDocument = gql`
    mutation DeletePlaylist($id: Int!) {
  deletePlaylist(id: $id) {
    success
  }
}
    `;
export type DeletePlaylistMutationFn = Apollo.MutationFunction<DeletePlaylistMutation, DeletePlaylistMutationVariables>;

/**
 * __useDeletePlaylistMutation__
 *
 * To run a mutation, you first call `useDeletePlaylistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePlaylistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlaylistMutation, { data, loading, error }] = useDeletePlaylistMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePlaylistMutation(baseOptions?: Apollo.MutationHookOptions<DeletePlaylistMutation, DeletePlaylistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePlaylistMutation, DeletePlaylistMutationVariables>(DeletePlaylistDocument, options);
      }
export type DeletePlaylistMutationHookResult = ReturnType<typeof useDeletePlaylistMutation>;
export type DeletePlaylistMutationResult = Apollo.MutationResult<DeletePlaylistMutation>;
export type DeletePlaylistMutationOptions = Apollo.BaseMutationOptions<DeletePlaylistMutation, DeletePlaylistMutationVariables>;
export const UpdateChannelPlaylistDocument = gql`
    mutation UpdateChannelPlaylist($updateChannelPlaylistInput: UpdateChannelPlaylistInput!) {
  updateChannelPlaylist(updateChannelPlaylistInput: $updateChannelPlaylistInput) {
    id
    title
    ytId
    src
    videoCount
    playlistId
  }
}
    `;
export type UpdateChannelPlaylistMutationFn = Apollo.MutationFunction<UpdateChannelPlaylistMutation, UpdateChannelPlaylistMutationVariables>;

/**
 * __useUpdateChannelPlaylistMutation__
 *
 * To run a mutation, you first call `useUpdateChannelPlaylistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChannelPlaylistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChannelPlaylistMutation, { data, loading, error }] = useUpdateChannelPlaylistMutation({
 *   variables: {
 *      updateChannelPlaylistInput: // value for 'updateChannelPlaylistInput'
 *   },
 * });
 */
export function useUpdateChannelPlaylistMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChannelPlaylistMutation, UpdateChannelPlaylistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChannelPlaylistMutation, UpdateChannelPlaylistMutationVariables>(UpdateChannelPlaylistDocument, options);
      }
export type UpdateChannelPlaylistMutationHookResult = ReturnType<typeof useUpdateChannelPlaylistMutation>;
export type UpdateChannelPlaylistMutationResult = Apollo.MutationResult<UpdateChannelPlaylistMutation>;
export type UpdateChannelPlaylistMutationOptions = Apollo.BaseMutationOptions<UpdateChannelPlaylistMutation, UpdateChannelPlaylistMutationVariables>;
export const GetPlaylistUploadsListDocument = gql`
    query GetPlaylistUploadsList($playlistUploadsListInput: PlaylistUploadsListInput!) {
  playlistUploadsList(playlistUploadsListInput: $playlistUploadsListInput) {
    uploads {
      id
      ytId
      title
      publishedAt
      channelTitle
      ytChannelId
      src
    }
  }
}
    `;

/**
 * __useGetPlaylistUploadsListQuery__
 *
 * To run a query within a React component, call `useGetPlaylistUploadsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlaylistUploadsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlaylistUploadsListQuery({
 *   variables: {
 *      playlistUploadsListInput: // value for 'playlistUploadsListInput'
 *   },
 * });
 */
export function useGetPlaylistUploadsListQuery(baseOptions: Apollo.QueryHookOptions<GetPlaylistUploadsListQuery, GetPlaylistUploadsListQueryVariables> & ({ variables: GetPlaylistUploadsListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlaylistUploadsListQuery, GetPlaylistUploadsListQueryVariables>(GetPlaylistUploadsListDocument, options);
      }
export function useGetPlaylistUploadsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlaylistUploadsListQuery, GetPlaylistUploadsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlaylistUploadsListQuery, GetPlaylistUploadsListQueryVariables>(GetPlaylistUploadsListDocument, options);
        }
export function useGetPlaylistUploadsListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPlaylistUploadsListQuery, GetPlaylistUploadsListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlaylistUploadsListQuery, GetPlaylistUploadsListQueryVariables>(GetPlaylistUploadsListDocument, options);
        }
export type GetPlaylistUploadsListQueryHookResult = ReturnType<typeof useGetPlaylistUploadsListQuery>;
export type GetPlaylistUploadsListLazyQueryHookResult = ReturnType<typeof useGetPlaylistUploadsListLazyQuery>;
export type GetPlaylistUploadsListSuspenseQueryHookResult = ReturnType<typeof useGetPlaylistUploadsListSuspenseQuery>;
export type GetPlaylistUploadsListQueryResult = Apollo.QueryResult<GetPlaylistUploadsListQuery, GetPlaylistUploadsListQueryVariables>;
export const GetScreenshotsDocument = gql`
    query GetScreenshots($input: GetScreenshotsInput!) {
  getScreenshots(input: $input) {
    ytVideoId
    id
    second
    src
  }
}
    `;

/**
 * __useGetScreenshotsQuery__
 *
 * To run a query within a React component, call `useGetScreenshotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScreenshotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScreenshotsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetScreenshotsQuery(baseOptions: Apollo.QueryHookOptions<GetScreenshotsQuery, GetScreenshotsQueryVariables> & ({ variables: GetScreenshotsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetScreenshotsQuery, GetScreenshotsQueryVariables>(GetScreenshotsDocument, options);
      }
export function useGetScreenshotsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetScreenshotsQuery, GetScreenshotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetScreenshotsQuery, GetScreenshotsQueryVariables>(GetScreenshotsDocument, options);
        }
export function useGetScreenshotsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetScreenshotsQuery, GetScreenshotsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetScreenshotsQuery, GetScreenshotsQueryVariables>(GetScreenshotsDocument, options);
        }
export type GetScreenshotsQueryHookResult = ReturnType<typeof useGetScreenshotsQuery>;
export type GetScreenshotsLazyQueryHookResult = ReturnType<typeof useGetScreenshotsLazyQuery>;
export type GetScreenshotsSuspenseQueryHookResult = ReturnType<typeof useGetScreenshotsSuspenseQuery>;
export type GetScreenshotsQueryResult = Apollo.QueryResult<GetScreenshotsQuery, GetScreenshotsQueryVariables>;
export const FetchDashboardDocument = gql`
    query FetchDashboard($fetchDashboardInput: FetchDashboardInput!) {
  fetchDashboard(fetchDashboardInput: $fetchDashboardInput) {
    channels {
      id
      createdAt
      title
      ytId
      src
      lastSyncedAt
      videoCount
      thumbnails
      saved
      defaults
      storyboard
      screenshotsCount
      playlist {
        id
        name
      }
      featuredScreenshots {
        src
        id
        second
        ytVideoId
      }
    }
    total
  }
}
    `;

/**
 * __useFetchDashboardQuery__
 *
 * To run a query within a React component, call `useFetchDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchDashboardQuery({
 *   variables: {
 *      fetchDashboardInput: // value for 'fetchDashboardInput'
 *   },
 * });
 */
export function useFetchDashboardQuery(baseOptions: Apollo.QueryHookOptions<FetchDashboardQuery, FetchDashboardQueryVariables> & ({ variables: FetchDashboardQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchDashboardQuery, FetchDashboardQueryVariables>(FetchDashboardDocument, options);
      }
export function useFetchDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchDashboardQuery, FetchDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchDashboardQuery, FetchDashboardQueryVariables>(FetchDashboardDocument, options);
        }
export function useFetchDashboardSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FetchDashboardQuery, FetchDashboardQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FetchDashboardQuery, FetchDashboardQueryVariables>(FetchDashboardDocument, options);
        }
export type FetchDashboardQueryHookResult = ReturnType<typeof useFetchDashboardQuery>;
export type FetchDashboardLazyQueryHookResult = ReturnType<typeof useFetchDashboardLazyQuery>;
export type FetchDashboardSuspenseQueryHookResult = ReturnType<typeof useFetchDashboardSuspenseQuery>;
export type FetchDashboardQueryResult = Apollo.QueryResult<FetchDashboardQuery, FetchDashboardQueryVariables>;
export const FetchVideosDashboardDocument = gql`
    query FetchVideosDashboard($page: Float, $sortOrder: String, $screenshotMin: Float, $screenshotMax: Float) {
  fetchVideosDashboard(
    page: $page
    sortOrder: $sortOrder
    screenshotMin: $screenshotMin
    screenshotMax: $screenshotMax
  ) {
    videos {
      id
      ytId
      title
      src
      channelId
      channelTitle
      channelYtId
      screenshotCount
      featuredScreenshots {
        src
        id
        second
        ytVideoId
      }
    }
    total
  }
}
    `;

/**
 * __useFetchVideosDashboardQuery__
 *
 * To run a query within a React component, call `useFetchVideosDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchVideosDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchVideosDashboardQuery({
 *   variables: {
 *      page: // value for 'page'
 *      sortOrder: // value for 'sortOrder'
 *      screenshotMin: // value for 'screenshotMin'
 *      screenshotMax: // value for 'screenshotMax'
 *   },
 * });
 */
export function useFetchVideosDashboardQuery(baseOptions?: Apollo.QueryHookOptions<FetchVideosDashboardQuery, FetchVideosDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchVideosDashboardQuery, FetchVideosDashboardQueryVariables>(FetchVideosDashboardDocument, options);
      }
export function useFetchVideosDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchVideosDashboardQuery, FetchVideosDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchVideosDashboardQuery, FetchVideosDashboardQueryVariables>(FetchVideosDashboardDocument, options);
        }
export function useFetchVideosDashboardSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FetchVideosDashboardQuery, FetchVideosDashboardQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FetchVideosDashboardQuery, FetchVideosDashboardQueryVariables>(FetchVideosDashboardDocument, options);
        }
export type FetchVideosDashboardQueryHookResult = ReturnType<typeof useFetchVideosDashboardQuery>;
export type FetchVideosDashboardLazyQueryHookResult = ReturnType<typeof useFetchVideosDashboardLazyQuery>;
export type FetchVideosDashboardSuspenseQueryHookResult = ReturnType<typeof useFetchVideosDashboardSuspenseQuery>;
export type FetchVideosDashboardQueryResult = Apollo.QueryResult<FetchVideosDashboardQuery, FetchVideosDashboardQueryVariables>;
export const SearchVideosDocument = gql`
    query SearchVideos($searchInput: SearchInput!) {
  searchVideos(searchInput: $searchInput) {
    title
    ytId
    src
    channelYtId
    type
  }
}
    `;

/**
 * __useSearchVideosQuery__
 *
 * To run a query within a React component, call `useSearchVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchVideosQuery({
 *   variables: {
 *      searchInput: // value for 'searchInput'
 *   },
 * });
 */
export function useSearchVideosQuery(baseOptions: Apollo.QueryHookOptions<SearchVideosQuery, SearchVideosQueryVariables> & ({ variables: SearchVideosQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchVideosQuery, SearchVideosQueryVariables>(SearchVideosDocument, options);
      }
export function useSearchVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchVideosQuery, SearchVideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchVideosQuery, SearchVideosQueryVariables>(SearchVideosDocument, options);
        }
export function useSearchVideosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchVideosQuery, SearchVideosQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchVideosQuery, SearchVideosQueryVariables>(SearchVideosDocument, options);
        }
export type SearchVideosQueryHookResult = ReturnType<typeof useSearchVideosQuery>;
export type SearchVideosLazyQueryHookResult = ReturnType<typeof useSearchVideosLazyQuery>;
export type SearchVideosSuspenseQueryHookResult = ReturnType<typeof useSearchVideosSuspenseQuery>;
export type SearchVideosQueryResult = Apollo.QueryResult<SearchVideosQuery, SearchVideosQueryVariables>;
export const SearchChannelsDocument = gql`
    query SearchChannels($searchInput: SearchInput!) {
  searchChannels(searchInput: $searchInput) {
    title
    ytId
    src
    type
  }
}
    `;

/**
 * __useSearchChannelsQuery__
 *
 * To run a query within a React component, call `useSearchChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchChannelsQuery({
 *   variables: {
 *      searchInput: // value for 'searchInput'
 *   },
 * });
 */
export function useSearchChannelsQuery(baseOptions: Apollo.QueryHookOptions<SearchChannelsQuery, SearchChannelsQueryVariables> & ({ variables: SearchChannelsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchChannelsQuery, SearchChannelsQueryVariables>(SearchChannelsDocument, options);
      }
export function useSearchChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchChannelsQuery, SearchChannelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchChannelsQuery, SearchChannelsQueryVariables>(SearchChannelsDocument, options);
        }
export function useSearchChannelsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchChannelsQuery, SearchChannelsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchChannelsQuery, SearchChannelsQueryVariables>(SearchChannelsDocument, options);
        }
export type SearchChannelsQueryHookResult = ReturnType<typeof useSearchChannelsQuery>;
export type SearchChannelsLazyQueryHookResult = ReturnType<typeof useSearchChannelsLazyQuery>;
export type SearchChannelsSuspenseQueryHookResult = ReturnType<typeof useSearchChannelsSuspenseQuery>;
export type SearchChannelsQueryResult = Apollo.QueryResult<SearchChannelsQuery, SearchChannelsQueryVariables>;
export const GetStatisticsCountsDocument = gql`
    query GetStatisticsCounts {
  statisticsCounts {
    totalScreenshots
    totalThumbnails
    totalSaved
  }
}
    `;

/**
 * __useGetStatisticsCountsQuery__
 *
 * To run a query within a React component, call `useGetStatisticsCountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatisticsCountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatisticsCountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStatisticsCountsQuery(baseOptions?: Apollo.QueryHookOptions<GetStatisticsCountsQuery, GetStatisticsCountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStatisticsCountsQuery, GetStatisticsCountsQueryVariables>(GetStatisticsCountsDocument, options);
      }
export function useGetStatisticsCountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatisticsCountsQuery, GetStatisticsCountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStatisticsCountsQuery, GetStatisticsCountsQueryVariables>(GetStatisticsCountsDocument, options);
        }
export function useGetStatisticsCountsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetStatisticsCountsQuery, GetStatisticsCountsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetStatisticsCountsQuery, GetStatisticsCountsQueryVariables>(GetStatisticsCountsDocument, options);
        }
export type GetStatisticsCountsQueryHookResult = ReturnType<typeof useGetStatisticsCountsQuery>;
export type GetStatisticsCountsLazyQueryHookResult = ReturnType<typeof useGetStatisticsCountsLazyQuery>;
export type GetStatisticsCountsSuspenseQueryHookResult = ReturnType<typeof useGetStatisticsCountsSuspenseQuery>;
export type GetStatisticsCountsQueryResult = Apollo.QueryResult<GetStatisticsCountsQuery, GetStatisticsCountsQueryVariables>;
export const StoryboardsDocument = gql`
    query Storyboards($ytChannelId: String!) {
  storyboards(ytChannelId: $ytChannelId) {
    id
    ytId
    title
    src
    publishedAt
    createdAt
    updatedAt
    channelId
    nextPageToken
    duration
    artifact
    storyboard {
      id
      uploadsVideoId
      fragments
      url
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useStoryboardsQuery__
 *
 * To run a query within a React component, call `useStoryboardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoryboardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStoryboardsQuery({
 *   variables: {
 *      ytChannelId: // value for 'ytChannelId'
 *   },
 * });
 */
export function useStoryboardsQuery(baseOptions: Apollo.QueryHookOptions<StoryboardsQuery, StoryboardsQueryVariables> & ({ variables: StoryboardsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoryboardsQuery, StoryboardsQueryVariables>(StoryboardsDocument, options);
      }
export function useStoryboardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoryboardsQuery, StoryboardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoryboardsQuery, StoryboardsQueryVariables>(StoryboardsDocument, options);
        }
export function useStoryboardsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StoryboardsQuery, StoryboardsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StoryboardsQuery, StoryboardsQueryVariables>(StoryboardsDocument, options);
        }
export type StoryboardsQueryHookResult = ReturnType<typeof useStoryboardsQuery>;
export type StoryboardsLazyQueryHookResult = ReturnType<typeof useStoryboardsLazyQuery>;
export type StoryboardsSuspenseQueryHookResult = ReturnType<typeof useStoryboardsSuspenseQuery>;
export type StoryboardsQueryResult = Apollo.QueryResult<StoryboardsQuery, StoryboardsQueryVariables>;
export const GetThumbnailByVideoIdDocument = gql`
    query GetThumbnailByVideoId($ytVideoId: String!) {
  thumbnailByVideoId(ytVideoId: $ytVideoId) {
    createdAt
    id
    perRow
    updatedAt
    uploadsVideoId
    totalSeconds
    thumbnailsCount
    uploadsVideo {
      ytId
      channel {
        id
        ytId
        title
      }
    }
  }
}
    `;

/**
 * __useGetThumbnailByVideoIdQuery__
 *
 * To run a query within a React component, call `useGetThumbnailByVideoIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThumbnailByVideoIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThumbnailByVideoIdQuery({
 *   variables: {
 *      ytVideoId: // value for 'ytVideoId'
 *   },
 * });
 */
export function useGetThumbnailByVideoIdQuery(baseOptions: Apollo.QueryHookOptions<GetThumbnailByVideoIdQuery, GetThumbnailByVideoIdQueryVariables> & ({ variables: GetThumbnailByVideoIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetThumbnailByVideoIdQuery, GetThumbnailByVideoIdQueryVariables>(GetThumbnailByVideoIdDocument, options);
      }
export function useGetThumbnailByVideoIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetThumbnailByVideoIdQuery, GetThumbnailByVideoIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetThumbnailByVideoIdQuery, GetThumbnailByVideoIdQueryVariables>(GetThumbnailByVideoIdDocument, options);
        }
export function useGetThumbnailByVideoIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetThumbnailByVideoIdQuery, GetThumbnailByVideoIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetThumbnailByVideoIdQuery, GetThumbnailByVideoIdQueryVariables>(GetThumbnailByVideoIdDocument, options);
        }
export type GetThumbnailByVideoIdQueryHookResult = ReturnType<typeof useGetThumbnailByVideoIdQuery>;
export type GetThumbnailByVideoIdLazyQueryHookResult = ReturnType<typeof useGetThumbnailByVideoIdLazyQuery>;
export type GetThumbnailByVideoIdSuspenseQueryHookResult = ReturnType<typeof useGetThumbnailByVideoIdSuspenseQuery>;
export type GetThumbnailByVideoIdQueryResult = Apollo.QueryResult<GetThumbnailByVideoIdQuery, GetThumbnailByVideoIdQueryVariables>;
export const SaveUploadDocument = gql`
    mutation SaveUpload($saveUploadInput: SaveUploadInput!) {
  saveUpload(saveUploadInput: $saveUploadInput) {
    success
    message
  }
}
    `;
export type SaveUploadMutationFn = Apollo.MutationFunction<SaveUploadMutation, SaveUploadMutationVariables>;

/**
 * __useSaveUploadMutation__
 *
 * To run a mutation, you first call `useSaveUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveUploadMutation, { data, loading, error }] = useSaveUploadMutation({
 *   variables: {
 *      saveUploadInput: // value for 'saveUploadInput'
 *   },
 * });
 */
export function useSaveUploadMutation(baseOptions?: Apollo.MutationHookOptions<SaveUploadMutation, SaveUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveUploadMutation, SaveUploadMutationVariables>(SaveUploadDocument, options);
      }
export type SaveUploadMutationHookResult = ReturnType<typeof useSaveUploadMutation>;
export type SaveUploadMutationResult = Apollo.MutationResult<SaveUploadMutation>;
export type SaveUploadMutationOptions = Apollo.BaseMutationOptions<SaveUploadMutation, SaveUploadMutationVariables>;
export const FetchUploadsDocument = gql`
    mutation FetchUploads($fetchUploadsInput: FetchUploadsInput!) {
  fetchUploads(fetchUploadsInput: $fetchUploadsInput) {
    success
    message
    uploadIds
  }
}
    `;
export type FetchUploadsMutationFn = Apollo.MutationFunction<FetchUploadsMutation, FetchUploadsMutationVariables>;

/**
 * __useFetchUploadsMutation__
 *
 * To run a mutation, you first call `useFetchUploadsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFetchUploadsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fetchUploadsMutation, { data, loading, error }] = useFetchUploadsMutation({
 *   variables: {
 *      fetchUploadsInput: // value for 'fetchUploadsInput'
 *   },
 * });
 */
export function useFetchUploadsMutation(baseOptions?: Apollo.MutationHookOptions<FetchUploadsMutation, FetchUploadsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FetchUploadsMutation, FetchUploadsMutationVariables>(FetchUploadsDocument, options);
      }
export type FetchUploadsMutationHookResult = ReturnType<typeof useFetchUploadsMutation>;
export type FetchUploadsMutationResult = Apollo.MutationResult<FetchUploadsMutation>;
export type FetchUploadsMutationOptions = Apollo.BaseMutationOptions<FetchUploadsMutation, FetchUploadsMutationVariables>;
export const UploadsWithStoryboardsDocument = gql`
    query UploadsWithStoryboards($input: StoryboardQueryInput!) {
  uploadsWithStoryboards(input: $input) {
    id
    ytId
    title
    src
    publishedAt
    createdAt
    updatedAt
    channelId
    nextPageToken
    duration
    artifact
    storyboard {
      id
      uploadsVideoId
      fragments
      url
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useUploadsWithStoryboardsQuery__
 *
 * To run a query within a React component, call `useUploadsWithStoryboardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUploadsWithStoryboardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUploadsWithStoryboardsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadsWithStoryboardsQuery(baseOptions: Apollo.QueryHookOptions<UploadsWithStoryboardsQuery, UploadsWithStoryboardsQueryVariables> & ({ variables: UploadsWithStoryboardsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UploadsWithStoryboardsQuery, UploadsWithStoryboardsQueryVariables>(UploadsWithStoryboardsDocument, options);
      }
export function useUploadsWithStoryboardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UploadsWithStoryboardsQuery, UploadsWithStoryboardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UploadsWithStoryboardsQuery, UploadsWithStoryboardsQueryVariables>(UploadsWithStoryboardsDocument, options);
        }
export function useUploadsWithStoryboardsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UploadsWithStoryboardsQuery, UploadsWithStoryboardsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UploadsWithStoryboardsQuery, UploadsWithStoryboardsQueryVariables>(UploadsWithStoryboardsDocument, options);
        }
export type UploadsWithStoryboardsQueryHookResult = ReturnType<typeof useUploadsWithStoryboardsQuery>;
export type UploadsWithStoryboardsLazyQueryHookResult = ReturnType<typeof useUploadsWithStoryboardsLazyQuery>;
export type UploadsWithStoryboardsSuspenseQueryHookResult = ReturnType<typeof useUploadsWithStoryboardsSuspenseQuery>;
export type UploadsWithStoryboardsQueryResult = Apollo.QueryResult<UploadsWithStoryboardsQuery, UploadsWithStoryboardsQueryVariables>;
export const SyncUploadsDocument = gql`
    mutation SyncUploads($syncUploadsInput: SyncUploadsInput!) {
  syncUploads(syncUploadsInput: $syncUploadsInput) {
    count
  }
}
    `;
export type SyncUploadsMutationFn = Apollo.MutationFunction<SyncUploadsMutation, SyncUploadsMutationVariables>;

/**
 * __useSyncUploadsMutation__
 *
 * To run a mutation, you first call `useSyncUploadsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSyncUploadsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [syncUploadsMutation, { data, loading, error }] = useSyncUploadsMutation({
 *   variables: {
 *      syncUploadsInput: // value for 'syncUploadsInput'
 *   },
 * });
 */
export function useSyncUploadsMutation(baseOptions?: Apollo.MutationHookOptions<SyncUploadsMutation, SyncUploadsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SyncUploadsMutation, SyncUploadsMutationVariables>(SyncUploadsDocument, options);
      }
export type SyncUploadsMutationHookResult = ReturnType<typeof useSyncUploadsMutation>;
export type SyncUploadsMutationResult = Apollo.MutationResult<SyncUploadsMutation>;
export type SyncUploadsMutationOptions = Apollo.BaseMutationOptions<SyncUploadsMutation, SyncUploadsMutationVariables>;
export const CleanShortUploadsDocument = gql`
    mutation CleanShortUploads($cleanShortUploadsInput: CleanShortUploadsInput!) {
  cleanShortUploads(cleanShortUploadsInput: $cleanShortUploadsInput) {
    deletedCount
  }
}
    `;
export type CleanShortUploadsMutationFn = Apollo.MutationFunction<CleanShortUploadsMutation, CleanShortUploadsMutationVariables>;

/**
 * __useCleanShortUploadsMutation__
 *
 * To run a mutation, you first call `useCleanShortUploadsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCleanShortUploadsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cleanShortUploadsMutation, { data, loading, error }] = useCleanShortUploadsMutation({
 *   variables: {
 *      cleanShortUploadsInput: // value for 'cleanShortUploadsInput'
 *   },
 * });
 */
export function useCleanShortUploadsMutation(baseOptions?: Apollo.MutationHookOptions<CleanShortUploadsMutation, CleanShortUploadsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CleanShortUploadsMutation, CleanShortUploadsMutationVariables>(CleanShortUploadsDocument, options);
      }
export type CleanShortUploadsMutationHookResult = ReturnType<typeof useCleanShortUploadsMutation>;
export type CleanShortUploadsMutationResult = Apollo.MutationResult<CleanShortUploadsMutation>;
export type CleanShortUploadsMutationOptions = Apollo.BaseMutationOptions<CleanShortUploadsMutation, CleanShortUploadsMutationVariables>;
export const UploadsListDocument = gql`
    query UploadsList($uploadsListInput: UploadsListInput!) {
  uploadsList(uploadsListInput: $uploadsListInput) {
    id
    createdAt
    updatedAt
    title
    ytId
    src
    videoCount
    fetchStartVideoId
    fetchedUntilEnd
    lastSyncedAt
    uploads {
      artifact
      channelId
      createdAt
      duration
      id
      nextPageToken
      publishedAt
      src
      title
      updatedAt
      ytId
    }
  }
}
    `;

/**
 * __useUploadsListQuery__
 *
 * To run a query within a React component, call `useUploadsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUploadsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUploadsListQuery({
 *   variables: {
 *      uploadsListInput: // value for 'uploadsListInput'
 *   },
 * });
 */
export function useUploadsListQuery(baseOptions: Apollo.QueryHookOptions<UploadsListQuery, UploadsListQueryVariables> & ({ variables: UploadsListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UploadsListQuery, UploadsListQueryVariables>(UploadsListDocument, options);
      }
export function useUploadsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UploadsListQuery, UploadsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UploadsListQuery, UploadsListQueryVariables>(UploadsListDocument, options);
        }
export function useUploadsListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UploadsListQuery, UploadsListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UploadsListQuery, UploadsListQueryVariables>(UploadsListDocument, options);
        }
export type UploadsListQueryHookResult = ReturnType<typeof useUploadsListQuery>;
export type UploadsListLazyQueryHookResult = ReturnType<typeof useUploadsListLazyQuery>;
export type UploadsListSuspenseQueryHookResult = ReturnType<typeof useUploadsListSuspenseQuery>;
export type UploadsListQueryResult = Apollo.QueryResult<UploadsListQuery, UploadsListQueryVariables>;
export const UploadsWithThumbnailsDocument = gql`
    query UploadsWithThumbnails($input: UploadsWithThumbnailsInput!) {
  uploadsWithThumbnails(input: $input) {
    ytChannelId
    ytVideoId
    channelTitle
  }
}
    `;

/**
 * __useUploadsWithThumbnailsQuery__
 *
 * To run a query within a React component, call `useUploadsWithThumbnailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUploadsWithThumbnailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUploadsWithThumbnailsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadsWithThumbnailsQuery(baseOptions: Apollo.QueryHookOptions<UploadsWithThumbnailsQuery, UploadsWithThumbnailsQueryVariables> & ({ variables: UploadsWithThumbnailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UploadsWithThumbnailsQuery, UploadsWithThumbnailsQueryVariables>(UploadsWithThumbnailsDocument, options);
      }
export function useUploadsWithThumbnailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UploadsWithThumbnailsQuery, UploadsWithThumbnailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UploadsWithThumbnailsQuery, UploadsWithThumbnailsQueryVariables>(UploadsWithThumbnailsDocument, options);
        }
export function useUploadsWithThumbnailsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UploadsWithThumbnailsQuery, UploadsWithThumbnailsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UploadsWithThumbnailsQuery, UploadsWithThumbnailsQueryVariables>(UploadsWithThumbnailsDocument, options);
        }
export type UploadsWithThumbnailsQueryHookResult = ReturnType<typeof useUploadsWithThumbnailsQuery>;
export type UploadsWithThumbnailsLazyQueryHookResult = ReturnType<typeof useUploadsWithThumbnailsLazyQuery>;
export type UploadsWithThumbnailsSuspenseQueryHookResult = ReturnType<typeof useUploadsWithThumbnailsSuspenseQuery>;
export type UploadsWithThumbnailsQueryResult = Apollo.QueryResult<UploadsWithThumbnailsQuery, UploadsWithThumbnailsQueryVariables>;
export const DeleteUploadsDocument = gql`
    mutation DeleteUploads($ytChannelId: String!, $ytVideoIds: [String!]!) {
  deleteUploads(ytChannelId: $ytChannelId, ytVideoIds: $ytVideoIds) {
    success
  }
}
    `;
export type DeleteUploadsMutationFn = Apollo.MutationFunction<DeleteUploadsMutation, DeleteUploadsMutationVariables>;

/**
 * __useDeleteUploadsMutation__
 *
 * To run a mutation, you first call `useDeleteUploadsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUploadsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUploadsMutation, { data, loading, error }] = useDeleteUploadsMutation({
 *   variables: {
 *      ytChannelId: // value for 'ytChannelId'
 *      ytVideoIds: // value for 'ytVideoIds'
 *   },
 * });
 */
export function useDeleteUploadsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUploadsMutation, DeleteUploadsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUploadsMutation, DeleteUploadsMutationVariables>(DeleteUploadsDocument, options);
      }
export type DeleteUploadsMutationHookResult = ReturnType<typeof useDeleteUploadsMutation>;
export type DeleteUploadsMutationResult = Apollo.MutationResult<DeleteUploadsMutation>;
export type DeleteUploadsMutationOptions = Apollo.BaseMutationOptions<DeleteUploadsMutation, DeleteUploadsMutationVariables>;
export const FinishProcessingUploadDocument = gql`
    mutation FinishProcessingUpload($ytChannelId: String!, $ytVideoId: String!, $savedSeconds: [Float!]!) {
  finishProcessingUpload(
    ytChannelId: $ytChannelId
    ytVideoId: $ytVideoId
    savedSeconds: $savedSeconds
  ) {
    id
    ytId
    artifact
  }
}
    `;
export type FinishProcessingUploadMutationFn = Apollo.MutationFunction<FinishProcessingUploadMutation, FinishProcessingUploadMutationVariables>;

/**
 * __useFinishProcessingUploadMutation__
 *
 * To run a mutation, you first call `useFinishProcessingUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinishProcessingUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finishProcessingUploadMutation, { data, loading, error }] = useFinishProcessingUploadMutation({
 *   variables: {
 *      ytChannelId: // value for 'ytChannelId'
 *      ytVideoId: // value for 'ytVideoId'
 *      savedSeconds: // value for 'savedSeconds'
 *   },
 * });
 */
export function useFinishProcessingUploadMutation(baseOptions?: Apollo.MutationHookOptions<FinishProcessingUploadMutation, FinishProcessingUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FinishProcessingUploadMutation, FinishProcessingUploadMutationVariables>(FinishProcessingUploadDocument, options);
      }
export type FinishProcessingUploadMutationHookResult = ReturnType<typeof useFinishProcessingUploadMutation>;
export type FinishProcessingUploadMutationResult = Apollo.MutationResult<FinishProcessingUploadMutation>;
export type FinishProcessingUploadMutationOptions = Apollo.BaseMutationOptions<FinishProcessingUploadMutation, FinishProcessingUploadMutationVariables>;