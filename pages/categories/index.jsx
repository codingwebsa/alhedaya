// components
import { Layout, SearchComponent } from "../../components";
// next
import Link from "next/link";
// apollo
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const Categories = ({ categories }) => {
  return (
    <>
      <Layout>
        <SearchComponent />
        <div className="py-6 grid grid-cols-1 gap-3 px-2">
          {categories.map((category) => (
            <div
              key={category.node.id}
              className="text-xl border-l-4 border-baseGreen py-2 pl-2"
            >
              <Link href={`/categories/${category.node.id}`}>
                <p className="underline">{category.node.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Categories;

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: process.env.WORDPRESS_ENDPOINT,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query Categories {
        categories {
          edges {
            node {
              name
              id
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      categories: data.categories.edges,
    },
  };
}
