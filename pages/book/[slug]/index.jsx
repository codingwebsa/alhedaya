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
import { useState } from "react";
import Booksec from "../../../components/Booksec";
import { toast } from "react-hot-toast";

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
  recentBooksData,
}) => {
  const [readMore, setReadMore] = useState(false);
  // symble
  const Symble = () => <span>৳</span>;

  // console.log({
  //   data,
  //   title,
  //   price,
  //   discountPrice,
  //   publication,
  //   authors,
  //   imageURL,
  //   description,
  //   categories,
  // });
  return (
    <>
      <Head>
        <title>{title} -আল হেদায়া</title>
      </Head>
      <Layout header={false} simpleHeader={true}>
        <SearchComponent />
        <div className="mt-8 pb-8 px-4">
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
          <div className="py-8 flex flex-col gap-2">
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

            <p className="text-slate-700">
              {readMore ? description : description.substring(0, 250)}
              {description.length > 250 && (
                <span
                  className="text-yellow-700 select-none cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? " ...show less" : " ...read more"}
                </span>
              )}
            </p>
          </div>
          {/* ------order section */}
          <div>
            {/* price */}
            <div className="flex gap-2 items-center mt-1">
              {discountPrice ? (
                <>
                  <span className="text-2xl text-baseGreen font-semibold">
                    <Symble /> {discountPrice}
                  </span>
                  <s className="text-lg text-gray-600">
                    <Symble /> {price}
                  </s>
                </>
              ) : (
                <span className="text-lg font-semibold text-baseGreen">
                  <Symble /> {price}
                </span>
              )}
            </div>
            {/* buttons */}
            <div className="my-4 flex gap-4">
              <button
                className="text-lg bg-rose-700 text-white px-5 py-3 rounded-md"
                onClick={() => toast.success("Order Confirmed")}
              >
                অর্ডার করুন
              </button>
              <button className="text-lg bg-yellow-600 text-white px-5 py-3 rounded-md">
                একটু পড়ে দেখুন
              </button>
            </div>
          </div>
        </div>
        <Booksec data={recentBooksData} title="আরো দেখুন…" />
      </Layout>
    </>
  );
};

export default BookPage;

export const getStaticPaths = async () => {
  const client = new ApolloClient({
    uri: "http://sa.local/graphql",
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
    uri: `http://sa.local/graphql`,
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

  const recentBooksData = await client.query({
    query: gql`
      query Books {
        posts(first: 8) {
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
      data: data.post,
      title: data.post.title,
      price: data.post.acf.price,
      discountPrice: data.post.acf.discountPrice,
      publication: data.post.acf.publication,
      authors: data.post.acf.author,
      imageURL: data.post.featuredImage.node.sourceUrl,
      description: data.post.acf.description,
      categories: data.post.categories.edges,
      recentBooksData: recentBooksData.data.posts.edges,
    },
  };
};
