import Image from "next/image";
import { useRouter } from "next/router";
// components
import { Layout } from "../../../components";
// firestore
import { doc, getDoc, getDocs } from "firebase/firestore";
// firebase configuration
import { firebaseDB } from "../../../firebase.config";
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress, LinearProgress } from "@mui/material";

const data = {
  shippingfee: 30,
  subtotal: 340,
  total: 370,
  user_email: "sofiqulsdm@gmail.com",
  user_name: "Sofiqul Islam",
  user_phone: "01792430530",
  country: "Bangladesh",
  city: "Rajshahi",
  area: "Godagari",
  zone: "Chapai",
  address_details: "123 Main St",
  books: [
    {
      title: "নবি জীবনের গল্প",
      authorName: "আরিফ আজাদ",
      price: 240,
      discountPrice: 170,
      imgurl:
        "https://res.cloudinary.com/dd2xrg1vb/image/upload/v1672378864/book_web/ncxi4u34fhk9vlpwe9u9.jpg",
    },
    {
      title: "আরজ আলী সমীপে",
      authorName: "আরিফ আজাদ",
      price: 280,
      discountPrice: 170,
      imgurl:
        "https://res.cloudinary.com/dd2xrg1vb/image/upload/v1672378864/book_web/ksbjk5yil58xwf6sktug.jpg",
    },
  ],
};

const OrderDetails = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const { slug: orderID } = router.query;

  async function getOrderDetails() {
    const docRef = doc(firebaseDB, "orders", orderID);
    getDoc(docRef).then((doc) => {
      setOrderDetails({ data: doc.data(), id: doc.id });
    });
  }

  useEffect(() => {
    if (orderID) getOrderDetails();
  }, [orderID]);

  if (!orderDetails)
    return (
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
    );

  return (
    <>
      <Layout>
        {/* wrapper */}
        <div>
          <div className="min-h-screen m-2 p-3 bg-slate-100 rounded-md">
            <h1 className="text-xl font-bold">
              Order ID {"#"}
              <span className="underline">{orderID}</span>
            </h1>
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
                  {orderDetails?.data.area}, {data.city} <br />
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
        </div>
      </Layout>
    </>
  );
};

export default OrderDetails;
