// next
import Head from "next/head";
// components
import { Layout, SigninPageComponent, SignoutComponent } from "../components";
// react
import { useContext } from "react";
// context
import { GlobalContext } from "../context/globalContext";

const Account = () => {
  const { user } = useContext(GlobalContext);
  return (
    <>
      <Head>
        <title>Account - আল হেদায়া</title>
      </Head>
      <Layout>
        <div className="h-screen flex items-center justify-center">
          {user ? <SignoutComponent user={user} /> : <SigninPageComponent />}
        </div>
      </Layout>
    </>
  );
};

export default Account;
