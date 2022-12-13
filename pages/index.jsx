// next
import Head from "next/head";
// react multi carousel
import Carousel from "../components/Carousel";
// components
import { HomeCategory, SearchComponent, Booksec, Layout } from "../components";
// apollo
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function Home({ books, homeCategoryData }) {
  return (
    <>
      <Head>
        <title>আল হেদায়া</title>
      </Head>
      <Layout>
        <SearchComponent />
        <Carousel />
        <HomeCategory data={homeCategoryData} />
        <Booksec title="Recent Books" data={books} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: process.env.WORDPRESS_ENDPOINT,
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
  const homeCategoryData = await client.query({
    query: gql`
      query HomeCategories {
        categories(last: 4) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      books: data.posts.edges,
      homeCategoryData: homeCategoryData.data.categories.edges,
    },
  };
}
