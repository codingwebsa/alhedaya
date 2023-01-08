// REACT
import { useEffect, useState } from "react";
// MUI
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { SwipeableDrawer } from "@mui/material";
// FIREBASE
import { orderBy, query, getDocs, doc, updateDoc } from "firebase/firestore";
import { firebaseDB, orderCollertionRef } from "../firebase.config";
// DAYJS
import { unix } from "dayjs";
// NEXTJS
import Image from "next/image";
// ICONS
import { BsCheckAll } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import MUILoading from "./MUILoading";

const StatusCom = ({ status }) => {
  return (
    <>
      <span
        className={`text-sm ${
          status == "pending"
            ? "bg-yellow-200"
            : status == "cancled"
            ? "bg-red-300"
            : "bg-green-300"
        } py-1 px-4 text-dark font-bold rounded-full relative inline-flex items-center gap-1`}
      >
        <span
          className={`relative w-2 h-2 rounded-full ${
            status == "pending"
              ? "bg-yellow-500"
              : status == "cancled"
              ? "bg-red-500"
              : "bg-green-500"
          } `}
        ></span>
        <p className="inline-block">{status}</p>
      </span>
    </>
  );
};
// const columns = [
//   { field: "id", headerName: "ID", width: 70 },
//   {
//     field: "fullName",
//     headerName: "Full name",
//     sortable: false,
//     width: 160,
//   },
//   {
//     field: "email",
//     headerName: "Email",
//     sortable: false,
//     width: 200,
//   },
//   {
//     field: "totalPrice",
//     headerName: "Toal Price",
//     sortable: true,
//     type: "number",
//     width: 140,
//   },
//   {
//     field: "status",
//     headerName: "Status",
//     sortable: false,
//     width: 200,
//   },
// ];
// const rows = [
//   {
//     id: 1,
//     fullName: "Saif Ahmed",
//     email: "mdsaifahmed530@gmail.com",
//     totalPrice: 400,
//     status: "completed",
//   },
//   {
//     id: 2,
//     fullName: "Noor Mahmud",
//     email: "noormahmud@gmail.com",
//     totalPrice: 770,
//     status: "pending",
//   },
//   {
//     id: 3,
//     fullName: "Ahmed Shakik",
//     email: "muhammedshakik51@gmail.com",
//     totalPrice: 990,
//     status: "cancled",
//   },
// ];

export default function DataTable() {
  const [orders, setOrders] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupDetails, setPopupDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getOrders() {
    const tempOrders = [];

    const q = query(orderCollertionRef, orderBy("orderAt"));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      tempOrders.push({ ...doc.data(), id: doc.id });
    });

    setOrders(tempOrders);
  }

  function handlePopup(data) {
    setPopupDetails(data);
    setPopupOpen(true);
  }
  async function handleAction(action) {
    setLoading(true);
    const docRef = doc(firebaseDB, "orders", popupDetails.id);
    if (action === "complete") {
      await updateDoc(docRef, {
        status: "completed",
      });
    }
    if (action === "pending") {
      await updateDoc(docRef, {
        status: "pending",
      });
    }
    if (action === "cancle") {
      await updateDoc(docRef, {
        status: "cancled",
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      <div className="h-screen w-full p-4">
        {loading && <MUILoading loading={loading} />}
        {/* <DataGrid
        rows={rows}
        columns={columns}
        getCellClassName={(params) => {
          if (params.field == "status") {
            if (params.value == "completed") return "bg-green-300";
            if (params.value == "pending") return "bg-yellow-300";
            if (params.value == "cancled") return "bg-rose-300";
          }
        }}
        pageSize={10}
        autoHeight
        rowsPerPageOptions={[10]}
        // checkboxSelection
        components={{ Toolbar: GridToolbar }}
      /> */}
        <Card>
          <TableContainer>
            <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold">Name</TableCell>
                  <TableCell className="font-bold">Number</TableCell>
                  <TableCell className="font-bold">Email</TableCell>
                  <TableCell className="font-bold">Date</TableCell>
                  <TableCell className="font-bold">Price</TableCell>
                  <TableCell className="font-bold">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow
                    hover
                    key={order?.name}
                    className="cursor-pointer"
                    sx={{
                      "&:last-of-type td, &:last-of-type th": { border: 0 },
                    }}
                    onClick={() => handlePopup(order)}
                  >
                    <TableCell
                      sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                      className="font-semibold text-base"
                    >
                      {order?.name}
                    </TableCell>
                    <TableCell>{order?.phoneNum}</TableCell>
                    <TableCell>{order?.email}</TableCell>
                    <TableCell>
                      {unix(order.orderAt.seconds).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell>৳ {order?.total}</TableCell>
                    <TableCell
                      className={`${
                        order?.status === "pending"
                          ? "bg-yellow-200"
                          : order?.status === "cancled"
                          ? "bg-rose-300"
                          : "bg-emerald-300"
                      }`}
                    >
                      {order?.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <SwipeableDrawer
          anchor="bottom"
          open={popupOpen}
          onClose={() => setPopupOpen(false)}
        >
          {/* close button */}
          <span></span>
          {/* content */}
          <div className="max-h-96 m-2 p-3 bg-slate-100 rounded-md ">
            <div>
              <h1 className="text-xl font-bold">
                Order ID {"#"}
                <span className="underline">{popupDetails?.id}</span>
              </h1>
              <StatusCom status={popupDetails?.status} />
            </div>
            {/* ordered books */}
            <div className="flex flex-col gap-2 mt-4">
              {popupDetails?.cartItems.map((book, _i) => (
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
                    {popupDetails?.name}
                  </div>
                  <div>
                    <span className="font-medium text-xl">Email:</span>{" "}
                    {popupDetails?.email}
                  </div>
                  <div>
                    <span className="font-medium text-xl">Phone:</span>{" "}
                    {popupDetails?.phoneNum}
                  </div>
                  <div>
                    <span className="font-medium text-xl">Alt Number:</span>{" "}
                    {popupDetails?.alternativePhoneNum || "none"}
                  </div>
                </div>
                {/* address */}
                <div className="mt-2">
                  {popupDetails?.country} <br />
                  {popupDetails?.area}, {popupDetails?.city} <br />
                  {popupDetails?.addressDetails}
                </div>
                {/* payment details */}
                <div className="mt-4">
                  <h2 className="text-xl font-bold">Payment information</h2>
                  <div className="mt-2 pb-10">
                    <p>
                      <span>Method: </span>
                      <span className="font-semibold">
                        {popupDetails?.paymentMethod}
                      </span>
                    </p>
                    <p>
                      <span>Subtotal: </span>
                      <span className="font-semibold">
                        ৳ {popupDetails?.subTotal}
                      </span>
                    </p>
                    <p>
                      <span>Shipping Fee: </span>
                      <span className="font-semibold">
                        ৳ {popupDetails?.ShipingFee}
                      </span>
                    </p>
                    <p>
                      <span>Total: </span>
                      <span className="font-semibold">
                        ৳ {popupDetails?.total}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              {/* action buttons */}
              <div className="flex pb-10 justify-around">
                <div
                  className="inline-flex gap-1 items-center bg-emerald-600 px-3 py-2 rounded-full text-white shadow-xl cursor-pointer"
                  onClick={() => handleAction("complete")}
                >
                  <span>
                    <BsCheckAll />
                  </span>
                  <span>Complete</span>
                </div>
                <div
                  className="inline-flex gap-1 items-center bg-yellow-600 px-3 py-2 rounded-full text-white shadow-xl cursor-pointer"
                  onClick={() => handleAction("pending")}
                >
                  <span>
                    <AiOutlineInfoCircle />
                  </span>
                  <span>Pending</span>
                </div>
                <div
                  className="inline-flex gap-1 items-center bg-rose-600 px-3 py-2 rounded-full text-white shadow-xl cursor-pointer"
                  onClick={() => handleAction("cancle")}
                >
                  <span>
                    <RxCross2 />
                  </span>
                  <span>Cancle</span>
                </div>
              </div>
            </div>
          </div>
        </SwipeableDrawer>
      </div>
    </>
  );
}
