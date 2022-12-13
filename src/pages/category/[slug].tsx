import Seo from "@/components/Seo";
import { useRouter } from "next/router";

const ProductByCategory = () => {
  const router = useRouter();
  const { query } = router;
  return (
    <section className="min-h-screen">
      <Seo templateTitle={`${query.slug || "Category"}`} />
      <h1>Product by category</h1>
    </section>
  );
};

export default ProductByCategory;
