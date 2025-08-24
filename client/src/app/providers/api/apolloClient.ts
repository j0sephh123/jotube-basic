// apolloClient.ts
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_VIDEO_SERVICE_URL}/graphql`,
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // One cache entry per distinct argument set
        uploadsList: {
          // The input object itself scopes the field; no pagination yet.
          keyArgs: ["uploadsListInput"],
          merge(existing, incoming) {
            // For the SAME args, just replace.
            return incoming ?? existing ?? null;
          },
        },
      },
    },

    /**
     * CRUCIAL: Do NOT normalize the response wrapper for uploadsList.
     * Otherwise, both "default" and "saved" can reference the same entity
     * (same __typename + id) and stomp each other.
     *
     * Use the actual __typename from your schema/codegen.
     * You said you have only `UploadsListResponse`, so we disable normalization for it.
     */
    UploadsListResponse: { keyFields: false },

    // If your schema ever returns a differently named wrapper, leave this as a safety net.
    // DefaultUploadsResponse: { keyFields: false },

    /**
     * Normalize individual items by a stable PK.
     * Your client code filters by `u.ytId`, so we use that if present; fallback to `id`.
     */
    Upload: {
      keyFields: (obj: any) => obj.ytId ?? obj.id ?? null,
    },

    // If channels/entities appear inside the payload, keep their identities stable.
    Channel: { keyFields: ["id"] },
  },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-first",
      nextFetchPolicy: "cache-first",
      notifyOnNetworkStatusChange: true,
      returnPartialData: false,
    },
    query: { fetchPolicy: "cache-first" },
  },
});
