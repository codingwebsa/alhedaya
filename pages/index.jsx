// next
import Head from "next/head";
// react multi carousel
import Carousel from "../components/Carousel";
// components
import HomeCategory from "../components/HomeCategory";
import Navbar from "../components/Navbar";
import SearchComponent from "../components/SearchComponent";

export default function Home() {
  return (
    <>
      <Head>
        <title>আল হেদায়া</title>
      </Head>
      <Navbar />
      <SearchComponent />
      <Carousel />
      <HomeCategory />
    </>
  );
}
