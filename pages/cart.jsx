// next
// import Link from "next/link";
import Image from "next/image";

// react
import { useContext } from "react";
// context
import { GlobalContext } from "../context/globalContext";
// components
import { Layout, OrderForm } from "../components";
// assets
import EmptyCartSVG from "../assets/svg/empty-cart.svg";
// icons
import { MdDelete } from "react-icons/md";
import Head from "next/head";

const Cart = () => {
  const { cartItems, subTotal, ShipingFee, total, setCartItems } =
    useContext(GlobalContext);

  function removeItem(index) {
    setCartItems(cartItems.filter((_, i) => i != index));
  }

  if (cartItems.length == 0)
    return (
      <Layout>
        <div className="h-screen flex flex-col gap-10 items-center justify-center px-4">
          <h2 className="text-xl font-bold">Your Cart is Empty</h2>
          <Image src={EmptyCartSVG} height={400} width={400} />
        </div>
      </Layout>
    );

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <Layout footer={false}>
        <section class="h-screen bg-gray-100 py-12 sm:py-16 lg:py-20">
          <div class="mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div class="flex items-center justify-center">
              <h1 class="text-2xl font-semibold text-gray-900">Your Cart</h1>
            </div>

            <div class="mx-auto mt-4 max-w-2xl md:mt-12">
              <div class="bg-white shadow">
                <div class="px-4 py-6 sm:px-8 sm:py-10">
                  <div class="flow-root">
                    <ul class="-my-8">
                      {cartItems?.map((item, _i) => {
                        let imageURL = item?.data.acf.imgurl;
                        let discountPrice = item?.data.acf.discountPrice;
                        let price = item?.data.acf.price;
                        let QNT = item?.quantity;
                        return (
                          <li
                            class="flex  gap-x-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                            key={_i}
                          >
                            <div class="shrink-0">
                              <img
                                class="h-24 w-24 max-w-full rounded-lg object-cover"
                                src={imageURL}
                                alt=""
                              />
                            </div>

                            <div class="relative flex flex-1 flex-col justify-between">
                              <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                <div class="pr-8 sm:pr-5">
                                  <p class="text-base font-semibold text-gray-900">
                                    {item.data.title}
                                  </p>
                                  {/* <br />
                                  <p>Quantity: {QNT}</p> */}
                                </div>

                                <div class="mt-6 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                  <p class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                    ৳ {discountPrice ? discountPrice : price}
                                  </p>
                                </div>
                              </div>

                              <div
                                class="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto"
                                onClick={() => removeItem(_i)}
                              >
                                <button
                                  type="button"
                                  class="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                                >
                                  <MdDelete size={20} color="#be123c" />
                                </button>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div class="mt-6 border-t border-b py-2">
                    <div class="flex items-center justify-between">
                      <p class="text-sm text-gray-400">Subtotal</p>
                      <p class="text-lg font-semibold text-gray-900">
                        ৳ {subTotal}
                      </p>
                    </div>
                    <div class="flex items-center justify-between">
                      <p class="text-sm text-gray-400">Shipping</p>
                      <p class="text-lg font-semibold text-gray-900">
                        ৳ {ShipingFee}
                      </p>
                    </div>
                  </div>
                  <div class="mt-6 flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-900">Total</p>
                    <p class="text-2xl font-semibold text-gray-900">
                      <span class="text-xs font-normal text-gray-400">BDT</span>{" "}
                      {total}
                    </p>
                  </div>

                  {/*  */}
                  <div className="py-10">
                    <OrderForm />
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Cart;
