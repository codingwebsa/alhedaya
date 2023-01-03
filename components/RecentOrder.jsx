import Link from "next/link";
import { useEffect, useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";

const RecentOrder = () => {
  const [recentOrderID, setRecentOrderID] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let localOrderID = window.localStorage.getItem("recentOrderID");
      if (!recentOrderID) setRecentOrderID(localOrderID);
    }
  }, []);

  if (!recentOrderID) return;
  return (
    <>
      <Link href={`/order/${recentOrderID}`}>
        <div className="px-4 my-4">
          <div className="flex gap-3 items-center p-4 bg-[#00c9a733] rounded-xl">
            <span>
              <TbTruckDelivery size={40} />
            </span>
            <p className="text-xl font-semibold underline decoration-wavy">
              Track your recent order!
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default RecentOrder;
