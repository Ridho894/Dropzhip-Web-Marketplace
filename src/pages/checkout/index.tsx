import Seo from "@/components/Seo";
import CheckoutProduct from "@/components/checkout/CheckoutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";

const Checkout = () => {
  const { data: session } = useSession();
  return (
    <main className="bg-gray-100 h-full min-h-screen pb-4">
      <Seo templateTitle="Checkout" />
      <section className="lg:flex py-10 max-w-screen-xl mx-auto">
        {/* Left */}
        <div className="shadow-sm mx-auto">
          <img
            src="https://links.papareact.com/ikj"
            className="w-full"
            // width={1020}
            // height={250}
            // objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              Your Basket is Empty
              {/* {items.length === 0 ? "Your Basket is Empty" : "Shopping Basket"} */}
            </h1>
            <CheckoutProduct
              id={0}
              title={""}
              price={0}
              description={""}
              category={""}
              image={""}
              free_delivery={false}
              rating={0}
              slug={""}
            />
            {/* {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                free_delivery={item.hasPrime}
              />
            ))} */}
          </div>
        </div>
        {/* Right */}
        <div className={`flex flex-col bg-white p-10 border-r-2 border-l-2`}>
          <>
            <h2 className="whitespace-nowrap">
              Subtotal (2 items):{" "}
              <span className="font-bold">
                <Currency quantity={10000} currency="IDR" />
              </span>
            </h2>
            <button
              // onClick={createCheckoutSession}
              role={"link"}
              disabled={!session}
              className={`button mt-2 ${
                !session &&
                "from-gray-300 to-gray-500 border-gray-200 text-gray-200 cursor-not-allowed"
              }`}
            >
              {!session ? "Sign in to Checkout" : "Proceed to Checkout"}
            </button>
          </>
        </div>
      </section>
    </main>
  );
};

export default Checkout;