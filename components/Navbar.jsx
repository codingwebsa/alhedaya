// next
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
// icons
import { BiHome } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiBookOpen } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";

const Navbar = () => {
  return (
    <>
      <header className="fixed bottom-0 w-full bg-white z-[999]">
        <div>
          <nav className="grid grid-cols-5 h-[9vh] place-items-center text-dark border-t-2 border-baseGreen rounded-t-2xl">
            <Link href="/" className="active:scale-[.9]" title="Home">
              <BiHome size={28} />
            </Link>
            <Link href="/" className="active:scale-[.9]" title="Cart">
              <AiOutlineShoppingCart size={28} />
            </Link>
            <Link href="/" className="active:scale-[.9]" title="Menu">
              <CgMenuGridO size={28} />
            </Link>
            <Link href="/" className="active:scale-[.9]" title="Books Section">
              <BiBookOpen size={28} />
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
