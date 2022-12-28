import { useRouter } from "next/router";
import { Layout } from "../../components";

const OrderDetails = () => {
  const router = useRouter();
  const { slug: orderID } = router.query;
  return (
    <>
      <Layout>
        <div className="h-screen p-4">
          <p className="text-lg">
            Thank you for placing an order on our website! We appreciate your
            business and hope you enjoy your purchase. Your Order id is{" "}
            <span className="text-teal-600 underline font-semibold">
              {orderID}
            </span>
          </p>
        </div>
      </Layout>
    </>
  );
};

export default OrderDetails;
