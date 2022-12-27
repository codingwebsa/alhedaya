import {
  Autocomplete,
  Backdrop,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useContext, useRef, useState } from "react";
import { GlobalContext } from "../context/globalContext";
import { addDoc } from "firebase/firestore";
import { orderCollertionRef } from "../firebase.config";
// email js
import emailjs from "@emailjs/browser";

const OrderForm = () => {
  const [loading, setLoading] = useState(false);
  const { user, cartItems } = useContext(GlobalContext);
  const formRef = useRef();

  const cityptions = ["Dhaka", "Rajshahi"];
  const areaOptions = ["Godagari", "Carghat"];

  function handleSunmit(e) {
    e.preventDefault();
    setLoading(true);
    // console.log(cartItems);

    const name = e.target.name.value;
    const phoneNum = e.target.phoneNum.value;
    const alternativePhoneNum = e.target.alternativePhoneNum.value;
    const email = e.target.email.value;
    const country = e.target.country.value;
    const city = e.target.city.value;
    const area = e.target.area.value;
    const zone = e.target.zone.value;

    async function addDataToFirestore() {
      setLoading(true);

      try {
        setLoading(true);

        const docRef = await addDoc(orderCollertionRef, {
          name,
          phoneNum,
          alternativePhoneNum,
          email,
          country,
          city,
          area,
          zone,
          cartItems,
        });

        // console.log(docRef);
      } catch (error) {}
    }
    addDataToFirestore();
    setLoading(true);

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
          formRef.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );

    setLoading(false);
  }

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
      <form onSubmit={handleSunmit} ref={formRef}>
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
              name="email"
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
            <Autocomplete
              disablePortal
              id="city"
              options={cityptions}
              className="w-full"
              renderInput={(params) => (
                <TextField name="city" required {...params} label="City" />
              )}
            />
          </div>
          <div className="py-3 inline-block w-1/2 pr-1">
            <Autocomplete
              disablePortal
              id="area"
              options={areaOptions}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField name="area" required {...params} label="Area" />
              )}
            />
          </div>
          <div className="py-3 inline-block w-1/2 pl-1">
            <Autocomplete
              disablePortal
              id="zone"
              options={areaOptions}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField name="zone" required {...params} label="Zone" />
              )}
            />
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
