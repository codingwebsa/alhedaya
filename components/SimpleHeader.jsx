// icons
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";

const SimpleHeader = () => {
  return (
    <>
      <div className="sticky top-0 z-[99] shadow-md">
        <div className="bg-white px-6 py-4 flex justify-between">
          <Link href="/">
            <BiArrowBack size={30} />
          </Link>
          <Link href="/cart">
            <AiOutlineShoppingCart size={30} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default SimpleHeader;
