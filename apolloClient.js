import { ApolloClient, InMemoryCache } from "@apollo/client";

const Client = new ApolloClient({
  //   uri: process.env.WORDPRESS_ENDPOINT,
  uri: "http://sa.local/graphql",
  cache: new InMemoryCache(),
});

export default Client;
