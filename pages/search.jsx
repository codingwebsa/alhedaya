// apollo
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import SearchComponent from "../components/SearchComponent";

const Search = ({ booksData }) => {
  return (
    <>
      <div>
        <SearchComponent />
      </div>
    </>
  );
};

export default Search;

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `http://sa.local/graphql`,
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
