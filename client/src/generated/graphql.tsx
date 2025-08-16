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
  fetchDashboard: ChannelsDashboardResponse;
  fetchVideosDashboard: VideosDashboardResponse;
  todo: Todo;
  todos: Array<Todo>;
};


export type QueryChannelForPlaylistArgs = {
  ytChannelId: Scalars['String']['input'];
};


export type QueryChannelMetadataArgs = {
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


export type QueryTodoArgs = {
  id: Scalars['ID']['input'];
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