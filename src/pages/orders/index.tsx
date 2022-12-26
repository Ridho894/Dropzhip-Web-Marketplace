import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";

const Orders = ({ orders }: any) => {
  const { data: session } = useSession();
  return (
    <main>
      <section className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>2 Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {/* {orders?.map((order) => (
            <Order
              key={order.id}
              id={order.id}
              amount={order.amount}
              amountShipping={order.amountShipping}
              items={order.items}
              timestamp={order.timestamp}
              images={order.images}
            />
          ))} */}
          <h1>orders</h1>
        </div>
      </section>
    </main>
  );
};

export default Orders;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  // Get the users logged in credentials...
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
  }
  return {
    props: {},
  };
}
