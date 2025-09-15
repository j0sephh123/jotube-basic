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

export type ChannelInfo = {
  __typename?: 'ChannelInfo';
  id: Scalars['Float']['output'];
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

export type ChannelMetadataInput = {
  channelId: Scalars['Float']['input'];
};

export type ChannelMetadataResponse = {
  __typename?: 'ChannelMetadataResponse';
  fetchedUntilEnd: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  lastSyncedAt?: Maybe<Scalars['String']['output']>;
  playlist?: Maybe<PlaylistInfo>;
  savedArtifactsCount: Scalars['Int']['output'];
  screenshotArtifactsCount: Scalars['Int']['output'];
  src: Scalars['String']['output'];
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
  channelId: Scalars['Float']['input'];
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

export type CreateEpisodeInput = {
  publishedAt?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  tvId: Scalars['Int']['input'];
};

export type CreateEpisodeResponse = {
  __typename?: 'CreateEpisodeResponse';
  episode?: Maybe<Episode>;
  message: Scalars['String']['output'];
};

export type CreateEpisodesFromPathInput = {
  ignoreDirs: Array<Scalars['String']['input']>;
  path: Scalars['String']['input'];
  structure: Scalars['String']['input'];
  tvId: Scalars['Int']['input'];
};

export type CreateEpisodesFromPathResponse = {
  __typename?: 'CreateEpisodesFromPathResponse';
  episodesCreated: Scalars['Int']['output'];
  message: Scalars['String']['output'];
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

export type CreateTvInput = {
  duration?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

export type CreateTvResponse = {
  __typename?: 'CreateTvResponse';
  message: TvMessage;
  tv?: Maybe<Tv>;
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

export type DeleteEpisodeInput = {
  id: Scalars['Int']['input'];
};

export type DeleteEpisodeResponse = {
  __typename?: 'DeleteEpisodeResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type DeleteFileDto = {
  deleteType: DeleteType;
  ytChannelId: Scalars['String']['input'];
  ytVideoId: Scalars['String']['input'];
};

export type DeleteFileResponse = {
  __typename?: 'DeleteFileResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeletePlaylistResponse = {
  __typename?: 'DeletePlaylistResponse';
  success: Scalars['Boolean']['output'];
};

export type DeleteTvInput = {
  id: Scalars['Float']['input'];
};

export type DeleteTvResponse = {
  __typename?: 'DeleteTvResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

/** Types of files/directories that can be deleted */
export enum DeleteType {
  AllScreenshots = 'ALL_SCREENSHOTS',
  SavedScreenshots = 'SAVED_SCREENSHOTS',
  Thumbnails = 'THUMBNAILS',
  Video = 'VIDEO'
}

export type DeleteUploadsInput = {
  channelId: Scalars['Float']['input'];
  ytVideoIds: Array<Scalars['String']['input']>;
};

export type DeleteUploadsResponse = {
  __typename?: 'DeleteUploadsResponse';
  success: Scalars['Boolean']['output'];
};

export type DirectorySizeResponse = {
  __typename?: 'DirectorySizeResponse';
  name: Scalars['String']['output'];
  sizeMB: Scalars['Float']['output'];
};

export type Episode = {
  __typename?: 'Episode';
  artifact: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  tv?: Maybe<Tv>;
  tvId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type EpisodeResponse = {
  __typename?: 'EpisodeResponse';
  identifier: Scalars['String']['output'];
  tv: TvResponse;
};

export type EpisodesWithThumbnailsInput = {
  episodeIds: Array<Scalars['Float']['input']>;
};

export type EpisodesWithThumbnailsResponse = {
  __typename?: 'EpisodesWithThumbnailsResponse';
  episodeIdentifier: Scalars['String']['output'];
  tvIdentifier: Scalars['String']['output'];
};

export type ExtendedTv = {
  __typename?: 'ExtendedTv';
  amountOfEpisodes: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  duration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
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
  viewType: Scalars['String']['input'];
};

export type FetchUploadsInput = {
  channelId: Scalars['Float']['input'];
};

export type FetchUploadsResponse = {
  __typename?: 'FetchUploadsResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  uploadIds?: Maybe<Array<Scalars['String']['output']>>;
};

export type FetchVideosDashboardInput = {
  screenshotMax?: InputMaybe<Scalars['Float']['input']>;
  screenshotMin?: InputMaybe<Scalars['Float']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
  videosDashboardViewType?: InputMaybe<Scalars['String']['input']>;
};

export type FileInfo = {
  __typename?: 'FileInfo';
  duration: Scalars['Float']['output'];
  format: Scalars['String']['output'];
  fullPath: Scalars['String']['output'];
  parentFolderName: Scalars['String']['output'];
  size: Scalars['Float']['output'];
  videoFileName: Scalars['String']['output'];
};

export type FileWithSizeResponse = {
  __typename?: 'FileWithSizeResponse';
  name: Scalars['String']['output'];
  sizeMB: Scalars['Float']['output'];
};

export type FinishProcessEpisodeInput = {
  episodeIdentifier: Scalars['String']['input'];
  savedSeconds: Array<Scalars['Float']['input']>;
  tvIdentifier: Scalars['String']['input'];
};

export type FinishProcessEpisodeResponse = {
  __typename?: 'FinishProcessEpisodeResponse';
  artifact: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  identifier: Scalars['String']['output'];
};

export type FinishProcessUploadResponse = {
  __typename?: 'FinishProcessUploadResponse';
  artifact: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  ytId: Scalars['String']['output'];
};

export type FolderScannerInput = {
  ignoreDirs: Array<Scalars['String']['input']>;
  path: Scalars['String']['input'];
  structure: Scalars['String']['input'];
};

export type FolderScannerResponse = {
  __typename?: 'FolderScannerResponse';
  files: Array<FileInfo>;
};

export type GetAllEpisodesInput = {
  artifact: Scalars['String']['input'];
  tvIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type GetAllEpisodesResponse = {
  __typename?: 'GetAllEpisodesResponse';
  artifact: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  title: Scalars['String']['output'];
  tvId: Scalars['ID']['output'];
  tvIdentifier: Scalars['String']['output'];
  tvTitle: Scalars['String']['output'];
};

export type GetEpisodeInput = {
  id: Scalars['Int']['input'];
};

export type GetScreenshotsInput = {
  channelIds?: InputMaybe<Array<Scalars['Float']['input']>>;
  playlistId?: InputMaybe<Scalars['Float']['input']>;
  shuffle?: InputMaybe<Scalars['Boolean']['input']>;
  type: Scalars['String']['input'];
  videoIds?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type GetScreenshotsResponse = {
  __typename?: 'GetScreenshotsResponse';
  id: Scalars['Float']['output'];
  second: Scalars['Float']['output'];
  src: Scalars['String']['output'];
  ytVideoId: Scalars['String']['output'];
};

export type GetThumbnailInput = {
  type: Scalars['String']['input'];
  videoId: Scalars['Float']['input'];
};

export type GetThumbnailResponse = {
  __typename?: 'GetThumbnailResponse';
  createdAt: Scalars['String']['output'];
  episode?: Maybe<EpisodeResponse>;
  episodeId?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Float']['output'];
  perRow: Scalars['Float']['output'];
  thumbnailsCount: Scalars['Float']['output'];
  totalSeconds: Scalars['Float']['output'];
  updatedAt: Scalars['String']['output'];
  uploadsVideo?: Maybe<UploadsVideoResponse>;
  uploadsVideoId?: Maybe<Scalars['Float']['output']>;
};

export type GetTvInput = {
  id: Scalars['Float']['input'];
};

export type GetVideoByYtIdInput = {
  channelId: Scalars['Float']['input'];
  ytId: Scalars['String']['input'];
};

export type IdInput = {
  type: IdType;
  value: Scalars['Int']['input'];
};

/** Type of ID for uploads list */
export enum IdType {
  Channel = 'CHANNEL',
  Playlist = 'PLAYLIST'
}

export type Mutation = {
  __typename?: 'Mutation';
  cleanShortUploads: CleanShortUploadsResponse;
  createChannel: CreateChannelResponse;
  createEpisode: CreateEpisodeResponse;
  createEpisodesFromPath: CreateEpisodesFromPathResponse;
  createPlaylist: CreatePlaylistResponse;
  createTv: CreateTvResponse;
  deleteChannel: DeleteChannelResponse;
  deleteEpisode: DeleteEpisodeResponse;
  deleteFileOrDirectory: DeleteFileResponse;
  deletePlaylist: DeletePlaylistResponse;
  deleteTv: DeleteTvResponse;
  deleteUploads: DeleteUploadsResponse;
  fetchUploads: FetchUploadsResponse;
  finishProcessingEpisode: FinishProcessEpisodeResponse;
  finishProcessingUpload: FinishProcessUploadResponse;
  saveUpload: SaveUploadResponse;
  syncUploads: SyncUploadsResponse;
  updateChannelPlaylist: UpdateChannelPlaylistResponse;
  updateEpisode: UpdateEpisodeResponse;
  updatePlaylist: UpdatePlaylistResponse;
  updateTv: UpdateTvResponse;
};


export type MutationCleanShortUploadsArgs = {
  cleanShortUploadsInput: CleanShortUploadsInput;
};


export type MutationCreateChannelArgs = {
  createChannelInput: CreateChannelInput;
};


export type MutationCreateEpisodeArgs = {
  createEpisodeInput: CreateEpisodeInput;
};


export type MutationCreateEpisodesFromPathArgs = {
  createEpisodesFromPathInput: CreateEpisodesFromPathInput;
};


export type MutationCreatePlaylistArgs = {
  createPlaylistInput: CreatePlaylistInput;
};


export type MutationCreateTvArgs = {
  createTvInput: CreateTvInput;
};


export type MutationDeleteChannelArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteEpisodeArgs = {
  deleteEpisodeInput: DeleteEpisodeInput;
};


export type MutationDeleteFileOrDirectoryArgs = {
  deleteFileInput: DeleteFileDto;
};


export type MutationDeletePlaylistArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteTvArgs = {
  deleteTvInput: DeleteTvInput;
};


export type MutationDeleteUploadsArgs = {
  deleteUploadsInput: DeleteUploadsInput;
};


export type MutationFetchUploadsArgs = {
  fetchUploadsInput: FetchUploadsInput;
};


export type MutationFinishProcessingEpisodeArgs = {
  finishProcessEpisodeInput: FinishProcessEpisodeInput;
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


export type MutationUpdateEpisodeArgs = {
  id: Scalars['Float']['input'];
  updateEpisodeInput: UpdateEpisodeInput;
};


export type MutationUpdatePlaylistArgs = {
  id: Scalars['Int']['input'];
  updatePlaylistInput: UpdatePlaylistInput;
};


export type MutationUpdateTvArgs = {
  id: Scalars['Float']['input'];
  updateTvInput: UpdateTvInput;
};

/** Processing phases for video uploads */
export enum Phase {
  Download = 'DOWNLOAD',
  Screenshots = 'SCREENSHOTS',
  Thumbnails = 'THUMBNAILS'
}

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
  storyboardCount: Scalars['Int']['output'];
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

export type ProcessingPhaseResponse = {
  __typename?: 'ProcessingPhaseResponse';
  createdAt: Scalars['DateTime']['output'];
  endedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  phase: Phase;
  uploadsVideo: UploadsVideoInfo;
  uploadsVideoId: Scalars['Float']['output'];
};

export type ProcessingReadyUploadsResponse = {
  __typename?: 'ProcessingReadyUploadsResponse';
  count: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  channelForPlaylist: ChannelForPlaylistResponse;
  channelMetadata: ChannelMetadataResponse;
  episodesWithThumbnails: Array<EpisodesWithThumbnailsResponse>;
  fetchDashboard: ChannelsDashboardResponse;
  fetchVideosDashboard: VideosDashboardResponse;
  getAllEpisodes: Array<GetAllEpisodesResponse>;
  getAllTvs: Array<ExtendedTv>;
  getEpisode?: Maybe<Episode>;
  getEpisodeDetails?: Maybe<Episode>;
  getProcessingReadyUploads: ProcessingReadyUploadsResponse;
  getScreenshots: Array<GetScreenshotsResponse>;
  getThumbnail?: Maybe<GetThumbnailResponse>;
  getTv?: Maybe<Tv>;
  getVideoByYtId: VideoByYtIdResponse;
  playlistDetails?: Maybe<PlaylistDetailsResponse>;
  playlistUploadsList: Array<PlaylistUploadsListUploadResponse>;
  playlists: Array<PlaylistResponse>;
  processingPhases: Array<ProcessingPhaseResponse>;
  scanFolder: FolderScannerResponse;
  searchChannels: Array<SearchChannelResult>;
  searchVideos: Array<SearchVideoResult>;
  statisticsCounts: StatisticsCountsResponse;
  storyboards: Array<UploadsVideoStoryboardResponse>;
  uploadsList: Array<UploadsListUploadResponse>;
  uploadsWithStoryboards: Array<UploadWithStoryboardResponse>;
  uploadsWithThumbnails: Array<UploadsWithThumbnailsResponse>;
};


export type QueryChannelForPlaylistArgs = {
  ytChannelId: Scalars['String']['input'];
};


export type QueryChannelMetadataArgs = {
  channelMetadataInput: ChannelMetadataInput;
};


export type QueryEpisodesWithThumbnailsArgs = {
  input: EpisodesWithThumbnailsInput;
};


export type QueryFetchDashboardArgs = {
  fetchDashboardInput: FetchDashboardInput;
};


export type QueryFetchVideosDashboardArgs = {
  fetchVideosDashboardInput: FetchVideosDashboardInput;
};


export type QueryGetAllEpisodesArgs = {
  getAllEpisodesInput: GetAllEpisodesInput;
};


export type QueryGetEpisodeArgs = {
  getEpisodeInput: GetEpisodeInput;
};


export type QueryGetEpisodeDetailsArgs = {
  getEpisodeInput: GetEpisodeInput;
};


export type QueryGetScreenshotsArgs = {
  input: GetScreenshotsInput;
};


export type QueryGetThumbnailArgs = {
  input: GetThumbnailInput;
};


export type QueryGetTvArgs = {
  getTvInput: GetTvInput;
};


export type QueryGetVideoByYtIdArgs = {
  getVideoByYtIdInput: GetVideoByYtIdInput;
};


export type QueryPlaylistDetailsArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPlaylistUploadsListArgs = {
  playlistUploadsListInput: PlaylistUploadsListInput;
};


export type QueryProcessingPhasesArgs = {
  variant?: Scalars['String']['input'];
};


export type QueryScanFolderArgs = {
  folderScannerInput: FolderScannerInput;
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
  uploads: Array<Scalars['String']['input']>;
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
  totalStoryboards: Scalars['Float']['output'];
  totalThumbnails: Scalars['Float']['output'];
};

export type StoryboardChannelResponse = {
  __typename?: 'StoryboardChannelResponse';
  id: Scalars['Int']['output'];
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
  fragments: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type StoryboardQueryInput = {
  channelIds?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type SyncUploadsInput = {
  channelId: Scalars['Int']['input'];
};

export type SyncUploadsResponse = {
  __typename?: 'SyncUploadsResponse';
  count: Scalars['Int']['output'];
};

export type TvResponse = {
  __typename?: 'TVResponse';
  identifier: Scalars['String']['output'];
};

export type Tv = {
  __typename?: 'Tv';
  createdAt: Scalars['DateTime']['output'];
  duration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** Possible messages for TV operation responses */
export enum TvMessage {
  CreatedSuccessfully = 'CREATED_SUCCESSFULLY',
  FailedToCreate = 'FAILED_TO_CREATE',
  FailedToUpdate = 'FAILED_TO_UPDATE',
  UpdatedSuccessfully = 'UPDATED_SUCCESSFULLY'
}

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

export type UpdateEpisodeInput = {
  publishedAt?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type UpdateEpisodeResponse = {
  __typename?: 'UpdateEpisodeResponse';
  episode?: Maybe<Episode>;
  message: Scalars['String']['output'];
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

export type UpdateTvInput = {
  duration?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

export type UpdateTvResponse = {
  __typename?: 'UpdateTvResponse';
  message: TvMessage;
  tv?: Maybe<Tv>;
};

export type UploadWithStoryboardResponse = {
  __typename?: 'UploadWithStoryboardResponse';
  channel: StoryboardChannelResponse;
  id: Scalars['Int']['output'];
  storyboard: StoryboardFragmentResponse;
  title: Scalars['String']['output'];
  ytId: Scalars['String']['output'];
};

export type UploadsListInput = {
  id: IdInput;
  sortOrder: SortOrder;
  take: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};

export type UploadsListUploadResponse = {
  __typename?: 'UploadsListUploadResponse';
  channelId: Scalars['Int']['output'];
  channelTitle: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  publishedAt: Scalars['String']['output'];
  src: Scalars['String']['output'];
  title: Scalars['String']['output'];
  ytChannelId: Scalars['String']['output'];
  ytId: Scalars['String']['output'];
};

export type UploadsVideoInfo = {
  __typename?: 'UploadsVideoInfo';
  channel: ChannelInfo;
  id: Scalars['Float']['output'];
  title: Scalars['String']['output'];
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
  channelIds?: InputMaybe<Array<Scalars['Float']['input']>>;
  idType: IdType;
  playlistId?: InputMaybe<Scalars['Int']['input']>;
};

export type UploadsWithThumbnailsResponse = {
  __typename?: 'UploadsWithThumbnailsResponse';
  channelId: Scalars['Float']['output'];
  channelTitle: Scalars['String']['output'];
  videoId: Scalars['Float']['output'];
  ytChannelId: Scalars['String']['output'];
  ytVideoId: Scalars['String']['output'];
};

export type VideoByYtIdResponse = {
  __typename?: 'VideoByYtIdResponse';
  artifact: Scalars['String']['output'];
  channelTitle: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  directoriesWithSize: Array<DirectorySizeResponse>;
  filesWithSize: Array<FileWithSizeResponse>;
  id: Scalars['Float']['output'];
  publishedAt: Scalars['String']['output'];
  screenshots: Scalars['Float']['output'];
  src: Scalars['String']['output'];
  title: Scalars['String']['output'];
  totalSizeMB: Scalars['Float']['output'];
  updatedAt: Scalars['String']['output'];
  ytId: Scalars['String']['output'];
};

export type VideosDashboardResponse = {
  __typename?: 'VideosDashboardResponse';
  total: Scalars['Int']['output'];
  videos: Array<DashboardVideoResponse>;
};

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
  channelMetadataInput: ChannelMetadataInput;
}>;


export type GetChannelMetadataQuery = { __typename?: 'Query', channelMetadata: { __typename?: 'ChannelMetadataResponse', id: number, src: string, title: string, fetchedUntilEnd: boolean, videoCount: number, lastSyncedAt?: string | null, videoArtifactsCount: number, savedArtifactsCount: number, thumbnailArtifactsCount: number, screenshotArtifactsCount: number, storyboardArtifactsCount: number, playlist?: { __typename?: 'PlaylistInfo', id: number, name: string } | null } };

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


export type GetPlaylistDetailsQuery = { __typename?: 'Query', playlistDetails?: { __typename?: 'PlaylistDetailsResponse', id: number, name: string, createdAt: string, updatedAt: string, channels: Array<{ __typename?: 'PlaylistChannelWithCountsResponse', id: number, title: string, ytId: string, src: string, videoCount: number, savedCount: number, screenshotCount: number, thumbnailCount: number, storyboardCount: number, lastSyncedAt?: string | null, featuredScreenshots: Array<{ __typename?: 'FeaturedScreenshotResponse', id: number, second: number, ytVideoId: string, src: string }> }> } | null };

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


export type GetPlaylistUploadsListQuery = { __typename?: 'Query', playlistUploadsList: Array<{ __typename?: 'PlaylistUploadsListUploadResponse', id: number, ytId: string, title: string, publishedAt: string, channelTitle: string, ytChannelId: string, src: string }> };

export type GetProcessingReadyUploadsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProcessingReadyUploadsQuery = { __typename?: 'Query', getProcessingReadyUploads: { __typename?: 'ProcessingReadyUploadsResponse', count: number } };

export type GetScreenshotsQueryVariables = Exact<{
  input: GetScreenshotsInput;
}>;


export type GetScreenshotsQuery = { __typename?: 'Query', getScreenshots: Array<{ __typename?: 'GetScreenshotsResponse', ytVideoId: string, id: number, second: number, src: string }> };

export type FetchDashboardQueryVariables = Exact<{
  fetchDashboardInput: FetchDashboardInput;
}>;


export type FetchDashboardQuery = { __typename?: 'Query', fetchDashboard: { __typename?: 'ChannelsDashboardResponse', total: number, channels: Array<{ __typename?: 'DashboardChannelResponse', id: number, createdAt: any, title: string, ytId: string, src: string, lastSyncedAt?: any | null, videoCount: number, thumbnails: number, saved: number, defaults: number, storyboard: number, screenshotsCount: number, playlist?: { __typename?: 'DashboardPlaylistResponse', id: number, name: string } | null, featuredScreenshots: Array<{ __typename?: 'FeaturedScreenshotResponse', src: string, id: number, second: number, ytVideoId: string }> }> } };

export type FetchVideosDashboardQueryVariables = Exact<{
  fetchVideosDashboardInput: FetchVideosDashboardInput;
}>;


export type FetchVideosDashboardQuery = { __typename?: 'Query', fetchVideosDashboard: { __typename?: 'VideosDashboardResponse', total: number, videos: Array<{ __typename?: 'DashboardVideoResponse', id: number, ytId: string, title: string, src: string, channelId: number, channelTitle: string, channelYtId: string, screenshotCount: number, featuredScreenshots: Array<{ __typename?: 'FeaturedScreenshotResponse', src: string, id: number, second: number, ytVideoId: string }> }> } };

export type GetAllEpisodesQueryVariables = Exact<{
  getAllEpisodesInput: GetAllEpisodesInput;
}>;


export type GetAllEpisodesQuery = { __typename?: 'Query', getAllEpisodes: Array<{ __typename?: 'GetAllEpisodesResponse', id: string, identifier: string, title: string, artifact: string, createdAt: any, tvId: string, tvTitle: string, tvIdentifier: string }> };

export type GetEpisodeQueryVariables = Exact<{
  getEpisodeInput: GetEpisodeInput;
}>;


export type GetEpisodeQuery = { __typename?: 'Query', getEpisode?: { __typename?: 'Episode', id: string, identifier: string, title: string, artifact: string, publishedAt?: any | null, createdAt: any, updatedAt: any, tvId: string, tv?: { __typename?: 'Tv', id: string, identifier: string, title: string } | null } | null };

export type GetEpisodeDetailsQueryVariables = Exact<{
  getEpisodeInput: GetEpisodeInput;
}>;


export type GetEpisodeDetailsQuery = { __typename?: 'Query', getEpisodeDetails?: { __typename?: 'Episode', id: string, identifier: string, title: string, artifact: string, publishedAt?: any | null, createdAt: any, updatedAt: any, tvId: string, tv?: { __typename?: 'Tv', id: string, identifier: string, title: string } | null } | null };

export type CreateEpisodeMutationVariables = Exact<{
  createEpisodeInput: CreateEpisodeInput;
}>;


export type CreateEpisodeMutation = { __typename?: 'Mutation', createEpisode: { __typename?: 'CreateEpisodeResponse', message: string, episode?: { __typename?: 'Episode', id: string, identifier: string, title: string, artifact: string, publishedAt?: any | null, createdAt: any, updatedAt: any, tvId: string } | null } };

export type UpdateEpisodeMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  updateEpisodeInput: UpdateEpisodeInput;
}>;


export type UpdateEpisodeMutation = { __typename?: 'Mutation', updateEpisode: { __typename?: 'UpdateEpisodeResponse', message: string, episode?: { __typename?: 'Episode', id: string, identifier: string, title: string, artifact: string, publishedAt?: any | null, createdAt: any, updatedAt: any, tvId: string } | null } };

export type DeleteEpisodeMutationVariables = Exact<{
  deleteEpisodeInput: DeleteEpisodeInput;
}>;


export type DeleteEpisodeMutation = { __typename?: 'Mutation', deleteEpisode: { __typename?: 'DeleteEpisodeResponse', success: boolean, message: string } };

export type FinishProcessingEpisodeMutationVariables = Exact<{
  finishProcessEpisodeInput: FinishProcessEpisodeInput;
}>;


export type FinishProcessingEpisodeMutation = { __typename?: 'Mutation', finishProcessingEpisode: { __typename?: 'FinishProcessEpisodeResponse', id: number, identifier: string, artifact: string } };

export type GetProcessingPhasesQueryVariables = Exact<{
  variant?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetProcessingPhasesQuery = { __typename?: 'Query', processingPhases: Array<{ __typename?: 'ProcessingPhaseResponse', id: number, uploadsVideoId: number, phase: Phase, createdAt: any, endedAt?: any | null, uploadsVideo: { __typename?: 'UploadsVideoInfo', id: number, ytId: string, title: string, channel: { __typename?: 'ChannelInfo', id: number, title: string, ytId: string } } }> };

export type SearchVideosQueryVariables = Exact<{
  searchInput: SearchInput;
}>;


export type SearchVideosQuery = { __typename?: 'Query', searchVideos: Array<{ __typename?: 'SearchVideoResult', title: string, ytId: string, src: string, channelYtId: string, type: string }> };

export type SearchChannelsQueryVariables = Exact<{
  searchInput: SearchInput;
}>;


export type SearchChannelsQuery = { __typename?: 'Query', searchChannels: Array<{ __typename?: 'SearchChannelResult', title: string, ytId: string, src: string, type: string }> };

export type GetStatisticsCountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStatisticsCountsQuery = { __typename?: 'Query', statisticsCounts: { __typename?: 'StatisticsCountsResponse', totalScreenshots: number, totalThumbnails: number, totalSaved: number, totalStoryboards: number } };

export type StoryboardsQueryVariables = Exact<{
  ytChannelId: Scalars['String']['input'];
}>;


export type StoryboardsQuery = { __typename?: 'Query', storyboards: Array<{ __typename?: 'UploadsVideoStoryboardResponse', id: number, ytId: string, title: string, src: string, publishedAt: string, createdAt: string, updatedAt: string, channelId: number, nextPageToken?: string | null, duration?: number | null, artifact: string, storyboard: { __typename?: 'StoryboardDataResponse', id: number, uploadsVideoId: number, fragments: number, url: string, createdAt: string, updatedAt: string } }> };

export type GetEpisodesWithThumbnailsQueryVariables = Exact<{
  input: EpisodesWithThumbnailsInput;
}>;


export type GetEpisodesWithThumbnailsQuery = { __typename?: 'Query', episodesWithThumbnails: Array<{ __typename?: 'EpisodesWithThumbnailsResponse', tvIdentifier: string, episodeIdentifier: string }> };

export type GetThumbnailQueryVariables = Exact<{
  input: GetThumbnailInput;
}>;


export type GetThumbnailQuery = { __typename?: 'Query', getThumbnail?: { __typename?: 'GetThumbnailResponse', createdAt: string, id: number, perRow: number, updatedAt: string, uploadsVideoId?: number | null, episodeId?: number | null, totalSeconds: number, thumbnailsCount: number, uploadsVideo?: { __typename?: 'UploadsVideoResponse', ytId: string, channel: { __typename?: 'ChannelResponse', id: number, ytId: string, title: string } } | null, episode?: { __typename?: 'EpisodeResponse', identifier: string, tv: { __typename?: 'TVResponse', identifier: string } } | null } | null };

export type GetAllTvsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTvsQuery = { __typename?: 'Query', getAllTvs: Array<{ __typename?: 'ExtendedTv', id: string, identifier: string, title: string, duration?: number | null, createdAt: any, updatedAt: any, amountOfEpisodes: number }> };

export type GetTvQueryVariables = Exact<{
  getTvInput: GetTvInput;
}>;


export type GetTvQuery = { __typename?: 'Query', getTv?: { __typename?: 'Tv', id: string, identifier: string, title: string, duration?: number | null, createdAt: any, updatedAt: any } | null };

export type CreateTvMutationVariables = Exact<{
  createTvInput: CreateTvInput;
}>;


export type CreateTvMutation = { __typename?: 'Mutation', createTv: { __typename?: 'CreateTvResponse', message: TvMessage, tv?: { __typename?: 'Tv', id: string, identifier: string, title: string, duration?: number | null, createdAt: any, updatedAt: any } | null } };

export type UpdateTvMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  updateTvInput: UpdateTvInput;
}>;


export type UpdateTvMutation = { __typename?: 'Mutation', updateTv: { __typename?: 'UpdateTvResponse', message: TvMessage, tv?: { __typename?: 'Tv', id: string, identifier: string, title: string, duration?: number | null, createdAt: any, updatedAt: any } | null } };

export type DeleteTvMutationVariables = Exact<{
  deleteTvInput: DeleteTvInput;
}>;


export type DeleteTvMutation = { __typename?: 'Mutation', deleteTv: { __typename?: 'DeleteTvResponse', success: boolean, message: string } };

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


export type UploadsWithStoryboardsQuery = { __typename?: 'Query', uploadsWithStoryboards: Array<{ __typename?: 'UploadWithStoryboardResponse', id: number, title: string, ytId: string, storyboard: { __typename?: 'StoryboardFragmentResponse', fragments: number, url: string }, channel: { __typename?: 'StoryboardChannelResponse', id: number } }> };

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


export type UploadsListQuery = { __typename?: 'Query', uploadsList: Array<{ __typename?: 'UploadsListUploadResponse', id: number, ytId: string, title: string, publishedAt: string, src: string, channelId: number, channelTitle: string, ytChannelId: string }> };

export type UploadsWithThumbnailsQueryVariables = Exact<{
  input: UploadsWithThumbnailsInput;
}>;


export type UploadsWithThumbnailsQuery = { __typename?: 'Query', uploadsWithThumbnails: Array<{ __typename?: 'UploadsWithThumbnailsResponse', ytChannelId: string, ytVideoId: string, channelTitle: string, channelId: number, videoId: number }> };

export type DeleteUploadsMutationVariables = Exact<{
  deleteUploadsInput: DeleteUploadsInput;
}>;


export type DeleteUploadsMutation = { __typename?: 'Mutation', deleteUploads: { __typename?: 'DeleteUploadsResponse', success: boolean } };

export type FinishProcessingUploadMutationVariables = Exact<{
  ytChannelId: Scalars['String']['input'];
  ytVideoId: Scalars['String']['input'];
  savedSeconds: Array<Scalars['Float']['input']> | Scalars['Float']['input'];
}>;


export type FinishProcessingUploadMutation = { __typename?: 'Mutation', finishProcessingUpload: { __typename?: 'FinishProcessUploadResponse', id: number, ytId: string, artifact: string } };

export type GetVideoByYtIdQueryVariables = Exact<{
  getVideoByYtIdInput: GetVideoByYtIdInput;
}>;


export type GetVideoByYtIdQuery = { __typename?: 'Query', getVideoByYtId: { __typename?: 'VideoByYtIdResponse', id: number, createdAt: string, updatedAt: string, publishedAt: string, title: string, ytId: string, src: string, artifact: string, channelTitle: string, totalSizeMB: number, screenshots: number, filesWithSize: Array<{ __typename?: 'FileWithSizeResponse', name: string, sizeMB: number }>, directoriesWithSize: Array<{ __typename?: 'DirectorySizeResponse', name: string, sizeMB: number }> } };

export type DeleteFileOrDirectoryMutationVariables = Exact<{
  deleteFileInput: DeleteFileDto;
}>;


export type DeleteFileOrDirectoryMutation = { __typename?: 'Mutation', deleteFileOrDirectory: { __typename?: 'DeleteFileResponse', success: boolean, message?: string | null } };

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
    query GetChannelMetadata($channelMetadataInput: ChannelMetadataInput!) {
  channelMetadata(channelMetadataInput: $channelMetadataInput) {
    id
    src
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
 *      channelMetadataInput: // value for 'channelMetadataInput'
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
      storyboardCount
      lastSyncedAt
      featuredScreenshots {
        id
        second
        ytVideoId
        src
      }
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
    id
    ytId
    title
    publishedAt
    channelTitle
    ytChannelId
    src
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
export const GetProcessingReadyUploadsDocument = gql`
    query GetProcessingReadyUploads {
  getProcessingReadyUploads {
    count
  }
}
    `;

/**
 * __useGetProcessingReadyUploadsQuery__
 *
 * To run a query within a React component, call `useGetProcessingReadyUploadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProcessingReadyUploadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProcessingReadyUploadsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProcessingReadyUploadsQuery(baseOptions?: Apollo.QueryHookOptions<GetProcessingReadyUploadsQuery, GetProcessingReadyUploadsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProcessingReadyUploadsQuery, GetProcessingReadyUploadsQueryVariables>(GetProcessingReadyUploadsDocument, options);
      }
export function useGetProcessingReadyUploadsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProcessingReadyUploadsQuery, GetProcessingReadyUploadsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProcessingReadyUploadsQuery, GetProcessingReadyUploadsQueryVariables>(GetProcessingReadyUploadsDocument, options);
        }
export function useGetProcessingReadyUploadsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProcessingReadyUploadsQuery, GetProcessingReadyUploadsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProcessingReadyUploadsQuery, GetProcessingReadyUploadsQueryVariables>(GetProcessingReadyUploadsDocument, options);
        }
export type GetProcessingReadyUploadsQueryHookResult = ReturnType<typeof useGetProcessingReadyUploadsQuery>;
export type GetProcessingReadyUploadsLazyQueryHookResult = ReturnType<typeof useGetProcessingReadyUploadsLazyQuery>;
export type GetProcessingReadyUploadsSuspenseQueryHookResult = ReturnType<typeof useGetProcessingReadyUploadsSuspenseQuery>;
export type GetProcessingReadyUploadsQueryResult = Apollo.QueryResult<GetProcessingReadyUploadsQuery, GetProcessingReadyUploadsQueryVariables>;
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
    query FetchVideosDashboard($fetchVideosDashboardInput: FetchVideosDashboardInput!) {
  fetchVideosDashboard(fetchVideosDashboardInput: $fetchVideosDashboardInput) {
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
 *      fetchVideosDashboardInput: // value for 'fetchVideosDashboardInput'
 *   },
 * });
 */
export function useFetchVideosDashboardQuery(baseOptions: Apollo.QueryHookOptions<FetchVideosDashboardQuery, FetchVideosDashboardQueryVariables> & ({ variables: FetchVideosDashboardQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
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
export const GetAllEpisodesDocument = gql`
    query GetAllEpisodes($getAllEpisodesInput: GetAllEpisodesInput!) {
  getAllEpisodes(getAllEpisodesInput: $getAllEpisodesInput) {
    id
    identifier
    title
    artifact
    createdAt
    tvId
    tvTitle
    tvIdentifier
  }
}
    `;

/**
 * __useGetAllEpisodesQuery__
 *
 * To run a query within a React component, call `useGetAllEpisodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllEpisodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllEpisodesQuery({
 *   variables: {
 *      getAllEpisodesInput: // value for 'getAllEpisodesInput'
 *   },
 * });
 */
export function useGetAllEpisodesQuery(baseOptions: Apollo.QueryHookOptions<GetAllEpisodesQuery, GetAllEpisodesQueryVariables> & ({ variables: GetAllEpisodesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllEpisodesQuery, GetAllEpisodesQueryVariables>(GetAllEpisodesDocument, options);
      }
export function useGetAllEpisodesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllEpisodesQuery, GetAllEpisodesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllEpisodesQuery, GetAllEpisodesQueryVariables>(GetAllEpisodesDocument, options);
        }
export function useGetAllEpisodesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllEpisodesQuery, GetAllEpisodesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllEpisodesQuery, GetAllEpisodesQueryVariables>(GetAllEpisodesDocument, options);
        }
export type GetAllEpisodesQueryHookResult = ReturnType<typeof useGetAllEpisodesQuery>;
export type GetAllEpisodesLazyQueryHookResult = ReturnType<typeof useGetAllEpisodesLazyQuery>;
export type GetAllEpisodesSuspenseQueryHookResult = ReturnType<typeof useGetAllEpisodesSuspenseQuery>;
export type GetAllEpisodesQueryResult = Apollo.QueryResult<GetAllEpisodesQuery, GetAllEpisodesQueryVariables>;
export const GetEpisodeDocument = gql`
    query GetEpisode($getEpisodeInput: GetEpisodeInput!) {
  getEpisode(getEpisodeInput: $getEpisodeInput) {
    id
    identifier
    title
    artifact
    publishedAt
    createdAt
    updatedAt
    tvId
    tv {
      id
      identifier
      title
    }
  }
}
    `;

/**
 * __useGetEpisodeQuery__
 *
 * To run a query within a React component, call `useGetEpisodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEpisodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEpisodeQuery({
 *   variables: {
 *      getEpisodeInput: // value for 'getEpisodeInput'
 *   },
 * });
 */
export function useGetEpisodeQuery(baseOptions: Apollo.QueryHookOptions<GetEpisodeQuery, GetEpisodeQueryVariables> & ({ variables: GetEpisodeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEpisodeQuery, GetEpisodeQueryVariables>(GetEpisodeDocument, options);
      }
export function useGetEpisodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEpisodeQuery, GetEpisodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEpisodeQuery, GetEpisodeQueryVariables>(GetEpisodeDocument, options);
        }
export function useGetEpisodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEpisodeQuery, GetEpisodeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEpisodeQuery, GetEpisodeQueryVariables>(GetEpisodeDocument, options);
        }
export type GetEpisodeQueryHookResult = ReturnType<typeof useGetEpisodeQuery>;
export type GetEpisodeLazyQueryHookResult = ReturnType<typeof useGetEpisodeLazyQuery>;
export type GetEpisodeSuspenseQueryHookResult = ReturnType<typeof useGetEpisodeSuspenseQuery>;
export type GetEpisodeQueryResult = Apollo.QueryResult<GetEpisodeQuery, GetEpisodeQueryVariables>;
export const GetEpisodeDetailsDocument = gql`
    query GetEpisodeDetails($getEpisodeInput: GetEpisodeInput!) {
  getEpisodeDetails(getEpisodeInput: $getEpisodeInput) {
    id
    identifier
    title
    artifact
    publishedAt
    createdAt
    updatedAt
    tvId
    tv {
      id
      identifier
      title
    }
  }
}
    `;

/**
 * __useGetEpisodeDetailsQuery__
 *
 * To run a query within a React component, call `useGetEpisodeDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEpisodeDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEpisodeDetailsQuery({
 *   variables: {
 *      getEpisodeInput: // value for 'getEpisodeInput'
 *   },
 * });
 */
export function useGetEpisodeDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetEpisodeDetailsQuery, GetEpisodeDetailsQueryVariables> & ({ variables: GetEpisodeDetailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEpisodeDetailsQuery, GetEpisodeDetailsQueryVariables>(GetEpisodeDetailsDocument, options);
      }
export function useGetEpisodeDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEpisodeDetailsQuery, GetEpisodeDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEpisodeDetailsQuery, GetEpisodeDetailsQueryVariables>(GetEpisodeDetailsDocument, options);
        }
export function useGetEpisodeDetailsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEpisodeDetailsQuery, GetEpisodeDetailsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEpisodeDetailsQuery, GetEpisodeDetailsQueryVariables>(GetEpisodeDetailsDocument, options);
        }
export type GetEpisodeDetailsQueryHookResult = ReturnType<typeof useGetEpisodeDetailsQuery>;
export type GetEpisodeDetailsLazyQueryHookResult = ReturnType<typeof useGetEpisodeDetailsLazyQuery>;
export type GetEpisodeDetailsSuspenseQueryHookResult = ReturnType<typeof useGetEpisodeDetailsSuspenseQuery>;
export type GetEpisodeDetailsQueryResult = Apollo.QueryResult<GetEpisodeDetailsQuery, GetEpisodeDetailsQueryVariables>;
export const CreateEpisodeDocument = gql`
    mutation CreateEpisode($createEpisodeInput: CreateEpisodeInput!) {
  createEpisode(createEpisodeInput: $createEpisodeInput) {
    episode {
      id
      identifier
      title
      artifact
      publishedAt
      createdAt
      updatedAt
      tvId
    }
    message
  }
}
    `;
export type CreateEpisodeMutationFn = Apollo.MutationFunction<CreateEpisodeMutation, CreateEpisodeMutationVariables>;

/**
 * __useCreateEpisodeMutation__
 *
 * To run a mutation, you first call `useCreateEpisodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEpisodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEpisodeMutation, { data, loading, error }] = useCreateEpisodeMutation({
 *   variables: {
 *      createEpisodeInput: // value for 'createEpisodeInput'
 *   },
 * });
 */
export function useCreateEpisodeMutation(baseOptions?: Apollo.MutationHookOptions<CreateEpisodeMutation, CreateEpisodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEpisodeMutation, CreateEpisodeMutationVariables>(CreateEpisodeDocument, options);
      }
export type CreateEpisodeMutationHookResult = ReturnType<typeof useCreateEpisodeMutation>;
export type CreateEpisodeMutationResult = Apollo.MutationResult<CreateEpisodeMutation>;
export type CreateEpisodeMutationOptions = Apollo.BaseMutationOptions<CreateEpisodeMutation, CreateEpisodeMutationVariables>;
export const UpdateEpisodeDocument = gql`
    mutation UpdateEpisode($id: Float!, $updateEpisodeInput: UpdateEpisodeInput!) {
  updateEpisode(id: $id, updateEpisodeInput: $updateEpisodeInput) {
    episode {
      id
      identifier
      title
      artifact
      publishedAt
      createdAt
      updatedAt
      tvId
    }
    message
  }
}
    `;
export type UpdateEpisodeMutationFn = Apollo.MutationFunction<UpdateEpisodeMutation, UpdateEpisodeMutationVariables>;

/**
 * __useUpdateEpisodeMutation__
 *
 * To run a mutation, you first call `useUpdateEpisodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEpisodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEpisodeMutation, { data, loading, error }] = useUpdateEpisodeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateEpisodeInput: // value for 'updateEpisodeInput'
 *   },
 * });
 */
export function useUpdateEpisodeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEpisodeMutation, UpdateEpisodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEpisodeMutation, UpdateEpisodeMutationVariables>(UpdateEpisodeDocument, options);
      }
export type UpdateEpisodeMutationHookResult = ReturnType<typeof useUpdateEpisodeMutation>;
export type UpdateEpisodeMutationResult = Apollo.MutationResult<UpdateEpisodeMutation>;
export type UpdateEpisodeMutationOptions = Apollo.BaseMutationOptions<UpdateEpisodeMutation, UpdateEpisodeMutationVariables>;
export const DeleteEpisodeDocument = gql`
    mutation DeleteEpisode($deleteEpisodeInput: DeleteEpisodeInput!) {
  deleteEpisode(deleteEpisodeInput: $deleteEpisodeInput) {
    success
    message
  }
}
    `;
export type DeleteEpisodeMutationFn = Apollo.MutationFunction<DeleteEpisodeMutation, DeleteEpisodeMutationVariables>;

/**
 * __useDeleteEpisodeMutation__
 *
 * To run a mutation, you first call `useDeleteEpisodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEpisodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEpisodeMutation, { data, loading, error }] = useDeleteEpisodeMutation({
 *   variables: {
 *      deleteEpisodeInput: // value for 'deleteEpisodeInput'
 *   },
 * });
 */
export function useDeleteEpisodeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEpisodeMutation, DeleteEpisodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEpisodeMutation, DeleteEpisodeMutationVariables>(DeleteEpisodeDocument, options);
      }
export type DeleteEpisodeMutationHookResult = ReturnType<typeof useDeleteEpisodeMutation>;
export type DeleteEpisodeMutationResult = Apollo.MutationResult<DeleteEpisodeMutation>;
export type DeleteEpisodeMutationOptions = Apollo.BaseMutationOptions<DeleteEpisodeMutation, DeleteEpisodeMutationVariables>;
export const FinishProcessingEpisodeDocument = gql`
    mutation FinishProcessingEpisode($finishProcessEpisodeInput: FinishProcessEpisodeInput!) {
  finishProcessingEpisode(finishProcessEpisodeInput: $finishProcessEpisodeInput) {
    id
    identifier
    artifact
  }
}
    `;
export type FinishProcessingEpisodeMutationFn = Apollo.MutationFunction<FinishProcessingEpisodeMutation, FinishProcessingEpisodeMutationVariables>;

/**
 * __useFinishProcessingEpisodeMutation__
 *
 * To run a mutation, you first call `useFinishProcessingEpisodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinishProcessingEpisodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finishProcessingEpisodeMutation, { data, loading, error }] = useFinishProcessingEpisodeMutation({
 *   variables: {
 *      finishProcessEpisodeInput: // value for 'finishProcessEpisodeInput'
 *   },
 * });
 */
export function useFinishProcessingEpisodeMutation(baseOptions?: Apollo.MutationHookOptions<FinishProcessingEpisodeMutation, FinishProcessingEpisodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FinishProcessingEpisodeMutation, FinishProcessingEpisodeMutationVariables>(FinishProcessingEpisodeDocument, options);
      }
export type FinishProcessingEpisodeMutationHookResult = ReturnType<typeof useFinishProcessingEpisodeMutation>;
export type FinishProcessingEpisodeMutationResult = Apollo.MutationResult<FinishProcessingEpisodeMutation>;
export type FinishProcessingEpisodeMutationOptions = Apollo.BaseMutationOptions<FinishProcessingEpisodeMutation, FinishProcessingEpisodeMutationVariables>;
export const GetProcessingPhasesDocument = gql`
    query GetProcessingPhases($variant: String) {
  processingPhases(variant: $variant) {
    id
    uploadsVideoId
    phase
    createdAt
    endedAt
    uploadsVideo {
      id
      ytId
      title
      channel {
        id
        title
        ytId
      }
    }
  }
}
    `;

/**
 * __useGetProcessingPhasesQuery__
 *
 * To run a query within a React component, call `useGetProcessingPhasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProcessingPhasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProcessingPhasesQuery({
 *   variables: {
 *      variant: // value for 'variant'
 *   },
 * });
 */
export function useGetProcessingPhasesQuery(baseOptions?: Apollo.QueryHookOptions<GetProcessingPhasesQuery, GetProcessingPhasesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProcessingPhasesQuery, GetProcessingPhasesQueryVariables>(GetProcessingPhasesDocument, options);
      }
export function useGetProcessingPhasesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProcessingPhasesQuery, GetProcessingPhasesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProcessingPhasesQuery, GetProcessingPhasesQueryVariables>(GetProcessingPhasesDocument, options);
        }
export function useGetProcessingPhasesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProcessingPhasesQuery, GetProcessingPhasesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProcessingPhasesQuery, GetProcessingPhasesQueryVariables>(GetProcessingPhasesDocument, options);
        }
export type GetProcessingPhasesQueryHookResult = ReturnType<typeof useGetProcessingPhasesQuery>;
export type GetProcessingPhasesLazyQueryHookResult = ReturnType<typeof useGetProcessingPhasesLazyQuery>;
export type GetProcessingPhasesSuspenseQueryHookResult = ReturnType<typeof useGetProcessingPhasesSuspenseQuery>;
export type GetProcessingPhasesQueryResult = Apollo.QueryResult<GetProcessingPhasesQuery, GetProcessingPhasesQueryVariables>;
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
    totalStoryboards
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
export const GetEpisodesWithThumbnailsDocument = gql`
    query GetEpisodesWithThumbnails($input: EpisodesWithThumbnailsInput!) {
  episodesWithThumbnails(input: $input) {
    tvIdentifier
    episodeIdentifier
  }
}
    `;

/**
 * __useGetEpisodesWithThumbnailsQuery__
 *
 * To run a query within a React component, call `useGetEpisodesWithThumbnailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEpisodesWithThumbnailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEpisodesWithThumbnailsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetEpisodesWithThumbnailsQuery(baseOptions: Apollo.QueryHookOptions<GetEpisodesWithThumbnailsQuery, GetEpisodesWithThumbnailsQueryVariables> & ({ variables: GetEpisodesWithThumbnailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEpisodesWithThumbnailsQuery, GetEpisodesWithThumbnailsQueryVariables>(GetEpisodesWithThumbnailsDocument, options);
      }
export function useGetEpisodesWithThumbnailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEpisodesWithThumbnailsQuery, GetEpisodesWithThumbnailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEpisodesWithThumbnailsQuery, GetEpisodesWithThumbnailsQueryVariables>(GetEpisodesWithThumbnailsDocument, options);
        }
export function useGetEpisodesWithThumbnailsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEpisodesWithThumbnailsQuery, GetEpisodesWithThumbnailsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEpisodesWithThumbnailsQuery, GetEpisodesWithThumbnailsQueryVariables>(GetEpisodesWithThumbnailsDocument, options);
        }
export type GetEpisodesWithThumbnailsQueryHookResult = ReturnType<typeof useGetEpisodesWithThumbnailsQuery>;
export type GetEpisodesWithThumbnailsLazyQueryHookResult = ReturnType<typeof useGetEpisodesWithThumbnailsLazyQuery>;
export type GetEpisodesWithThumbnailsSuspenseQueryHookResult = ReturnType<typeof useGetEpisodesWithThumbnailsSuspenseQuery>;
export type GetEpisodesWithThumbnailsQueryResult = Apollo.QueryResult<GetEpisodesWithThumbnailsQuery, GetEpisodesWithThumbnailsQueryVariables>;
export const GetThumbnailDocument = gql`
    query GetThumbnail($input: GetThumbnailInput!) {
  getThumbnail(input: $input) {
    createdAt
    id
    perRow
    updatedAt
    uploadsVideoId
    episodeId
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
    episode {
      identifier
      tv {
        identifier
      }
    }
  }
}
    `;

/**
 * __useGetThumbnailQuery__
 *
 * To run a query within a React component, call `useGetThumbnailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThumbnailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThumbnailQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetThumbnailQuery(baseOptions: Apollo.QueryHookOptions<GetThumbnailQuery, GetThumbnailQueryVariables> & ({ variables: GetThumbnailQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetThumbnailQuery, GetThumbnailQueryVariables>(GetThumbnailDocument, options);
      }
export function useGetThumbnailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetThumbnailQuery, GetThumbnailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetThumbnailQuery, GetThumbnailQueryVariables>(GetThumbnailDocument, options);
        }
export function useGetThumbnailSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetThumbnailQuery, GetThumbnailQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetThumbnailQuery, GetThumbnailQueryVariables>(GetThumbnailDocument, options);
        }
export type GetThumbnailQueryHookResult = ReturnType<typeof useGetThumbnailQuery>;
export type GetThumbnailLazyQueryHookResult = ReturnType<typeof useGetThumbnailLazyQuery>;
export type GetThumbnailSuspenseQueryHookResult = ReturnType<typeof useGetThumbnailSuspenseQuery>;
export type GetThumbnailQueryResult = Apollo.QueryResult<GetThumbnailQuery, GetThumbnailQueryVariables>;
export const GetAllTvsDocument = gql`
    query GetAllTvs {
  getAllTvs {
    id
    identifier
    title
    duration
    createdAt
    updatedAt
    amountOfEpisodes
  }
}
    `;

/**
 * __useGetAllTvsQuery__
 *
 * To run a query within a React component, call `useGetAllTvsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTvsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTvsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTvsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTvsQuery, GetAllTvsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTvsQuery, GetAllTvsQueryVariables>(GetAllTvsDocument, options);
      }
export function useGetAllTvsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTvsQuery, GetAllTvsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTvsQuery, GetAllTvsQueryVariables>(GetAllTvsDocument, options);
        }
export function useGetAllTvsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllTvsQuery, GetAllTvsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllTvsQuery, GetAllTvsQueryVariables>(GetAllTvsDocument, options);
        }
export type GetAllTvsQueryHookResult = ReturnType<typeof useGetAllTvsQuery>;
export type GetAllTvsLazyQueryHookResult = ReturnType<typeof useGetAllTvsLazyQuery>;
export type GetAllTvsSuspenseQueryHookResult = ReturnType<typeof useGetAllTvsSuspenseQuery>;
export type GetAllTvsQueryResult = Apollo.QueryResult<GetAllTvsQuery, GetAllTvsQueryVariables>;
export const GetTvDocument = gql`
    query GetTv($getTvInput: GetTvInput!) {
  getTv(getTvInput: $getTvInput) {
    id
    identifier
    title
    duration
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetTvQuery__
 *
 * To run a query within a React component, call `useGetTvQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTvQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTvQuery({
 *   variables: {
 *      getTvInput: // value for 'getTvInput'
 *   },
 * });
 */
export function useGetTvQuery(baseOptions: Apollo.QueryHookOptions<GetTvQuery, GetTvQueryVariables> & ({ variables: GetTvQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTvQuery, GetTvQueryVariables>(GetTvDocument, options);
      }
export function useGetTvLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTvQuery, GetTvQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTvQuery, GetTvQueryVariables>(GetTvDocument, options);
        }
export function useGetTvSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTvQuery, GetTvQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTvQuery, GetTvQueryVariables>(GetTvDocument, options);
        }
export type GetTvQueryHookResult = ReturnType<typeof useGetTvQuery>;
export type GetTvLazyQueryHookResult = ReturnType<typeof useGetTvLazyQuery>;
export type GetTvSuspenseQueryHookResult = ReturnType<typeof useGetTvSuspenseQuery>;
export type GetTvQueryResult = Apollo.QueryResult<GetTvQuery, GetTvQueryVariables>;
export const CreateTvDocument = gql`
    mutation CreateTv($createTvInput: CreateTvInput!) {
  createTv(createTvInput: $createTvInput) {
    tv {
      id
      identifier
      title
      duration
      createdAt
      updatedAt
    }
    message
  }
}
    `;
export type CreateTvMutationFn = Apollo.MutationFunction<CreateTvMutation, CreateTvMutationVariables>;

/**
 * __useCreateTvMutation__
 *
 * To run a mutation, you first call `useCreateTvMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTvMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTvMutation, { data, loading, error }] = useCreateTvMutation({
 *   variables: {
 *      createTvInput: // value for 'createTvInput'
 *   },
 * });
 */
export function useCreateTvMutation(baseOptions?: Apollo.MutationHookOptions<CreateTvMutation, CreateTvMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTvMutation, CreateTvMutationVariables>(CreateTvDocument, options);
      }
export type CreateTvMutationHookResult = ReturnType<typeof useCreateTvMutation>;
export type CreateTvMutationResult = Apollo.MutationResult<CreateTvMutation>;
export type CreateTvMutationOptions = Apollo.BaseMutationOptions<CreateTvMutation, CreateTvMutationVariables>;
export const UpdateTvDocument = gql`
    mutation UpdateTv($id: Float!, $updateTvInput: UpdateTvInput!) {
  updateTv(id: $id, updateTvInput: $updateTvInput) {
    tv {
      id
      identifier
      title
      duration
      createdAt
      updatedAt
    }
    message
  }
}
    `;
export type UpdateTvMutationFn = Apollo.MutationFunction<UpdateTvMutation, UpdateTvMutationVariables>;

/**
 * __useUpdateTvMutation__
 *
 * To run a mutation, you first call `useUpdateTvMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTvMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTvMutation, { data, loading, error }] = useUpdateTvMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateTvInput: // value for 'updateTvInput'
 *   },
 * });
 */
export function useUpdateTvMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTvMutation, UpdateTvMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTvMutation, UpdateTvMutationVariables>(UpdateTvDocument, options);
      }
export type UpdateTvMutationHookResult = ReturnType<typeof useUpdateTvMutation>;
export type UpdateTvMutationResult = Apollo.MutationResult<UpdateTvMutation>;
export type UpdateTvMutationOptions = Apollo.BaseMutationOptions<UpdateTvMutation, UpdateTvMutationVariables>;
export const DeleteTvDocument = gql`
    mutation DeleteTv($deleteTvInput: DeleteTvInput!) {
  deleteTv(deleteTvInput: $deleteTvInput) {
    success
    message
  }
}
    `;
export type DeleteTvMutationFn = Apollo.MutationFunction<DeleteTvMutation, DeleteTvMutationVariables>;

/**
 * __useDeleteTvMutation__
 *
 * To run a mutation, you first call `useDeleteTvMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTvMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTvMutation, { data, loading, error }] = useDeleteTvMutation({
 *   variables: {
 *      deleteTvInput: // value for 'deleteTvInput'
 *   },
 * });
 */
export function useDeleteTvMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTvMutation, DeleteTvMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTvMutation, DeleteTvMutationVariables>(DeleteTvDocument, options);
      }
export type DeleteTvMutationHookResult = ReturnType<typeof useDeleteTvMutation>;
export type DeleteTvMutationResult = Apollo.MutationResult<DeleteTvMutation>;
export type DeleteTvMutationOptions = Apollo.BaseMutationOptions<DeleteTvMutation, DeleteTvMutationVariables>;
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
    title
    ytId
    storyboard {
      fragments
      url
    }
    channel {
      id
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
    ytId
    title
    publishedAt
    src
    channelId
    channelTitle
    ytChannelId
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
    channelId
    videoId
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
    mutation DeleteUploads($deleteUploadsInput: DeleteUploadsInput!) {
  deleteUploads(deleteUploadsInput: $deleteUploadsInput) {
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
 *      deleteUploadsInput: // value for 'deleteUploadsInput'
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
export const GetVideoByYtIdDocument = gql`
    query GetVideoByYtId($getVideoByYtIdInput: GetVideoByYtIdInput!) {
  getVideoByYtId(getVideoByYtIdInput: $getVideoByYtIdInput) {
    id
    createdAt
    updatedAt
    publishedAt
    title
    ytId
    src
    artifact
    channelTitle
    filesWithSize {
      name
      sizeMB
    }
    directoriesWithSize {
      name
      sizeMB
    }
    totalSizeMB
    screenshots
  }
}
    `;

/**
 * __useGetVideoByYtIdQuery__
 *
 * To run a query within a React component, call `useGetVideoByYtIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoByYtIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoByYtIdQuery({
 *   variables: {
 *      getVideoByYtIdInput: // value for 'getVideoByYtIdInput'
 *   },
 * });
 */
export function useGetVideoByYtIdQuery(baseOptions: Apollo.QueryHookOptions<GetVideoByYtIdQuery, GetVideoByYtIdQueryVariables> & ({ variables: GetVideoByYtIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoByYtIdQuery, GetVideoByYtIdQueryVariables>(GetVideoByYtIdDocument, options);
      }
export function useGetVideoByYtIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoByYtIdQuery, GetVideoByYtIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoByYtIdQuery, GetVideoByYtIdQueryVariables>(GetVideoByYtIdDocument, options);
        }
export function useGetVideoByYtIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetVideoByYtIdQuery, GetVideoByYtIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetVideoByYtIdQuery, GetVideoByYtIdQueryVariables>(GetVideoByYtIdDocument, options);
        }
export type GetVideoByYtIdQueryHookResult = ReturnType<typeof useGetVideoByYtIdQuery>;
export type GetVideoByYtIdLazyQueryHookResult = ReturnType<typeof useGetVideoByYtIdLazyQuery>;
export type GetVideoByYtIdSuspenseQueryHookResult = ReturnType<typeof useGetVideoByYtIdSuspenseQuery>;
export type GetVideoByYtIdQueryResult = Apollo.QueryResult<GetVideoByYtIdQuery, GetVideoByYtIdQueryVariables>;
export const DeleteFileOrDirectoryDocument = gql`
    mutation DeleteFileOrDirectory($deleteFileInput: DeleteFileDto!) {
  deleteFileOrDirectory(deleteFileInput: $deleteFileInput) {
    success
    message
  }
}
    `;
export type DeleteFileOrDirectoryMutationFn = Apollo.MutationFunction<DeleteFileOrDirectoryMutation, DeleteFileOrDirectoryMutationVariables>;

/**
 * __useDeleteFileOrDirectoryMutation__
 *
 * To run a mutation, you first call `useDeleteFileOrDirectoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFileOrDirectoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFileOrDirectoryMutation, { data, loading, error }] = useDeleteFileOrDirectoryMutation({
 *   variables: {
 *      deleteFileInput: // value for 'deleteFileInput'
 *   },
 * });
 */
export function useDeleteFileOrDirectoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFileOrDirectoryMutation, DeleteFileOrDirectoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFileOrDirectoryMutation, DeleteFileOrDirectoryMutationVariables>(DeleteFileOrDirectoryDocument, options);
      }
export type DeleteFileOrDirectoryMutationHookResult = ReturnType<typeof useDeleteFileOrDirectoryMutation>;
export type DeleteFileOrDirectoryMutationResult = Apollo.MutationResult<DeleteFileOrDirectoryMutation>;
export type DeleteFileOrDirectoryMutationOptions = Apollo.BaseMutationOptions<DeleteFileOrDirectoryMutation, DeleteFileOrDirectoryMutationVariables>;