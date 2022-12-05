import { useContext } from "react";
import Navbar from "../components/Navbar";
import SearchComponent from "../components/SearchComponent";
import globalContext from "../context/globalContext";

export default function Home() {
  return (
    <>
      <Navbar />
      <SearchComponent />
    </>
  );
}
