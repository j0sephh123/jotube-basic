import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@app/providers/api/apolloClient";

export default function GQLProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
