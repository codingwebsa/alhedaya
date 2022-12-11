// next
import Image from "next/image";
import Link from "next/link";

// symble
const Symble = () => <span>৳</span>;

const Book = ({ data }) => {
  return (
    <>
      <div>
        <Link href={`/book/${data.node.id}`}>
          {/* image */}
          <Image
            src={data.node.featuredImage.node.sourceUrl}
            width={256}
            height={81}
            alt={data.node.title}
            className="rounded-md mb-2 hover:brightness-90"
          />
          {/* title */}
          <h2 className="font-hindSiliguri text-md font-semibold">
            {data.node.title}
          </h2>
          {/* author */}
          {data.node.acf.author[0] && (
            <p className="text-xs text-gray-600">
              {data.node.acf.author[0].title}
            </p>
          )}
          {/* price */}
          <div className="flex gap-2 items-center mt-1">
            {data.node.acf.discountPrice ? (
              <>
                <span className="text-lg text-baseGreen font-semibold">
                  <Symble /> {data.node.acf.discountPrice}
                </span>
                <s className="text-sm text-gray-600">
                  <Symble /> {data.node.acf.price}
                </s>
              </>
            ) : (
              <span className="text-lg font-semibold text-baseGreen">
                <Symble /> {data.node.acf.price}
              </span>
            )}
          </div>
        </Link>
      </div>
    </>
  );
};

export default Book;
