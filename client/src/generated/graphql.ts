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

export type CreateChannelInput = {
  ytVideoId: Scalars['String']['input'];
};

export type CreateChannelResponse = {
  __typename?: 'CreateChannelResponse';
  message: ChannelMessage;
  ytChannelId?: Maybe<Scalars['String']['output']>;
};

export type CreateTodoInput = {
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
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

export type FetchDashboardInput = {
  defaultMax?: InputMaybe<Scalars['Float']['input']>;
  defaultMin?: InputMaybe<Scalars['Float']['input']>;
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
  page: Scalars['Float']['input'];
  sortOrder: Scalars['String']['input'];
  viewType?: InputMaybe<ViewType>;
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
  createChannel: CreateChannelResponse;
  createTodo: Todo;
  deleteChannel: DeleteChannelResponse;
  removeTodo: Scalars['Boolean']['output'];
  updateTodo: Todo;
};


export type MutationCreateChannelArgs = {
  createChannelInput: CreateChannelInput;
};


export type MutationCreateTodoArgs = {
  createTodoInput: CreateTodoInput;
};


export type MutationDeleteChannelArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRemoveTodoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateTodoArgs = {
  id: Scalars['ID']['input'];
  updateTodoInput: UpdateTodoInput;
};

export type PlaylistInfo = {
  __typename?: 'PlaylistInfo';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  channelForPlaylist: ChannelForPlaylistResponse;
  channelMetadata: ChannelMetadataResponse;
  channelScreenshots: Array<GetSlidesResponse>;
  fetchDashboard: ChannelsDashboardResponse;
  fetchVideosDashboard: VideosDashboardResponse;
  getSlides: Array<GetSlidesResponse>;
  screenshots: Array<ScreenshotsCountsResponse>;
  screenshotsByVideo: Array<VideoScreenshotResponse>;
  statisticsCounts: StatisticsCountsResponse;
  thumbnailByVideoId?: Maybe<ThumbnailByVideoIdResponse>;
  todo: Todo;
  todos: Array<Todo>;
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


export type QueryScreenshotsByVideoArgs = {
  ytVideoId: Scalars['String']['input'];
};


export type QueryThumbnailByVideoIdArgs = {
  ytVideoId: Scalars['String']['input'];
};


export type QueryTodoArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUploadsWithThumbnailsArgs = {
  input: UploadsWithThumbnailsInput;
};

export type ScreenshotsCountsResponse = {
  __typename?: 'ScreenshotsCountsResponse';
  count: Scalars['Float']['output'];
  month: Scalars['String']['output'];
};

export type StatisticsCountsResponse = {
  __typename?: 'StatisticsCountsResponse';
  totalSaved: Scalars['Float']['output'];
  totalScreenshots: Scalars['Float']['output'];
  totalThumbnails: Scalars['Float']['output'];
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

export type Todo = {
  __typename?: 'Todo';
  completed: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateTodoInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UploadsVideoResponse = {
  __typename?: 'UploadsVideoResponse';
  channel: ChannelResponse;
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

export type GetTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTodosQuery = { __typename?: 'Query', todos: Array<{ __typename?: 'Todo', id: string, title: string, completed: boolean }> };

export type CreateChannelMutationVariables = Exact<{
  createChannelInput: CreateChannelInput;
}>;


export type CreateChannelMutation = { __typename?: 'Mutation', createChannel: { __typename?: 'CreateChannelResponse', message: ChannelMessage, ytChannelId?: string | null } };

export type DeleteChannelMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeleteChannelMutation = { __typename?: 'Mutation', deleteChannel: { __typename?: 'DeleteChannelResponse', success: boolean, message: string } };

export type UploadsWithThumbnailsQueryVariables = Exact<{
  input: UploadsWithThumbnailsInput;
}>;


export type UploadsWithThumbnailsQuery = { __typename?: 'Query', uploadsWithThumbnails: Array<{ __typename?: 'UploadsWithThumbnailsResponse', ytChannelId: string, ytVideoId: string }> };

export type GetSlidesQueryVariables = Exact<{
  input: GetSlidesInput;
}>;


export type GetSlidesQuery = { __typename?: 'Query', getSlides: Array<{ __typename?: 'GetSlidesResponse', ytVideoId: string, id: number, second: number, src: string, isFav?: boolean | null }> };

export type GetChannelForPlaylistQueryVariables = Exact<{
  ytChannelId: Scalars['String']['input'];
}>;


export type GetChannelForPlaylistQuery = { __typename?: 'Query', channelForPlaylist: { __typename?: 'ChannelForPlaylistResponse', id: number, title: string } };

export type GetChannelMetadataQueryVariables = Exact<{
  ytChannelId: Scalars['String']['input'];
}>;


export type GetChannelMetadataQuery = { __typename?: 'Query', channelMetadata: { __typename?: 'ChannelMetadataResponse', id: number, title: string, fetchedUntilEnd: boolean, videoCount: number, lastSyncedAt?: string | null, videoArtifactsCount: number, savedArtifactsCount: number, thumbnailArtifactsCount: number, screenshotArtifactsCount: number, storyboardArtifactsCount: number, playlist?: { __typename?: 'PlaylistInfo', id: number, name: string } | null } };

export type FetchDashboardQueryVariables = Exact<{
  fetchDashboardInput: FetchDashboardInput;
}>;


export type FetchDashboardQuery = { __typename?: 'Query', fetchDashboard: { __typename?: 'ChannelsDashboardResponse', total: number, channels: Array<{ __typename?: 'DashboardChannelResponse', id: number, createdAt: any, title: string, ytId: string, src: string, lastSyncedAt?: any | null, videoCount: number, thumbnails: number, saved: number, defaults: number, storyboard: number, screenshotsCount: number, playlist?: { __typename?: 'DashboardPlaylistResponse', id: number, name: string } | null }> } };

export type FetchVideosDashboardQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
  screenshotMin?: InputMaybe<Scalars['Float']['input']>;
  screenshotMax?: InputMaybe<Scalars['Float']['input']>;
}>;


export type FetchVideosDashboardQuery = { __typename?: 'Query', fetchVideosDashboard: { __typename?: 'VideosDashboardResponse', total: number, videos: Array<{ __typename?: 'DashboardVideoResponse', id: number, ytId: string, title: string, src: string, channelId: number, channelTitle: string, channelYtId: string, screenshotCount: number }> } };

export type GetScreenshotsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetScreenshotsQuery = { __typename?: 'Query', screenshots: Array<{ __typename?: 'ScreenshotsCountsResponse', month: string, count: number }> };

export type GetScreenshotsByVideoQueryVariables = Exact<{
  ytVideoId: Scalars['String']['input'];
}>;


export type GetScreenshotsByVideoQuery = { __typename?: 'Query', screenshotsByVideo: Array<{ __typename?: 'VideoScreenshotResponse', id: number, second: number, ytChannelId: string, ytVideoId: string, isFav?: boolean | null, src: string }> };

export type GetStatisticsCountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStatisticsCountsQuery = { __typename?: 'Query', statisticsCounts: { __typename?: 'StatisticsCountsResponse', totalScreenshots: number, totalThumbnails: number, totalSaved: number } };

export type GetThumbnailByVideoIdQueryVariables = Exact<{
  ytVideoId: Scalars['String']['input'];
}>;


export type GetThumbnailByVideoIdQuery = { __typename?: 'Query', thumbnailByVideoId?: { __typename?: 'ThumbnailByVideoIdResponse', createdAt: string, id: number, perRow: number, updatedAt: string, uploadsVideoId: number, totalSeconds: number, thumbnailsCount: number, uploadsVideo: { __typename?: 'UploadsVideoResponse', ytId: string, channel: { __typename?: 'ChannelResponse', id: number, ytId: string, title: string } } } | null };

export type GetChannelScreenshotsQueryVariables = Exact<{
  ytChannelId: Scalars['String']['input'];
}>;


export type GetChannelScreenshotsQuery = { __typename?: 'Query', channelScreenshots: Array<{ __typename?: 'GetSlidesResponse', ytVideoId: string, id: number, second: number, src: string, isFav?: boolean | null }> };


export const GetTodosDocument = gql`
    query GetTodos {
  todos {
    id
    title
    completed
  }
}
    `;

/**
 * __useGetTodosQuery__
 *
 * To run a query within a React component, call `useGetTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTodosQuery(baseOptions?: Apollo.QueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, options);
      }
export function useGetTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, options);
        }
export function useGetTodosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, options);
        }
export type GetTodosQueryHookResult = ReturnType<typeof useGetTodosQuery>;
export type GetTodosLazyQueryHookResult = ReturnType<typeof useGetTodosLazyQuery>;
export type GetTodosSuspenseQueryHookResult = ReturnType<typeof useGetTodosSuspenseQuery>;
export type GetTodosQueryResult = Apollo.QueryResult<GetTodosQuery, GetTodosQueryVariables>;
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
export const UploadsWithThumbnailsDocument = gql`
    query UploadsWithThumbnails($input: UploadsWithThumbnailsInput!) {
  uploadsWithThumbnails(input: $input) {
    ytChannelId
    ytVideoId
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
export const GetSlidesDocument = gql`
    query GetSlides($input: GetSlidesInput!) {
  getSlides(input: $input) {
    ytVideoId
    id
    second
    src
    isFav
  }
}
    `;

/**
 * __useGetSlidesQuery__
 *
 * To run a query within a React component, call `useGetSlidesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSlidesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSlidesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetSlidesQuery(baseOptions: Apollo.QueryHookOptions<GetSlidesQuery, GetSlidesQueryVariables> & ({ variables: GetSlidesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSlidesQuery, GetSlidesQueryVariables>(GetSlidesDocument, options);
      }
export function useGetSlidesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSlidesQuery, GetSlidesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSlidesQuery, GetSlidesQueryVariables>(GetSlidesDocument, options);
        }
export function useGetSlidesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSlidesQuery, GetSlidesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSlidesQuery, GetSlidesQueryVariables>(GetSlidesDocument, options);
        }
export type GetSlidesQueryHookResult = ReturnType<typeof useGetSlidesQuery>;
export type GetSlidesLazyQueryHookResult = ReturnType<typeof useGetSlidesLazyQuery>;
export type GetSlidesSuspenseQueryHookResult = ReturnType<typeof useGetSlidesSuspenseQuery>;
export type GetSlidesQueryResult = Apollo.QueryResult<GetSlidesQuery, GetSlidesQueryVariables>;
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
export const GetScreenshotsDocument = gql`
    query GetScreenshots {
  screenshots {
    month
    count
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
 *   },
 * });
 */
export function useGetScreenshotsQuery(baseOptions?: Apollo.QueryHookOptions<GetScreenshotsQuery, GetScreenshotsQueryVariables>) {
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
export const GetScreenshotsByVideoDocument = gql`
    query GetScreenshotsByVideo($ytVideoId: String!) {
  screenshotsByVideo(ytVideoId: $ytVideoId) {
    id
    second
    ytChannelId
    ytVideoId
    isFav
    src
  }
}
    `;

/**
 * __useGetScreenshotsByVideoQuery__
 *
 * To run a query within a React component, call `useGetScreenshotsByVideoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScreenshotsByVideoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScreenshotsByVideoQuery({
 *   variables: {
 *      ytVideoId: // value for 'ytVideoId'
 *   },
 * });
 */
export function useGetScreenshotsByVideoQuery(baseOptions: Apollo.QueryHookOptions<GetScreenshotsByVideoQuery, GetScreenshotsByVideoQueryVariables> & ({ variables: GetScreenshotsByVideoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetScreenshotsByVideoQuery, GetScreenshotsByVideoQueryVariables>(GetScreenshotsByVideoDocument, options);
      }
export function useGetScreenshotsByVideoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetScreenshotsByVideoQuery, GetScreenshotsByVideoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetScreenshotsByVideoQuery, GetScreenshotsByVideoQueryVariables>(GetScreenshotsByVideoDocument, options);
        }
export function useGetScreenshotsByVideoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetScreenshotsByVideoQuery, GetScreenshotsByVideoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetScreenshotsByVideoQuery, GetScreenshotsByVideoQueryVariables>(GetScreenshotsByVideoDocument, options);
        }
export type GetScreenshotsByVideoQueryHookResult = ReturnType<typeof useGetScreenshotsByVideoQuery>;
export type GetScreenshotsByVideoLazyQueryHookResult = ReturnType<typeof useGetScreenshotsByVideoLazyQuery>;
export type GetScreenshotsByVideoSuspenseQueryHookResult = ReturnType<typeof useGetScreenshotsByVideoSuspenseQuery>;
export type GetScreenshotsByVideoQueryResult = Apollo.QueryResult<GetScreenshotsByVideoQuery, GetScreenshotsByVideoQueryVariables>;
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
export const GetChannelScreenshotsDocument = gql`
    query GetChannelScreenshots($ytChannelId: String!) {
  channelScreenshots(ytChannelId: $ytChannelId) {
    ytVideoId
    id
    second
    src
    isFav
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
 *      ytChannelId: // value for 'ytChannelId'
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