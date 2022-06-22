import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4oqbvho0tq401xkekoq68xt/master',
  cache: new InMemoryCache()
})