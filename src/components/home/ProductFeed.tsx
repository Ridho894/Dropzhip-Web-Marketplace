import fetchProduct, {
  Params as GetProductParams,
} from "@/services/products/fetch.service";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Pagination from "../core/Pagination";
import Product from "./Product";

function ProductFeed() {
  const payload: GetProductParams = {
    limit: 100,
    sort_order: "DESC",
    take: 11,
  };
  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: products, isLoading } = useQuery(
    ["/api/products", JSON.stringify({ ...payload, currentPage })],
    () => {
      const promise = fetchProduct(currentPage, payload);

      return promise;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="pt-4 pb-8">
      <section className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52">
        {products?.data?.data?.slice(0, 4).map((product, i) => (
          <Product
            key={i}
            category_id={product.category_id}
            description={product.description}
            id={i}
            image={product.image}
            price={product.price}
            slug={product.slug}
            name={product.name}
            rating={product.rating}
            free_delivery={product.free_delivery}
          />
        ))}
        <img
          src="https://links.papareact.com/dyz"
          alt=".png"
          className="md:col-span-full px-0 sm:px-5"
        />
        <div className="md:col-span-2">
          {products?.data?.data?.slice(4, 5).map((product, i) => (
            <Product
              key={i}
              category_id={product.category_id}
              description={product.description}
              id={i}
              image={product.image}
              price={product.price}
              name={product.name}
              slug={product.slug}
              rating={product.rating}
              free_delivery={product.free_delivery}
            />
          ))}
        </div>
        {products?.data?.data?.slice(5, products?.total).map((product, i) => (
          <Product
            key={i}
            category_id={product.category_id}
            description={product.description}
            id={i}
            image={product.image}
            price={product.price}
            name={product.name}
            slug={product.slug}
            rating={product.rating}
            free_delivery={product.free_delivery}
          />
        ))}
      </section>
      {products && products?.total > 11 && (
        <div className="px-4 pt-4">
          <Pagination
            initialPage={products?.current_page}
            dataLength={products?.total || 0}
            onPageChange={(page) => {
              handlePageChange(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            limit={11}
            disabled={false}
          />
        </div>
      )}
    </main>
  );
}

export default ProductFeed;
