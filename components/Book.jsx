// next
import Image from "next/image";
import Link from "next/link";

// symble
const Symble = () => <span>৳</span>;

const Book = ({ data: { node } }) => {
  console.log(node);
  return (
    <>
      <div>
        <Link href="/">
          {/* image */}
          <Image
            src={node.featuredImage.node.sourceUrl}
            width={256}
            height={81}
            alt={node.title}
            className="rounded-md mb-2"
          />
          {/* title */}
          <h2 className="font-hindSiliguri text-md text-justify leading-8">
            {node.title}
          </h2>
          {/* author */}
          {node.acf.author[0] && (
            <p className="text-xs text-gray-700">{node.acf.author[0].title}</p>
          )}
          {/* price */}
          <div className="flex gap-2 items-center mt-1">
            {node.acf.discountPrice ? (
              <>
                <span className="text-lg text-black font-semibold">
                  <Symble /> {node.acf.discountPrice}
                </span>
                <s className="text-sm text-gray-600">
                  <Symble /> {node.acf.price}
                </s>
              </>
            ) : (
              <span className="text-lg font-semibold text-black">
                <Symble /> {node.acf.price}
              </span>
            )}
          </div>
        </Link>
      </div>
    </>
  );
};

export default Book;
