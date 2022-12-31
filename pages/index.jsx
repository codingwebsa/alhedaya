// react
import { useContext, useEffect } from "react";
// next
import Head from "next/head";
// react multi carousel
import Carousel from "../components/Carousel";
// components
import {
  HomeCategory,
  SearchComponent,
  Booksec,
  Layout,
  RecentOrder,
} from "../components";
// data
import { data as booksData } from "../data/booksData";
import { data as categoryData } from "../data/categoryData";

export default function Home() {
  const recentBooksData = booksData.slice(0, 8);
  const recentCategoryData = categoryData.slice(0, 4);
  return (
    <>
      <Head>
        <title>আল হেদায়া</title>
      </Head>
      <Layout>
        <SearchComponent />
        <Carousel />
        <RecentOrder />
        <HomeCategory data={recentCategoryData} />
        <Booksec title="Recent Books" data={recentBooksData} />
      </Layout>
    </>
  );
}

// export async function getStaticProps() {
//   const GET_BOOKS_QUERY = gql`
//     query Books {
//       posts(first: 10) {
//         nodes {
//           id
//           title
//           featuredImage {
//             node {
//               sourceUrl
//             }
//           }
//           acf {
//             imgurl
//             discountPrice
//             price
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
//   `;
//   const GET_HOME_CATEGORY_QUERY = gql`
//     query HomeCategories {
//       categories(first: 4) {
//         edges {
//           node {
//             id
//             name
//           }
//         }
//       }
//     }
//   `;
//   const { data } = await Client.query({
//     query: GET_BOOKS_QUERY,
//   });
//   const homeCategoryData = await Client.query({
//     query: GET_HOME_CATEGORY_QUERY,
//   });

//   return {
//     props: {
//       books: data.posts.nodes,
//       homeCategoryData: homeCategoryData.data.categories.edges,
//     },
//   };
// }
