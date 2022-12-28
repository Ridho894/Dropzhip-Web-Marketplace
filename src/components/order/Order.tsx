import { format } from "date-fns";
import React from "react";
import Currency from "react-currency-formatter";

type Props = {
  id: number;
  product_name: string;
  product_image: string;
  quantity: number;
  price: number;
  total: number;
  totalItems: number;
  timestamp: string;
};

const Order = ({
  id,
  product_name,
  product_image,
  total,
  quantity,
  price,
  totalItems,
  timestamp,
}: Props) => {
  return (
    <main className="relative border shadow-md">
      <section className="flex items-center justify-between space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div>
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{new Date(timestamp).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            <Currency quantity={price} currency="IDR" /> - NEXT Day Delivery{" "}
            <Currency quantity={total} currency="IDR" />
          </p>
        </div>
        {/* <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {totalItems} items
        </p> */}
        <p className="truncate text-xs whitespace-nowrap">ORDER #{id}</p>
      </section>
      <section className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          <img
            src={product_image}
            alt=".png"
            className="h-20 object-contain sm:h-32"
          />
          {/* {images.map((image) => (
            <img
              src={image}
              alt=".png"
              className="h-20 object-contain sm:h-32"
            />
          ))} */}
        </div>
      </section>
    </main>
  );
};

export default Order;
