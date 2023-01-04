import Seo from "@/components/Seo";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();
  return (
    <main className="bg-gray-100 h-screen">
      <Seo templateTitle="Success Order" />
      <section className="max-w-screen-lg mx-auto pt-10">
        <div className="flex flex-col p-10 bg-white rounded-lg">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thank you, your order has been confirmed!
            </h1>
          </div>
          <p>
            Thank you for shipping with us. We&apos;ll send a confimation once
            item has shipped, if you would like to check the status of order(s)
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
};

export default Success;
