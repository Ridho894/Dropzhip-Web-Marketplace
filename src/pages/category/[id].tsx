import { useRouter } from "next/router";

import Seo from "@/components/Seo";
import ProductFeed from "@/components/home/ProductFeed";

const ProductByCategory = () => {
  const router = useRouter();
  const { query } = router;

  return (
    <main className="min-h-screen bg-gray-100">
      <Seo templateTitle={`${query.id || "Category"}`} />
      <section className="max-w-screen-xl mx-auto pt-60">
        <ProductFeed categoryId={query.id as string} />
      </section>
    </main>
  );
};

export default ProductByCategory;
