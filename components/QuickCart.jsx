import { SwipeableDrawer } from "@mui/material";
import Image from "next/image";
import { useContext } from "react";
import { GlobalContext } from "../context/globalContext";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/router";

const QuickCart = ({ isOpen, onClose, setIsOpen }) => {
  const router = useRouter();
  const { cartItems } = useContext(GlobalContext);
  // symble
  const Symble = () => <span>৳</span>;
  return (
    <>
      <div>
        <SwipeableDrawer anchor="bottom" open={isOpen} onClose={onClose}>
          <div className="">
            <span
              className="flex justify-end pt-4 pr-4 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <IoMdClose size={27} />
            </span>
            <div className="px-4 py-6">
              {cartItems.map((cartItem, _i) => {
                const _imgURL = cartItem.acf.imgurl;
                const _title = cartItem.title;
                const _discountPrice = cartItem.acf.discountPrice;
                const _price = cartItem.acf.price;
                return (
                  <div className="flex gap-4 pb-2" key={_i}>
                    <Image
                      src={_imgURL}
                      alt={_title}
                      width={80}
                      height={100}
                      className="rounded-lg h-20 object-cover"
                    />
                    <div className="pt-2">
                      <p className="font-semibold">{_title}</p>
                      <div className="flex gap-2 items-center mt-1">
                        {_discountPrice ? (
                          <>
                            <span className="text-lg text-baseGreen">
                              <Symble /> {_discountPrice}
                            </span>
                            <s className="text-sm text-gray-600">
                              <Symble /> {_price}
                            </s>
                          </>
                        ) : (
                          <span className="text-lg font-semibold text-baseGreen">
                            <Symble /> {_price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className="my-6 mx-4 text-center"
              onClick={() => router.push("/cart")}
            >
              <button
                type="submit"
                class="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
              >
                Go To Cart
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </SwipeableDrawer>
      </div>
    </>
  );
};

export default QuickCart;
