// next
import Link from "next/link";
import Image from "next/image";
// icons
import { BiHome } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
// import { BiBookOpen } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";
import { CgSearch } from "react-icons/cg";

const Navbar = () => {
  return (
    <>
      <header className="fixed bottom-0 w-full z-[999] rounded-t-2xl">
        <div className="max-w-xl mx-auto">
          <nav className="grid grid-cols-5 h-[9vh] place-items-center text-dark bg-white border-t-2 border-baseGreen rounded-t-2xl">
            <Link href="/" className="active:scale-[.9]" title="Home">
              <BiHome size={28} />
            </Link>
            <Link href="/search" className="active:scale-[.9]" title="Search">
              <CgSearch size={28} />
            </Link>
            <Link href="/" className="active:scale-[.9]" title="Menu">
              <CgMenuGridO size={28} />
            </Link>
            <Link href="/" className="active:scale-[.9]" title="Cart">
              <AiOutlineShoppingCart size={28} />
            </Link>

            <Link href="/" className="active:scale-[.9]" title="User">
              <Image src="/user.svg" width={28} height={28} alt="user" />
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
