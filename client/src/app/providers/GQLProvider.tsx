import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./api";

export default function GQLProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
