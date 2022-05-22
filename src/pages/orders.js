import { getSession, useSession } from "next-auth/react";
import React from "react";
import db from "../../firebase";
import Header from "../components/Header";
import moment from "moment";
import Order from "../components/Order";
import Head from "next/head";

function Orders({ orders }) {
  const { data: session } = useSession();
  return (
    <main>
      <Header />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>DropZhip Development</title>
      </Head>
      <section className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {orders?.map((order) => (
            <Order
              key={order.id}
              id={order.id}
              amount={order.amount}
              amountShipping={order.amountShipping}
              items={order.items}
              timestamp={order.timestamp}
              images={order.images}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  // Get the users logged in credentials...
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
  }
  // Firebase db
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  // Stripe Orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
}
