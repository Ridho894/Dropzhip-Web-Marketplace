import Seo from "@/components/Seo";
import fetchProductByCategory, {
  Params,
} from "@/services/products/fetch-by-category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const ProductByCategory = () => {
  const router = useRouter();
  const { query } = router;

  const payload: Params = {
    limit: 100,
    sort_order: "DESC",
    take: 11,
    search: "",
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: products, isLoading } = useQuery(
    ["detail-product", JSON.stringify({ ...payload, currentPage })],
    () => {
      const promise = fetchProductByCategory(
        parseInt(query?.id as string),
        payload
      );

      return promise;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <section className="min-h-screen">
      <Seo templateTitle={`${query.id || "Category"}`} />
      <h1>Product by category</h1>
    </section>
  );
};

export default ProductByCategory;
