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
import { NextSeo } from "next-seo";

export default function Home() {
  const recentBooksData = booksData.slice(0, 8);
  const recentCategoryData = categoryData.slice(0, 4);
  return (
    <>
      <Head>
        <NextSeo
          title="আল হেদায়া"
          description="salahat.com is the largest online bookstore in Bangladesh. Buy Novel, Story, Islamic, Computer Programming, Children, West Bengal, Fiction, Non fiction, Medical, Engineering, Gift cards & Text books from the biggest selection of Bangla books at lowest price. Cash on delivery, Happy return policy & Free shipping offer available. Shop Now!"
          canonical="https://www.canonical.ie/"
          openGraph={{
            url: "https://alhedaya.vercel.app/",
            title: `আল হেদায়া`,
            description:
              "salahat.com is the largest online bookstore in Bangladesh. Buy Novel, Story, Islamic, Computer Programming, Children, West Bengal, Fiction, Non fiction, Medical, Engineering, Gift cards & Text books from the biggest selection of Bangla books at lowest price. Cash on delivery, Happy return policy & Free shipping offer available. Shop Now!",
            images: [
              {
                url: "/apple-touch-icon.png",
                alt: `আল হেদায়া`,
              },
            ],
            siteName: "আল হেদায়া",
          }}
        />
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
