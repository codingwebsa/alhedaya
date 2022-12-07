// next
import Image from "next/image";
import Head from "next/head";
// components
import Layout from "../../../components/Layout";
// components
import SearchComponent from "../../../components/SearchComponent";
// apolloClient
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Link from "next/link";

const BookPage = ({
  data,
  title,
  price,
  discountPrice,
  publication,
  authors,
  imageURL,
  description,
  categories,
}) => {
  console.log({
    data,
    title,
    price,
    discountPrice,
    publication,
    authors,
    imageURL,
    description,
    categories,
  });
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <SearchComponent />
        <div className="mt-8 pb-28">
          {/* ------image */}
          <div className="flex justify-center">
            <Image
              src={imageURL}
              width={300}
              height={130}
              className="rounded-lg shadow-md"
              alt={title}
            />
          </div>
          {/* ------details */}
          <div className="px-4 py-8 flex flex-col gap-2">
            <h1 className="text-lg font-bold">{title}</h1>
            {/* close details */}
            <div>
              <span className="flex gap-2">
                <p>লেখক :</p>
                <Link href={authors[0].id} className="text-yellow-700">
                  {authors[0].title}
                </Link>
              </span>
              <span className="flex gap-2">
                <p>প্রকাশনী :</p>
                <p className="text-yellow-700">{publication}</p>
              </span>
              <span className="flex gap-2">
                <p>বিষয় :</p>
                <Link href={categories[0].node.id} className="text-yellow-700">
                  {categories[0].node.name}
                </Link>
              </span>
            </div>
            {/* description */}

            <p className="text-slate-700">{description}</p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default BookPage;

export const getStaticPaths = async () => {
  const client = new ApolloClient({
    uri: "http://alhidaya.local/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query Books {
        posts {
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
    paths: data.posts.edges.map((edge) => ({
      params: { slug: edge.node.id },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const bookId = params.slug;
  const client = new ApolloClient({
    uri: "http://alhidaya.local/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query BookDetails($bookId: ID!) {
        post(id: $bookId) {
          title
          excerpt
          categories {
            edges {
              node {
                id
                name
              }
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
          acf {
            discountPrice
            price
            description
            publication
            author {
              ... on Page {
                id
                title
              }
            }
          }
        }
      }
    `,
    variables: { bookId },
  });
  return {
    props: {
      data: data.post,
      title: data.post.title,
      price: data.post.acf.price,
      discountPrice: data.post.acf.discountPrice,
      publication: data.post.acf.publication,
      authors: data.post.acf.author,
      imageURL: data.post.featuredImage.node.sourceUrl,
      description: data.post.acf.description,
      categories: data.post.categories.edges,
    },
  };
};
