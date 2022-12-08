// components
import Footer from "./Footer";
import Header from "./Header";
import SimpleHeader from "./SimpleHeader";

const Layout = ({ header = true, simpleHeader = false, children }) => {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        {header && <Header />}
        {simpleHeader && <SimpleHeader />}
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
