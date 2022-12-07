// components
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default Layout;
