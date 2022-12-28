import Seo from "@/components/Seo";
import Order from "@/components/order/Order";
import fetchOrder from "@/services/orders/fetch.service";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const Orders = () => {
  const { data: session } = useSession();
  // Fetch data from API
  const {
    data: orders,
    isLoading,
    isLoadingError,
  } = useQuery(
    ["order-by-user"],
    () => {
      const promise = fetchOrder();

      return promise;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  return (
    <main>
      <Seo templateTitle="Orders" />
      <section className="max-w-screen-xl mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>2 Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {orders?.data?.map((order) => (
            <Order
              key={order.id}
              id={order.id}
              price={order.price}
              total={order.total}
              totalItems={orders.data?.length}
              product_name={order.product_name}
              quantity={order.quantity}
              product_image={order.product_image}
              timestamp={order.created_at}
              // timestamp={order.timestamp}
              // images={order.images}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Orders;
