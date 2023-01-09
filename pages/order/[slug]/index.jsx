import Image from "next/image";
import { useRouter } from "next/router";
// components
import { Layout } from "../../../components";
// firestore
import { doc, getDoc, updateDoc } from "firebase/firestore";
// firebase configuration
import { firebaseDB } from "../../../firebase.config";
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import Head from "next/head";
import { toast, Toaster } from "react-hot-toast";

const StatusCom = ({ status }) => {
  return (
    <>
      <span
        className={`text-sm ${
          status == "pending"
            ? "bg-yellow-200"
            : status == "cancled"
            ? "bg-red-300"
            : "bg-green-400"
        } py-1 px-4 text-dark font-bold rounded-full relative inline-flex items-center gap-1`}
      >
        <span
          className={`relative w-2 h-2 rounded-full ${
            status == "pending"
              ? "bg-yellow-500"
              : status == "cancled"
              ? "bg-red-500"
              : "bg-green-400"
          } `}
        ></span>
        <p className="inline-block">{status}</p>
      </span>
    </>
  );
};

const OrderDetails = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { slug: orderID } = router.query;

  async function getOrderDetails() {
    setLoading(true);
    try {
      const docRef = doc(firebaseDB, "orders", orderID);
      await getDoc(docRef).then((doc) => {
        setOrderDetails({ data: doc.data(), id: doc.id });
      });
    } catch (error) {
      router.push("/");
    }
    setLoading(false);
  }
  async function cancleOrder() {
    setLoading(true);
    const docRef = doc(firebaseDB, "orders", orderID);
    await updateDoc(docRef, {
      status: "cancled",
    });
    setLoading(false);
    router.reload();
  }
  useEffect(() => {
    if (orderID) getOrderDetails();
  }, [orderID]);

  return (
    <>
      <Head>
        <title>Track Order</title>
      </Head>
      {loading && (
        <>
          <div>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
        </>
      )}
      <Layout>
        {/* wrapper */}
        <div>
          <div className="min-h-screen m-2 p-3 bg-slate-100 rounded-md">
            <div>
              <h1 className="text-xl font-bold">
                Order ID {"#"}
                <span className="underline">{orderID}</span>
              </h1>
              <StatusCom status={orderDetails?.data.status} />
            </div>
            {/* ordered books */}
            <div className="flex flex-col gap-2 mt-4">
              {orderDetails?.data.cartItems.map((book, _i) => (
                <div className="flex gap-3" key={_i}>
                  <div>
                    <Image
                      src={book.acf.imgurl}
                      alt={book.title}
                      width={120}
                      height={80}
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{book.title}</p>
                    <p className="text-base">{book.acf.author[0].title}</p>
                    <p className="text-lg text-baseGreen font-bold">
                      ৳ {book.acf.discountPrice || book.acf.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* order details */}
            <div className="mt-8">
              <h2 className="text-2xl fotn-semibold underline">
                Order Details
              </h2>
              {/* details */}
              <div>
                <div className="mt-4">
                  <div>
                    <span className="font-medium text-xl">Name:</span>{" "}
                    {orderDetails?.data.name}
                  </div>
                  <div>
                    <span className="font-medium text-xl">Email:</span>{" "}
                    {orderDetails?.data.email}
                  </div>
                  <div>
                    <span className="font-medium text-xl">Phone:</span>{" "}
                    {orderDetails?.data.phoneNum}
                  </div>
                </div>
                {/* address */}
                <div className="mt-2">
                  {orderDetails?.data.country} <br />
                  {orderDetails?.data.area}, {orderDetails?.data.city} <br />
                  {orderDetails?.data.addressDetails}
                </div>
                {/* payment details */}
                <div className="mt-4">
                  <h2 className="text-xl font-bold">Payment information</h2>
                  <div className="mt-2">
                    <p>
                      <span>Method: </span>
                      <span className="font-semibold">
                        {orderDetails?.data.paymentMethod}
                      </span>
                    </p>
                    <p>
                      <span>Subtotal: </span>
                      <span className="font-semibold">
                        ৳ {orderDetails?.data.subTotal}
                      </span>
                    </p>
                    <p>
                      <span>Shipping Fee: </span>
                      <span className="font-semibold">
                        ৳ {orderDetails?.data.ShipingFee}
                      </span>
                    </p>
                    <p>
                      <span>Total: </span>
                      <span className="font-semibold">
                        ৳ {orderDetails?.data.total}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {orderDetails?.data.status !== "cancled" && (
            <div className="my-4 mx-3 text-lg">
              <p>
                want to cancle your order?{" "}
                <span
                  className="text-red-400 underline font-semibold cursor-pointer"
                  onClick={() => cancleOrder()}
                >
                  Cancle now
                </span>
              </p>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default OrderDetails;
