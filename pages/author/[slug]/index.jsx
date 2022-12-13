// nextjs
import Head from "next/head";
// apollo
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
// components
import { Booksec, Layout, SearchComponent } from "../../../components";
// fuse
import Fuse from "fuse.js";

const AuthorSingle = ({ data, authorName }) => {
  return (
    <>
      <Head>
        <title>লেখক: {authorName}</title>
      </Head>
      <Layout>
        <SearchComponent />
        <Booksec data={data} title={`লেখক: ${authorName}`} />
      </Layout>
    </>
  );
};

export default AuthorSingle;

export const getStaticPaths = async () => {
  const client = new ApolloClient({
    uri: "http://sa.local/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query SingleAuthorPaths {
        pages {
          edges {
            node {
              id
            }
          }
        }
      }
    `,
  });
  // books.data.posts.edges
  return {
    paths: data.pages.edges.map((edge) => ({
      params: { slug: edge.node.id },
    })),
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const { slug } = params;
  const modifiedData = [];
  let authorName;

  const client = new ApolloClient({
    uri: process.env.WORDPRESS_ENDPOINT,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query AllAuthorDetails {
        posts {
          edges {
            node {
              title
              excerpt
              categories {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
              featuredImage {
                node {
                  sourceUrl
                }
              }
              acf {
                discountPrice
                price
                description
                publication
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

  const fuse = new Fuse(data.posts.edges, {
    keys: ["node.acf.author.id"],
  });

  const fuseData = fuse.search(slug);
  // loop
  fuseData.forEach((fuseD) => {
    fuseD.item.node.acf.author.forEach((a) => {
      if (a.id == slug) {
        modifiedData.push(data.posts.edges[fuseD.refIndex]);
        authorName = a.title;
      }
    });
  });

  return {
    props: {
      data: modifiedData,
      authorName: authorName,
    },
  };
}
