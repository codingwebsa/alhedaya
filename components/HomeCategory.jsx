// next
import Image from "next/image";
import Link from "next/link";
// images
import CategoryImage from "../assets/category1.jpg";

const HomeCategory = ({ data }) => {
  return (
    <>
      <div className="m-4 grid grid-cols-2 gap-y-2 gap-x-2">
        {data.map((d) => (
          <Link
            key={d.node.id}
            href={`/categories/${d.node.id}`}
            className="flex items-center gap-2 shadow-md p-2 rounded-lg bg-light hover:text-emerald-700"
          >
            <Image
              src={CategoryImage}
              className="h-8 w-8 rounded-full"
              alt="ইতিহাস"
            />
            <p className="text-md underline font-semibold">{d.node.name}</p>
          </Link>
        ))}
        <div className="col-span-2 flex justify-center items-center">
          <Link href="/categories">
            <button className="bg-gray-300 px-4 py-2 rounded-lg text-lg">
              আরো দেখুন..
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomeCategory;
