// next
import Image from "next/image";
import Link from "next/link";
// images
import CategoryImage from "../assets/category1.jpg";

const HomeCategory = () => {
  return (
    <>
      <div className="my-6 mx-4 grid grid-cols-2 gap-y-2 gap-x-2">
        <Link
          href="/"
          className="flex items-center gap-2 shadow-md p-2 rounded-lg bg-light hover:text-emerald-700"
        >
          <Image
            src={CategoryImage}
            className="h-8 w-8 rounded-full hue-rotate-90"
            alt="ইতিহাস"
          />
          <p className="text-md underline font-semibold">ইতিহাস</p>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 shadow-md p-2 rounded-lg bg-light hover:text-emerald-700"
        >
          <Image
            src={CategoryImage}
            className="h-8 w-8 rounded-full"
            alt="ইতিহাস"
          />
          <p className="text-md underline font-semibold">বাংলা সাহিত্য</p>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 shadow-md p-2 rounded-lg bg-light hover:text-emerald-700"
        >
          <Image
            src={CategoryImage}
            className="h-8 w-8 rounded-full hue-rotate-180"
            alt="ইতিহাস"
          />
          <p className="text-md underline font-semibold">ইতিহাস</p>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 shadow-md p-2 rounded-lg bg-light hover:text-emerald-700"
        >
          <Image
            src={CategoryImage}
            className="h-8 w-8 rounded-full grayscale"
            alt="ইতিহাস"
          />
          <p className="text-md underline font-semibold">বাংলা সাহিত্য</p>
        </Link>
      </div>
    </>
  );
};

export default HomeCategory;
