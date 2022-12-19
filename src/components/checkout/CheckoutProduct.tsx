import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import {
  Basket,
  addToBasket,
  removeFromBasket,
} from "@/redux/slices/basketSlice";

type Props = {
  id: number;
  name: string;
  price: number;
  description: string;
  category_id: string;
  image: string;
  free_delivery: boolean;
  rating: number;
  slug: string;
  onRemove: () => void;
};

function CheckoutProduct({
  id,
  name,
  price,
  rating,
  description,
  category_id,
  image,
  free_delivery,
  slug,
  onRemove = () => null,
}: Props) {
  const dispatch = useDispatch();
  // const removeItemFromBasket = () => {
  //   dispatch(removeFromBasket(id));
  // };
  const addItemToBasket = () => {
    const product = {
      id,
      name,
      price,
      rating,
      description,
      category_id,
      image,
      free_delivery,
      slug,
    };
    dispatch(addToBasket(product as Basket));
  };
  return (
    <main className="grid grid-cols-5">
      <img
        className="h-10 w-10"
        src={image || ""}
        // height={200}
        // width={200}
        // objectFit="contain"
        alt=".img"
      />
      <div className="col-span-3 mx-5">
        <p>{name}</p>
        <div className="flex">
          {Array(rating).map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="GBP" />
        {free_delivery && (
          <div className="flex items-center space-x-2">
            <img
              src="https://links.papareact.com/fdw"
              className="w-12"
              alt=".png"
              loading="lazy"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className="button" onClick={onRemove}>
          Remove from Basket
        </button>
      </div>
    </main>
  );
}

export default CheckoutProduct;
