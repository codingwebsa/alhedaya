// nextjs
import Head from "next/head";
// apollo
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
// components
import { Booksec, Layout, SearchComponent } from "../../../components";
// fuse
import Fuse from "fuse.js";
// data
import { data as booksData } from "../../../data/booksData";
import { data as authorsData } from "../../../data/authorsData";

const AuthorSingle = ({ data, authorName }) => {
  booksData.filter((book) => {});
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
  // books.data.posts.edges
  return {
    paths: authorsData.map((author) => ({
      params: { slug: author.node.id },
    })),
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const { slug } = params;
  //
  const modifiedData = [];
  let authorName = "";

  // const client = new ApolloClient({
  //   uri: process.env.WORDPRESS_ENDPOINT,
  //   cache: new InMemoryCache(),
  // });
  // // apollo data
  // const { data } = await client.query({
  //   query: gql`
  //     query AllAuthorDetails {
  //       posts(first: 10000) {
  //         nodes {
  //           title
  //           excerpt
  //           categories {
  //             edges {
  //               node {
  //                 id
  //                 name
  //               }
  //             }
  //           }
  //           featuredImage {
  //             node {
  //               sourceUrl
  //             }
  //           }
  //           acf {
  //             imgurl
  //             discountPrice
  //             price
  //             description
  //             publication
  //             author {
  //               ... on Page {
  //                 id
  //                 title
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `,
  // });

  // init fuse
  const fuse = new Fuse(booksData, {
    keys: ["acf.author.id"],
  });
  // get fuse Data
  const fuseData = fuse.search(slug);
  // loop to modify data
  fuseData.forEach((fuseD) => {
    fuseD.item.acf.author.forEach((a) => {
      if (a.id == slug) {
        modifiedData.push(booksData[fuseD.refIndex]);
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
