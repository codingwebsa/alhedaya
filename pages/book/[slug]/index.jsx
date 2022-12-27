// next
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
// components
import { SearchComponent, Booksec, Layout } from "../../../components";
// apolloClient
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
// react
import { useContext, useState } from "react";
// react-hot-toast
import { toast } from "react-hot-toast";
// context
import { GlobalContext } from "../../../context/globalContext";
// NEXT SEO
import { NextSeo } from "next-seo";
// data
import { data as booksData } from "../../../data/booksData";

const BookPage = ({
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
  const { cartItems, setCartItems } = useContext(GlobalContext);
  // symble
  const Symble = () => <span>৳</span>;

  // console.log(data);
  function handleOrder(data) {
    setCartItems([...cartItems, { data }]);

    toast("Added to cart", {
      icon: "📚",
      style: {
        borderRadius: "200px",
        padding: "12px 20px",
        background: "#252c33",
        color: "#fff",
      },
    });
  }

  return (
    <>
      <NextSeo
        title={`${title} - আল হেদায়া`}
        description={description.substring(0, 100)}
        canonical="https://www.canonical.ie/"
        openGraph={{
          url: "https://alhedaya.netlify.app/",
          title: `${title} - আল হেদায়া`,
          description: description.substring(0, 100),
          images: [
            {
              url: imageURL,
              alt: `${title} - আল হেদায়া`,
            },
          ],
          siteName: "আল হেদায়া",
        }}
      />

      <Layout header={false} simpleHeader={true}>
        <SearchComponent />
        <div className="mt-8 pb-8 px-4">
          {/* ------image */}
          <div className="flex justify-center">
            <Image
              src={imageURL}
              loader={imageURL}
              blurDataURL={imageURL}
              placeholder="blur"
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
                <Link
                  href={`/author/${authors[0].id}`}
                  className="text-yellow-700"
                >
                  {authors[0].title}
                </Link>
              </span>
              <span className="flex gap-2">
                <p>প্রকাশনী :</p>
                <p className="text-yellow-700">{publication}</p>
              </span>
              <span className="flex gap-2">
                <p>বিষয় :</p>
                <Link
                  href={`/categories/${categories[0]?.id}`}
                  className="text-yellow-700"
                >
                  {categories[0]?.name}
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
                  <span className="text-3xl text-baseGreen font-semibold">
                    <Symble /> {discountPrice}
                  </span>
                  <s className="text-xl text-gray-600">
                    <Symble /> {price}
                  </s>
                </>
              ) : (
                <span className="text-3xl font-semibold text-baseGreen">
                  <Symble /> {price}
                </span>
              )}
            </div>
            {/* buttons */}
            <div className="my-4 flex gap-4">
              <button
                className="text-lg bg-rose-700 text-white px-5 py-3 rounded-md"
                onClick={() => handleOrder(data)}
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
  return {
    paths: booksData.map((data) => ({
      params: { slug: data.id },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const bookData = booksData.filter((item) => item.id == slug);
  const data = bookData[0];
  const recentBooksData = booksData.slice(0, 8);

  const title = data?.title;
  const price = data?.acf?.price;
  const discountPrice = data?.acf?.discountPrice;
  const publication = data?.acf?.publication;
  const authors = data?.acf?.author;
  const imageURL = data?.acf?.imgurl;
  const description = data?.acf?.description;
  const categories = data?.categories.nodes;
  return {
    props: {
      title,
      price,
      discountPrice,
      publication,
      authors,
      imageURL,
      description,
      categories,
      recentBooksData,
    },
  };
};
