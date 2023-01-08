// react
import { createContext, useEffect, useState } from "react";
// firebase config
import { auth } from "../firebase.config";
// firebase
import { onAuthStateChanged } from "firebase/auth";

export const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const ShipingFee = 30;
  var priceArray = [];

  async function getLocation() {
    const res = await fetch("https://ipinfo.io/json?token=6e1dac98093207");
    const jsonData = await res.json();
  }

  // cartitems useEffect
  useEffect(() => {
    cartItems?.forEach((item) => {
      let _discountPrice = item.acf.discountPrice;
      let _price = item.acf.price;

      priceArray.push(_discountPrice || _price);
    });
    setSubTotal(priceArray.reduce((a, b) => a + b, 0));
  }, [cartItems]);
  useEffect(() => {
    setTotal(() => subTotal + ShipingFee);
  }, [subTotal]);
  // auth useEffect
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        cartItems,
        setCartItems,
        user,
        total,
        subTotal,
        ShipingFee,
        getLocation,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
