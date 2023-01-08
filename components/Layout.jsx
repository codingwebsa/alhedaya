// components
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SimpleHeader from "./SimpleHeader";

const Layout = ({
  header = true,
  simpleHeader = false,
  footer = true,
  children,
}) => {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Sidebar />
        {header && <Header />}
        {simpleHeader && <SimpleHeader />}
        {children}
        {footer && <Footer />}
      </div>
    </>
  );
};

export default Layout;
