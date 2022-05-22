import React from "react";
import Header from "../components/Header";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Head from "next/head";

function success() {
  const router = useRouter();
  return (
    <main className="bg-gray-100 h-screen">
      <Header />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>DropZhip Development</title>
      </Head>
      <section className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thank you, your order has been confirmed!
            </h1>
          </div>
          <p>
            Thank you for shipping with us. We'll send a confimation once item
            has shipped, if you would like to check the status of order(s)
            please press the link below.
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="button mt-8"
          >
            Go to my Orders
          </button>
        </div>
      </section>
    </main>
  );
}

export default success;
