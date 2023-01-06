import { useRouter } from "next/router";

import Seo from "@/components/Seo";
import ProductFeed from "@/components/home/ProductFeed";
import { useState } from "react";

const ProductByCategory = () => {
  const router = useRouter();
  const { query } = router;

  const [seoTitle, setSeoTitle] = useState<string>("");

  return (
    <main className="min-h-screen bg-gray-100">
      <Seo templateTitle={`${seoTitle || "Not Found"}`} />
      <section className="max-w-screen-xl mx-auto pt-60">
        <ProductFeed
          setSeoTitle={setSeoTitle}
          categoryId={query.id as string}
        />
      </section>
    </main>
  );
};

export default ProductByCategory;
