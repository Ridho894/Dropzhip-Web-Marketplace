import { fetchCategories } from "@/services/categories/fetch.service";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ReactSVG } from "react-svg";

type GuestLayoutProps = {
  children: React.ReactNode;
};

const footerContent = [
  {
    id: 1,
    title: "Get to Know Us",
    children: [
      { id: 1, title: "Careers" },
      { id: 2, title: "Blog" },
      { id: 3, title: "About DropZhip Indonesia" },
      { id: 4, title: "Investor Relations" },
      { id: 5, title: "DropZhip Devices" },
      { id: 6, title: "DropZhip Science" },
    ],
  },
  {
    id: 2,
    title: "Make Money with Us",
    children: [
      { id: 1, title: "Sell products on DropZhip" },
      { id: 2, title: "Sell on DropZhip Business" },
      { id: 3, title: "Sell apps on DropZhip" },
      { id: 4, title: "Become an Affiliate" },
      { id: 5, title: "Advertise Your Products" },
      { id: 6, title: "Self-Publish with Us" },
      { id: 7, title: "Host an DropZhip Hub" },
    ],
  },
  {
    id: 3,
    title: "DropZhip Payment Products",
    children: [
      { id: 1, title: "DropZhip Business Card" },
      { id: 2, title: "Shop with Points" },
      { id: 3, title: "Reload Your Balance" },
      { id: 4, title: "DropZhip Currency Converter" },
    ],
  },
  {
    id: 4,
    title: "Let Us Help You",
    children: [
      { id: 1, title: "DropZhip and COVID-19" },
      { id: 2, title: "Your Account" },
      { id: 3, title: "Your Orders" },
      { id: 4, title: "Shipping Rates & Policies" },
      { id: 5, title: "Returns & Replacements" },
      { id: 6, title: "Manage Your Content and Devices" },
      { id: 7, title: "DropZhip Assistant" },
      { id: 8, title: "Help" },
    ],
  },
];

const GuestLayout: React.FC<GuestLayoutProps> = ({ children }) => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery(["/api/categories"], fetchCategories);

  const { data: session } = useSession();
  // Hooks
  const router = useRouter();
  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen">
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
      {children}
      <footer>
        <section
          onClick={goTop}
          className="bg-dropzhip_blue-light p-4 text-center text-sm cursor-pointer hover:opacity-95 text-white"
        >
          <h1>Back To Top</h1>
        </section>
        <section className="bg-dropzhip_blue text-white p-10 grid grid-flow-row-dense grid-cols-2 gap-y-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-start xl:justify-items-center">
          {footerContent.map((item) => (
            <div key={item.id}>
              <h1 className="font-semibold">{item.title}</h1>
              {item.children.map((child) => (
                <p
                  className="font-thin text-sm my-2 hover:underline cursor-pointer"
                  key={child.id}
                >
                  {child.title}
                </p>
              ))}
            </div>
          ))}
        </section>
      </footer>
    </main>
  );
};

export default GuestLayout;
