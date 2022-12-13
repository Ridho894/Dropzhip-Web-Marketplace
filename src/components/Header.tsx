import React, { useEffect } from "react";
import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { fetchCategories } from "@/services/categories/fetch.service";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

function Header() {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery(["/api/categories"], fetchCategories);

  const { data: session } = useSession();
  const router = useRouter();
  // Redux
  // const items = useSelector(selectItems);
  return (
    <header>
      {/* Top Nav */}
      <section className="flex items-center bg-dropzhip_blue p-1 flex-grow justify-between py-2">
        <div className="flex items-center justify-center w-24 h-12">
          <Image
            onClick={() => router.push("/")}
            src="/logo.png"
            width={160}
            height={80}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        <div className="bg-blue-900 hover:bg-blue-800 hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer">
          <input
            type={"text"}
            placeholder="Search..."
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
          />
          <SearchIcon className="h-12 p-4 text-white" />
        </div>
        {/* Right */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div
            className="link cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            <p>{session ? `Hello, ${session?.user.username}` : "Sign In"}</p>
            <p className="font md:text-sm">Account & Lists</p>
          </div>
          <div className="link" onClick={() => router.push("/orders")}>
            <p>Returns</p>
            <p className="font md:text-sm">& Orders</p>
          </div>
          <div
            className="link relative flex items-center"
            onClick={() => router.push("/checkout")}
          >
            {/* <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-blue-900 rounded-full text-white font-bold text-center">
              {items.length}
            </span> */}
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font md:text-sm">Basket</p>
          </div>
        </div>
      </section>
      {/* Bottom Nav */}
      <section className="flex items-center space-x-3 p-2 pl-5 bg-dropzhip_blue-light text-white text-sm">
        <a className="link hover:underline flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </a>
        {categories?.data?.map((item, i) => (
          <a
            className="link hover:underline"
            key={i}
            href={`/category/${item.slug}`}
          >
            {item.name}
          </a>
        ))}
      </section>
    </header>
  );
}

export default Header;