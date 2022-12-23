import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { GlobalContextProvider } from "../context/GlobalContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalContextProvider>
        <Component {...pageProps} />
        <Toaster />
      </GlobalContextProvider>
    </>
  );
}

export default MyApp;
