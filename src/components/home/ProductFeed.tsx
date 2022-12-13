import fetchProduct, {
  Params as GetProductParams,
} from "@/services/products/fetch.service";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Product from "./Product";

function ProductFeed() {
  const payload: GetProductParams = {
    limit: 100,
    sort_order: "DESC",
    take: 10,
  };
  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery(
    ["/api/products", JSON.stringify({ ...payload, currentPage })],
    () => {
      const promise = fetchProduct(currentPage, payload);

      return promise;
    },
    {
      // Refetch the data every second
      refetchInterval: 1000,
    }
  );
  //   const {
  //     data: products,
  //     isLoading,
  //     isError,
  //   } = useQuery(["/api/products"], fetchProduct);
  return (
    <main className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52">
      {products?.data?.data?.slice(0, 4).map((product, i) => (
        <Product
          key={i}
          category={product.category_id}
          description={product.description}
          id={i}
          image={product.image}
          price={product.price}
          title={product.name}
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
            category={product.category_id}
            description={product.description}
            id={i}
            image={product.image}
            price={product.price}
            title={product.name}
          />
        ))}
      </div>
      {products?.data?.data?.slice(5, products?.total).map((product, i) => (
        <Product
          key={i}
          category={product.category_id}
          description={product.description}
          id={i}
          image={product.image}
          price={product.price}
          title={product.name}
        />
      ))}
    </main>
  );
}

export default ProductFeed;
