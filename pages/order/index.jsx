import { useRouter } from "next/router";

const Orders = () => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    const recentOrderID = localStorage.getItem("recentOrderID");
    if (recentOrderID)
      router.push("https://alhedaya.vercel.app/order/" + recentOrderID);

    return;
  }

  return <div>Place a order first</div>;
};

export default Orders;
