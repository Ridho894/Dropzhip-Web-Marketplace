import { useRouter } from "next/router";

import Seo from "@/components/Seo";
import ProductFeed from "@/components/home/ProductFeed";
import { useState } from "react";

const ProductByCategory = () => {
  const router = useRouter();
  const { query } = router;

  const [templateTitle, setTemplateTitle] = useState<string>("");

  return (
    <main className="min-h-screen bg-gray-100">
      <Seo templateTitle={`${templateTitle || "Not Found"}`} />
      <section className="max-w-screen-xl mx-auto">
        <h1 className="px-4 pt-6 text-2xl font-semibold">
          Category: {templateTitle}
        </h1>
        <ProductFeed
          withBanner={false}
          setTemplateTitle={setTemplateTitle}
          categoryId={query.id as string}
        />
      </section>
    </main>
  );
};

export default ProductByCategory;
