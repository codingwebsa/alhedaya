import Link from "next/link";
import { useRouter } from "next/router";
import { Layout } from "../../../components";

const OrderDetails = () => {
  const router = useRouter();
  const { slug: orderID } = router.query;
  return (
    <>
      <Layout>
        <div className="min-h-screen p-4">
          <h1 className="text-2xl font-bold">
            Order ID {"#"}
            {orderID}
          </h1>
        </div>
      </Layout>
    </>
  );
};

export default OrderDetails;
