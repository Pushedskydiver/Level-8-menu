import type { DocumentNode } from "@apollo/client/core";
import type { ApolloQueryResult } from "@apollo/client/core/types";

import {
  ApolloClient,
  // gql,
  HttpLink,
  InMemoryCache,
} from "@apollo/client/core";
// import { createFragmentRegistry } from "@apollo/client/cache";

const initialGraphQlHeaders: Record<string, string> = {
  Authorization: `Bearer ${process.env.DATO_API_TOKEN}`,
  "Content-Type": "application/json",
  Accept: "application/json",
};

if (process.env.DATO_ENVIRONMENT) {
  initialGraphQlHeaders["X-Environment"] = process.env.DATO_ENVIRONMENT;
}

const datoGraphqlClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://graphql.datocms.com/",
    headers: initialGraphQlHeaders,
  }),
  cache: new InMemoryCache(),
});

export const datoGraphqlQuery = async (
  query: DocumentNode,
  includeDrafts?: boolean,
  environment?: string
): Promise<ApolloQueryResult<unknown>> => {
  const headers: Record<string, string> = {};

  if (includeDrafts) headers["X-Include-Drafts"] = "true";
  if (environment) headers["X-Environment"] = environment;

  return await datoGraphqlClient.query({
    query,
    context: {
      headers,
    },
    fetchPolicy: "network-only",
  });
};
