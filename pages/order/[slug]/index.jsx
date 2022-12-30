import Image from "next/image";
import { useRouter } from "next/router";
// components
import { Layout } from "../../../components";
// firestore
import { doc, getDoc, getDocs } from "firebase/firestore";
// context
import { GlobalContext } from "../../../context/globalContext";
import { useContext } from "react";

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
  // const { firebaseDB, orderCollertionRef } = useContext(GlobalContext);
  const { slug: orderID } = router.query;

  // getDocs(orderCollertionRef).then((d) => console.log(d));

  // getDoc(docRef).then((docData) => console.log(docData));
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
              {data.books.map((book, _i) => (
                <div className="flex gap-3" key={_i}>
                  <div>
                    <Image
                      src={book.imgurl}
                      alt={book.title}
                      width={120}
                      height={80}
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{book.title}</p>
                    <p className="text-base">{book.authorName}</p>
                    <p className="text-lg text-baseGreen font-bold">
                      ৳ {book.price}
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
                    {data.user_name}
                  </div>
                  <div>
                    <span className="font-medium text-xl">Email:</span>{" "}
                    {data.user_email}
                  </div>
                  <div>
                    <span className="font-medium text-xl">Phone:</span>{" "}
                    {data.user_phone}
                  </div>
                </div>
                {/* address */}
                <div className="mt-2">
                  {data.country} <br />
                  {data.zone}, {data.area} <br />
                  {data.city} <br />
                  {data.address_details}
                </div>
                {/* payment details */}
                <div className="mt-4">
                  <h2 className="text-xl font-bold">Payment information</h2>
                  <div className="mt-2">
                    <p>
                      <span>Method: </span>
                      <span className="font-semibold">{"Pay on Delivery"}</span>
                    </p>
                    <p>
                      <span>Subtotal: </span>
                      <span className="font-semibold">৳ {data.subtotal}</span>
                    </p>
                    <p>
                      <span>Shipping Fee: </span>
                      <span className="font-semibold">
                        ৳ {data.shippingfee}
                      </span>
                    </p>
                    <p>
                      <span>Total: </span>
                      <span className="font-semibold">৳ {data.total}</span>
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
