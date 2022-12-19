import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "@/redux/slices/basketSlice";
import { FallbackImage } from "../core/FallbackImage";
import { useRouter } from "next/router";

const MAX_RATING = 5;
const MIN_RATING = 1;

type ProductProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  free_delivery: boolean;
  rating: number;
  slug: string;
};

function Product({
  id,
  title,
  price,
  description,
  category,
  image,
  free_delivery,
  rating,
  slug,
}: ProductProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      free_delivery,
      slug,
    };
    dispatch(addToBasket(product));
  };
  return (
    <section
      onClick={() =>
        router.push({
          pathname: "/product/[slug]",
          query: {
            slug: slug,
          },
        })
      }
      className="relative flex flex-col m-5 bg-white z-30 p-10 rounded-lg transform cursor-pointer transition duration-300 ease-out hover:scale-105"
    >
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <div className="relative h-[90px] aspect-square overflow-hidden">
        <FallbackImage
          quality={100}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATySURBVHgB7ZrNbxtFGMafALGELREfbA6JsM2NuCQH4h4Qdnusm4YDFVLaOKgnCAn/AJRvpH4IqXxUbUqRQBxI09DiSlBFLaIH4twaS9QuCRIgNZFoJJxDgmRzLO87yThOmn6ksd+OrfenrNZrz453f/Ps7OzETYv/Fm9BqTmPQBFBRQuhooVQ0UKoaCFUtBAqWggVLYSKFkJFC6GihVDRQqhoIVS0ECpaCBUthIoWQkULoaKFUNFCqGghVLQQKloIFS2EihZCRQvREKLzuZxZ7rTtAg2T6FRfb1lwqm8f0ASnaHLpR45zs7MYGhzA5GTmnmVDoRBy12fK28uCe8GGR0bPoqOjEy7xGByCk7inpwcXxy/hweAY3zJ/ruFUov1P+EDHg81iuwtOMkvmZI+cGUNHpzupbhjRHGbbXazfdoGGEF0P6DhaCGdFLy0u4uiRQ+jpTuLU8In73q/z2ShcxEnRLLlnz24sLS3hzbfexmQmg6HXB+5r37m5WbiIc6KtZB7mHTn6MeKJBI0mxsxnVjaPtznp4afazJq3Xcc50VYyJ7mS4S9Om3Vqf68pw0O33PXfqOyLZtt12c6J3kiyhWW3tPhpaTFp59eDQ29Q+YPOy67L4Z3tQmzKmTMj39LN87Dpo10cItbl8M4KrrxB9qX6TbJdpa4fWDZKtqsPPXX9wLJRsl2l7p8M60W2U6Lj8YR5GtwsVnbiheedm4e2uDXxTyOG1P59yOcf7N9Q3FAsPRQKwzWcEt3I6OydECpaCBUthIoWQkULoaKFUNFCqGghqvpLJZ54LxT+QVdsO2rFzMw0MhO/mNderxe7kt0IBoN33YfLP9cVg8/nw8OiqokuFouYJdm8Xn59g8QXzGsWVFmOt3ltsWUXaFn/XiW8/Ux7FK8NDKI9ug0X0ufLddp919c/Mz2N/0ql8nHZunlZe+y3f1+1eJT+bfQBqgSf6MJCAZ5mD06ePG4SNDY2at6bn7+J+b9vorWtFZ9/egwBSuE5+oyTxmtuoHzuGtIkLkkp/fL0KTRTPT9dHkeL319OLZczQpuA/LVfqUwzWlvb8OH776JUKqLZ48E3X3+1pn6uN/BkEN+dHUUk8jSuXPkZf/35h5lb4WPyU/3DJ47D42nGxR9/MPve6yrZLDXro7u6tpvLOhyKILFjJ/r7DyCbnaLL3YeX9r5MCSuiQA3ASbtB8vpfOWBSyifIwmzaOL3Zqatr6uaGM1cK7RsMLAsJh8OmjhK9x3J30HfGaeHvZLjh+PMQlctmr9I6QpNPEWQyy90Qy+Xj3bW721wB1UbkZujzrvaNfOJ8conETiOHYbGWku1OaKorGo2inUQn6eQrYfkskhtmwvbXK/1vZXfEjemjfpzhelb7dp+pm5dXqY5KvI97UQtq8rNdr+/OB8sJ5EufuwibHJZ2+NBHCKykk0W0b4si/f15U5aTiMBqHZPUUL9TH8wNlOxe2wixWAyffXLMpJ5vztwY2akp7KWraIL2u0B1chmu2xwPJZkbvdY8tGlSTq5N4eVL44ivnCz33wffee+2MlupfytlqoUT89GcvHT6nEky3whDYfcm7reKTvwLoU+GQqhoIVS0ECpaCBUthIoWQkULoaKFUNFCqGghVLQQKloIFS2EihZCRQuhooVQ0UKoaCFUtBAqWggVLYSKFkJFC6GihVDRQvwPdkE0+N08gTgAAAAASUVORK5CYII="
          loader={({ src }) => "/api/image?url=" + encodeURIComponent(src)}
          src={image}
          alt=""
        />
      </div>
      {/* <img
        src={image}
        className="w-[200px] h-[200px] object-contain"
        alt=".img"
      /> */}
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill(5)
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" key={i} />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        <Currency quantity={price} currency="IDR" />
      </div>
      {free_delivery && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            className="w-12"
            src="https://links.papareact.com/fdw"
            alt=".png"
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}
      <button onClick={addItemToBasket} className="mt-auto button">
        Add to Basket
      </button>
    </section>
  );
}

export default Product;
