import React from "react";
import Product from "./Product";

function ProductFeed({ products }) {
  return (
    <main className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52">
      {products.slice(0, 4).map((product) => (
        <Product
          key={product.id}
          category={product.category}
          description={product.description}
          id={product.id}
          image={product.image}
          price={product.price}
          title={product.title}
        />
      ))}
      <img
        src="https://links.papareact.com/dyz"
        alt=".png"
        className="md:col-span-full px-0 sm:px-5"
      />
      <div className="md:col-span-2">
        {products.slice(4, 5).map((product) => (
          <Product
            key={product.id}
            category={product.category}
            description={product.description}
            id={product.id}
            image={product.image}
            price={product.price}
            title={product.title}
          />
        ))}
      </div>
      {products.slice(5, products.length).map((product) => (
        <Product
          key={product.id}
          category={product.category}
          description={product.description}
          id={product.id}
          image={product.image}
          price={product.price}
          title={product.title}
        />
      ))}
    </main>
  );
}

export default ProductFeed;
