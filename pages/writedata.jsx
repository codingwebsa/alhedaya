import { gql } from "@apollo/client";
import Client from "../apolloClient";
import { writeData } from "../lib/writeData";

const Writedata = (data = "") => {
  return <div>{JSON.stringify(data)}</div>;
};

export default Writedata;

// export async function getStaticProps() {
//   // books data
//   const GET_BOOKS_QUERY = gql`
//     query BookDetails {
//       posts(first: 10000) {
//         nodes {
//           id
//           title
//           categories {
//             nodes {
//               id
//               name
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
//   `;
//   const _booksData = await Client.query({
//     query: GET_BOOKS_QUERY,
//   });
//   // category data
//   const CATEGORY_QUERY = gql`
//     query HomeCategories {
//       categories(first: 10000) {
//         edges {
//           node {
//             id
//             name
//           }
//         }
//       }
//     }
//   `;
//   const _categoryData = await Client.query({
//     query: CATEGORY_QUERY,
//   });
//   // authors data
//   const GET_AUTHORS_QUERY = gql`
//     query Authors {
//       pages(first: 10000) {
//         edges {
//           node {
//             id
//             title
//           }
//         }
//       }
//     }
//   `;
//   const _authorsData = await Client.query({
//     query: GET_AUTHORS_QUERY,
//   });

//   // ------------------------**------------------------------------
//   //   file writtings
//   writeData("data/booksData.js", _booksData.data.posts.nodes);
//   writeData("data/categoryData.js", _categoryData.data.categories.edges);
//   writeData("data/authorsData.js", _authorsData.data.pages.edges);

//   return {
//     props: {
//       data: _booksData.data.posts.nodes || "",
//     },
//   };
// }
