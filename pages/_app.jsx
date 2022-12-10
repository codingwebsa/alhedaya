import "../styles/globals.css";
import { contextProvider } from "../context/globalContext";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <contextProvider>
      <Component {...pageProps} />
      <Toaster />
    </contextProvider>
  );
}

export default MyApp;
