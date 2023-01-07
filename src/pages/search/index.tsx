import Seo from "@/components/Seo";
import ProductFeed from "@/components/home/ProductFeed";
import { useRouter } from "next/router";
import { useState } from "react";

const Search = () => {
  const router = useRouter();

  const [templateTitle, setTemplateTitle] = useState<string>("");

  const keyword: string = router.query.keyword as string;

  return (
    <main className="min-h-screen bg-gray-100">
      <Seo templateTitle={`${templateTitle}`} />
      <section className="max-w-screen-xl mx-auto">
        <ProductFeed
          withBanner={false}
          setTemplateTitle={setTemplateTitle}
          keyword={keyword}
        />
      </section>
    </main>
  );
};

export default Search;
