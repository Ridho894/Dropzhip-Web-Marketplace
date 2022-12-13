import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Seo from "@/components/Seo";
import Banner from "@/components/home/Banner";
import ProductFeed from "@/components/home/ProductFeed";
import Footer from "@/components/Footer";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <main className="bg-gray-100">
      <Seo templateTitle="Home" />
      <section className="max-w-screen-xl mx-auto">
        <Banner />
        <ProductFeed />
      </section>
    </main>
  );
}
