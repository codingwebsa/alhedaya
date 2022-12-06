// next
import Head from "next/head";
// react multi carousel
import Carousel from "../components/Carousel";
// components
import HomeCategory from "../components/HomeCategory";
import Navbar from "../components/Navbar";
import SearchComponent from "../components/SearchComponent";
// apollo
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Booksec from "../components/Booksec";

export default function Home({ books }) {
  return (
    <>
      <Head>
        <title>আল হেদায়া</title>
      </Head>
      <Navbar />
      <SearchComponent />
      <Carousel />
      <HomeCategory />
      <Booksec title="Recent" data={books} />
    </>
  );
}

export async function getServerSideProps() {
  const client = new ApolloClient({
    uri: "http://alhidaya.local/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query Books {
        posts {
          edges {
            node {
              id
              title
              featuredImage {
                node {
                  sourceUrl
                }
              }
              acf {
                discountPrice
                price
                author {
                  ... on Page {
                    id
                    title
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      books: data.posts.edges,
    },
  };
}
