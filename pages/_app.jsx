import "../styles/globals.css";
import { contextProvider } from "../context/globalContext";

function MyApp({ Component, pageProps }) {
  return (
    <contextProvider>
      <Component {...pageProps} />
    </contextProvider>
  );
}

export default MyApp;
