// react
import { useContext, useEffect } from "react";
// next
import Head from "next/head";
// react multi carousel
import Carousel from "../components/Carousel";
// components
import { HomeCategory, SearchComponent, Booksec, Layout } from "../components";
// apollo
import { gql } from "@apollo/client";
// client
import Client from "../apolloClient";

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
  const GET_BOOKS_QUERY = gql`
    query Books {
      posts(first: 10) {
        nodes {
          id
          title
          featuredImage {
            node {
              sourceUrl
            }
          }
          acf {
            imgurl
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
  `;
  const { data } = await Client.query({
    query: GET_BOOKS_QUERY,
  });
  const homeCategoryData = await Client.query({
    query: gql`
      query HomeCategories {
        categories(first: 4) {
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
      books: data.posts.nodes,
      homeCategoryData: homeCategoryData.data.categories.edges,
    },
  };
}
