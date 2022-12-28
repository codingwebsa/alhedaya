import Link from "next/link";
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
          <Link href="/">
            <div class="mt-6 text-center">
              <button
                type="submit"
                class="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
              >
                Go Back to Home
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default OrderDetails;
