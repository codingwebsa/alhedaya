// nextjs
import Head from "next/head";
// apollo
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
// components
import { SearchComponent, Header, Booksec } from "../../../components";

const CategorySingle = ({ data }) => {
  return (
    <>
      <Head>
        <title>{`Category: ${data.name}`}</title>
      </Head>
      <SearchComponent />
      <Header />
      <Booksec title={`Category: ${data.name}`} data={data.posts.nodes} />
    </>
  );
};

export default CategorySingle;

export const getStaticPaths = async () => {
  const client = new ApolloClient({
    uri: "http://sa.local/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query Categories {
        categories(first: 10000) {
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
    paths: data.categories.edges.map((edge) => ({
      params: { slug: edge.node.id },
    })),
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const { slug } = params;

  const client = new ApolloClient({
    uri: process.env.WORDPRESS_ENDPOINT,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query Categories($slug: ID!) {
        category(id: $slug) {
          name
          posts {
            nodes {
              id
              title
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
      }
    `,
    variables: { slug },
  });

  return {
    props: {
      data: data.category,
    },
  };
}
