"use client";
import React, { useEffect,useState } from "react";
import UserTab from "../../components/layout/Tabs";
import SectionHeader from "../../components/layout/SectionHeader";
import UseProfile from "../../hooks/UserProfile";
import { dbTimeForHuman } from "../../components/libs/datetime";
import Link from "next/link";

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const { loading, data: profile } = UseProfile();

  // useEffect(() => {
  //   fetch("/api/order").then((res) => {
  //     res.json().then((orders) => {
  //       setOrders(orders.reverse());
  //       setOrderLoading(false);
  //     });
  //   });
  // }, []);

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTab isAdmin={true} />
      <div className="mt-8">
        <SectionHeader title={"Orders"} />

        {orderLoading && <div>Order is Loading</div>}

        {orders?.length > 0 &&
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6"
            >
              <div className="grow flex flex-col md:flex-row items-center gap-6">
                <div>
                  <div
                    className={
                      (order.paid ? "bg-green-500" : "bg-red-400") +
                      "p-2 rounded-md text-white w-24 text-center"
                    }
                  >
                    {order.paid ? "paid" : "Not paid"}
                  </div>
                </div>
              </div>

              <div className="grow">
                <div className="flex gap-2 items-center mb-1">
                  <div className="grow">{order.useEmail}</div>
                  <div className="text-gray-500 text-sm">
                    {dbTimeForHuman(order.createdAt)}
                  </div>
                </div>
                <div className="text-gray-500 text-xs">
                  {order.cartProducts.map((p) => p.name).join(",")}
                </div>
                <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                  <Link href={"/order/" + order._id} className="button">
                    show order
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default OrderPage;
