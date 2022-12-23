// nextjs
import Head from "next/head";
// components
import { MUINavbar, MUITable } from "../components";

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <MUINavbar />
      <MUITable />
    </>
  );
};

export default Dashboard;
