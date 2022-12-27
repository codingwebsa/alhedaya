// next
import Link from "next/link";
import Image from "next/image";
// icons
import { BiHome } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
// import { BiBookOpen } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";
import { CgSearch } from "react-icons/cg";
// react
import { useContext } from "react";
// context
import { GlobalContext } from "../context/globalContext";
// MUI
import { Tooltip } from "@mui/material";

const Navbar = () => {
  const { user } = useContext(GlobalContext);
  return (
    <>
      <header className="fixed bottom-0 w-full z-[999] rounded-t-2xl">
        <div className="max-w-xl mx-auto">
          <nav className="grid grid-cols-5 h-[9vh] place-items-center text-dark bg-white border-t-2 border-baseGreen rounded-t-2xl">
            <Tooltip title="Home" arrow placement="top">
              <Link href="/" className="active:scale-[.9]">
                <BiHome size={28} />
              </Link>
            </Tooltip>
            <Tooltip title="Search" arrow placement="top">
              <Link href="/search" className="active:scale-[.9]">
                <CgSearch size={28} />
              </Link>
            </Tooltip>
            <Tooltip title="Menu" arrow placement="top">
              <Link href="/" className="active:scale-[.9]">
                <CgMenuGridO size={28} />
              </Link>
            </Tooltip>
            <Tooltip title="Cart" arrow placement="top">
              <Link href="/cart" className="active:scale-[.9]">
                <AiOutlineShoppingCart size={28} />
              </Link>
            </Tooltip>

            <Tooltip title="Account" arrow placement="top">
              <Link href="/account" className="active:scale-[.9]">
                <Image
                  src={user?.photoURL || `/user.svg`}
                  width={32}
                  height={32}
                  alt="user"
                  className="rounded-full"
                />
              </Link>
            </Tooltip>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
