import Seo from "@/components/Seo";
import Banner from "@/components/home/Banner";
import ProductFeed from "@/components/home/ProductFeed";

export default function Home() {
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
