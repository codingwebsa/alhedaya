// nextjs
import Head from "next/head";
// apollo
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
// components
import { Booksec, Layout, SearchComponent } from "../../../components";
// fuse
import Fuse from "fuse.js";

const AuthorSingle = ({ data, authorName }) => {
  console.log(data);
  console.log(authorName);
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
  //
  const modifiedData = [];
  let authorName = "";

  const client = new ApolloClient({
    uri: process.env.WORDPRESS_ENDPOINT,
    cache: new InMemoryCache(),
  });
  // apollo data
  const { data } = await client.query({
    query: gql`
      query AllAuthorDetails {
        posts(first: 10000) {
          nodes {
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
              imgurl
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
    `,
  });
  // init fuse
  const fuse = new Fuse(data.posts.nodes, {
    keys: ["acf.author.id"],
  });
  // get fuse Data
  const fuseData = fuse.search(slug);
  // loop to modify data
  fuseData.forEach((fuseD) => {
    fuseD.item.acf.author.forEach((a) => {
      if (a.id == slug) {
        modifiedData.push(data.posts.nodes[fuseD.refIndex]);
        authorName = a.title || a.name;
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
