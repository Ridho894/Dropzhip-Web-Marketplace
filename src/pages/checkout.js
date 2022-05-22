import Head from "next/head";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  const { data: session } = useSession();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    const checkSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };
  return (
    <main className="bg-gray-100 h-full min-h-screen pb-4">
      <Header />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>DropZhip Development</title>
      </Head>
      <section className="lg:flex max-w-screen-xl mx-auto">
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
              {items.length === 0 ? "Your Basket is Empty" : "Shopping Basket"}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>
        {/* Right */}
        <div
          className={`${
            items.length ? "block" : "hidden"
          } flex flex-col bg-white p-10 border-r-2 border-l-2`}
        >
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="GBP" />
                </span>
              </h2>
              <button
                onClick={createCheckoutSession}
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
          )}
        </div>
      </section>
    </main>
  );
}

export default Checkout;
