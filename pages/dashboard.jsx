// nextjs
import Head from "next/head";
// components
import { Layout, MUITable } from "../components";

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Layout>
        <MUINavbar />
        <MUITable />
      </Layout>
    </>
  );
};

export default Dashboard;
