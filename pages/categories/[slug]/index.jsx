// nextjs
import Head from "next/head";
// apollo
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
// components
import { SearchComponent, Header, Booksec } from "../../../components";
// data
import { data as categoryData } from "../../../data/categoryData";
import { data as booksData } from "../../../data/booksData";
// fuse
import Fuse from "fuse.js";

const CategorySingle = ({ title, data }) => {
  return (
    <>
      <Head>
        <title>{`Category: ${title}`}</title>
      </Head>
      <SearchComponent />
      <Header />
      <Booksec title={`Category: ${title}`} data={data} />
    </>
  );
};

export default CategorySingle;

export const getStaticPaths = async () => {
  return {
    paths: categoryData.map((data) => ({
      params: { slug: data.node.id },
    })),
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const { slug } = params;

  const modifiedData = [];
  let categoryName = "";

  // const client = new ApolloClient({
  //   uri: process.env.WORDPRESS_ENDPOINT,
  //   cache: new InMemoryCache(),
  // });

  // const { data } = await client.query({
  //   query: gql`
  //     query Categories($slug: ID!) {
  //       category(id: $slug) {
  //         name
  //         posts {
  //           nodes {
  //             id
  //             title
  //             acf {
  //               imgurl
  //               discountPrice
  //               price
  //               author {
  //                 ... on Page {
  //                   id
  //                   title
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `,
  //   variables: { slug },
  // });
  const fuse = new Fuse(booksData, {
    keys: ["categories.nodes.id"],
  });
  // get fuse Data
  const fuseData = fuse.search(slug);
  // loop to modify data
  fuseData.forEach((fuseD) => {
    fuseD.item.categories.nodes.forEach((category) => {
      if (category.id == slug) {
        modifiedData.push(booksData[fuseD.refIndex]);
        categoryName = category.title || category.name;
      }
    });
  });
  return {
    props: {
      data: modifiedData,
      title: categoryName,
    },
  };
}
