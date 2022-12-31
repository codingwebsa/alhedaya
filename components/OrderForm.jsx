import {
  Backdrop,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useRef, useState } from "react";
import { GlobalContext } from "../context/globalContext";
// firestore
import { addDoc } from "firebase/firestore";
import { orderCollertionRef } from "../firebase.config";
// email js
import emailjs from "@emailjs/browser";
import { useRouter } from "next/router";

const OrderForm = () => {
  const [loading, setLoading] = useState(false);
  const { user, cartItems, subTotal, total, ShipingFee } =
    useContext(GlobalContext);
  const [orderID, setOrderID] = useState();
  const formRef = useRef();
  const router = useRouter();

  const cityoptions = ["Dhaka", "Rajshahi"];
  const areaOptions = ["Godagari", "Carghat"];

  function handleSunmit(e) {
    e.preventDefault();
    // console.log(cartItems);

    const name = e.target.name.value;
    const phoneNum = e.target.phoneNum.value;
    const alternativePhoneNum = e.target.alternativePhoneNum.value || "";
    const email = e.target.email.value;
    const country = e.target.country.value;
    const city = e.target.city.value;
    const area = e.target.area.value;
    const zone = e.target.zone.value;
    const addressDetails = e.target.addressDetails.value;

    async function addDataToFirestore() {
      addDoc(orderCollertionRef, {
        name,
        phoneNum,
        alternativePhoneNum,
        email,
        country,
        city,
        area,
        zone,
        addressDetails,
        cartItems,
        ShipingFee,
        subTotal,
        total,
        status: "pending",
        paymentMethod: "Pay on Delivery",
      }).then((docRef) => {
        setOrderID(docRef.id);
      });
    }
    function SendMail() {
      emailjs
        .sendForm(
          "service_vger1bp",
          "template_9b92ise",
          formRef.current,
          "EPDakJSwpBnKoxtqA"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }

    // calling functions
    setLoading(true);
    addDataToFirestore();
    SendMail();
    formRef.current.reset();
    setTimeout(() => {
      setLoading(false);
    }, 500);

    console.log("done");
  }

  if (orderID) router.push(`/order/${orderID}`);

  if (loading)
    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );

  return (
    <>
      <form onSubmit={handleSunmit} ref={formRef} autocomplete="off">
        <h2 className="py-4 text-2xl font-bold">Your Details</h2>
        <div>
          <div className="py-3">
            <TextField
              id="name"
              className="w-full"
              label="Name"
              name="name"
              defaultValue={user?.displayName}
              variant="outlined"
              required
            />
          </div>
          <div className="py-3">
            <TextField
              id="phoneNum"
              className="w-full"
              name="phoneNum"
              label="Phone Number"
              variant="outlined"
              required
            />
          </div>
          <div className="py-3">
            <TextField
              id="alternativePhoneNum"
              name="alternativePhoneNum"
              className="w-full"
              label="Alternative Phone Number"
              variant="outlined"
            />
          </div>
          <div className="py-3">
            <TextField
              id="email"
              name="user_email"
              className="w-full"
              label="Email"
              variant="outlined"
              type="email"
              defaultValue={user?.email}
              required
            />
          </div>
          <div className="py-3 inline-block w-1/2 pr-1">
            <TextField
              id="country"
              name="country"
              className="w-full"
              label="Country"
              variant="outlined"
              defaultValue="Bangladesh"
              inputProps={{
                readOnly: true,
              }}
              required
            />
          </div>
          <div className="py-3 inline-block w-1/2 pl-1">
            <FormControl fullWidth required>
              <InputLabel id="cityLabel">City</InputLabel>
              <Select labelId="cityLabel" id="city" label="City" name="city">
                {cityoptions?.map((city, _i) => (
                  <MenuItem value={city.toString()} key={_i}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="py-3 inline-block w-1/2 pr-1">
            <FormControl fullWidth required>
              <InputLabel id="areaLabel">Area</InputLabel>
              <Select labelId="areaLabel" id="area" label="Area" name="area">
                {areaOptions?.map((area, _i) => (
                  <MenuItem value={area.toString()} key={_i}>
                    {area}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="py-3 inline-block w-1/2 pl-1">
            <FormControl fullWidth required>
              <InputLabel id="zoneLabel">Zone</InputLabel>
              <Select labelId="zoneLabel" id="zone" label="Zone" name="zone">
                {areaOptions?.map((zone, _i) => (
                  <MenuItem value={zone.toString()} key={_i}>
                    {zone}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="py-3 inline-block w-full">
            <TextField
              multiline
              rows={4}
              placeholder="Write more details of your address"
              id="addressDetails"
              className="w-full"
              label="Address Details"
              variant="outlined"
              name="addressDetails"
              required
            />
          </div>
        </div>

        {/* button */}
        <div class="mt-6 text-center">
          <button
            type="submit"
            class="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
          >
            Checkout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
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
      </form>
    </>
  );
};

export default OrderForm;
