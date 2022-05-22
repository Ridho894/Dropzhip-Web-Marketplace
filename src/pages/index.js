import { getSession } from "next-auth/react";
import Head from "next/head";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  return (
    <main className="bg-gray-100">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>DropZhip Development</title>
      </Head>
      <Header />
      <section className="max-w-screen-xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </section>
      <Footer />
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return {
    props: {
      products,
      session,
    },
  };
}
