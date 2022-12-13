// next
import { useRouter } from "next/router";
// apollo
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
// components
import SearchComponent from "../components/SearchComponent";
import Booksec from "../components/Booksec";
import Header from "../components/Header";
// fuse.js
import Fuse from "fuse.js";

const Search = ({ booksData }) => {
  const modifiedData = [];
  const router = useRouter();
  const query = router.query.q;
  const fuse = new Fuse(booksData, {
    keys: ["node.title", "node.acf.author.title", "node.acf.author.name"],
    includeScore: true,
  });

  const fuseData = fuse.search(query || "");
  fuseData.forEach((data) => modifiedData.push(booksData[data.refIndex]));

  return (
    <>
      <div>
        <Header />
        <SearchComponent />
        <Booksec data={modifiedData} />
        {!query && (
          <h1 className="text-xl text-center">Please search something!</h1>
        )}
      </div>
    </>
  );
};

export default Search;

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

  return {
    props: {
      booksData: data.posts.edges,
    },
  };
}
