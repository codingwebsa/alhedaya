// nextjs
import Head from "next/head";
// components
import { Layout, MUITable, Sidebar } from "../components";

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Layout>
        <MUITable />
      </Layout>
    </>
  );
};

export default Dashboard;
