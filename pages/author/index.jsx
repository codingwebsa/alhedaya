// nextjs
import Link from "next/link";
// apollo
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
// components
import { Layout, SearchComponent } from "../../components";

const Author = ({ AuthorsData }) => {
  console.log(AuthorsData);
  return (
    <>
      <Layout>
        <SearchComponent />
        <div className="py-6 grid grid-cols-1 gap-3 px-2">
          {AuthorsData.map((authordata) => {
            if (authordata.node.title == "Unknown") return;
            return (
              <div
                key={authordata.node.id}
                className="text-xl border-l-4 border-baseGreen py-2 pl-2"
              >
                <Link href={`/author/${authordata.node.id}`}>
                  <p className="underline">{authordata.node.title}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </Layout>
    </>
  );
};

export default Author;

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: process.env.WORDPRESS_ENDPOINT,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query Authors {
        pages {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      AuthorsData: data.pages.edges,
    },
  };
}
