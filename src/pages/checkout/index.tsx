// @ts-ignore
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
import {
  removeFromBasket,
  selectItems,
  selectTotal,
} from "@/redux/slices/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

import Seo from "@/components/Seo";
import CheckoutProduct from "@/components/checkout/CheckoutProduct";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key!);

const Checkout = () => {
  const { data: session } = useSession();

  // Redux
  const dispatch = useDispatch();
  const basketItems = useSelector(selectItems);
  const total = useSelector(selectTotal);

  const createCheckoutSession = async () => {
    try {
      const stripe = await stripePromise;
      const checkSession = await axios.post("/api/create-checkout-session", {
        items: basketItems,
        email: session?.user.email,
      });
      return await stripe?.redirectToCheckout({
        sessionId: checkSession.data.id,
      });
      // if (result?.error) {
      //   alert(result?.error.message);
      // }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <main className="bg-gray-100 h-full pb-4">
      <Seo templateTitle="Checkout" />
      <section className="lg:flex py-10 max-w-screen-xl mx-auto">
        {/* Left */}
        <div className="shadow-sm mx-auto">
          <img
            src="https://links.papareact.com/ikj"
            className="w-full"
            alt=".img"
            // width={1020}
            // height={250}
            // objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {basketItems.length === 0
                ? "Your Basket is Empty"
                : "Shopping Basket"}
            </h1>
            {basketItems.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                name={item.name}
                price={item.price || 0}
                description={item.description}
                category_id={item.category_id}
                image={item.image}
                free_delivery={item.free_delivery}
                rating={item.rating}
                slug={item.slug}
                onRemove={() => dispatch(removeFromBasket(i))}
              />
            ))}
          </div>
        </div>
        {/* Right */}
        <div className={`flex flex-col bg-white p-10 border-r-2 border-l-2`}>
          <>
            <h2 className="whitespace-nowrap">
              Subtotal ({basketItems.length} items):{" "}
              <span className="font-bold">
                <Currency quantity={total || 0} currency="IDR" />
              </span>
            </h2>
            <button
              onClick={createCheckoutSession}
              role={"link"}
              disabled={!session || basketItems.length === 0}
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
