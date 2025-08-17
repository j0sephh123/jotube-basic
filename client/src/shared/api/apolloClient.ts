import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { API_BASE_URL } from "../utils/globals";

const httpLink = createHttpLink({
  uri: `${API_BASE_URL}/graphql`,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
