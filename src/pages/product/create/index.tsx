import { slugify } from "@/helpers/slugify";
import Router, { useRouter } from "next/router";
import Seo from "@/components/Seo";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCategories } from "@/services/categories/fetch.service";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "@/components/core/Select";
import NewProduct, { Payload } from "@/services/products/create.service";
import Button from "@/components/core/Button";

type Form = {
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: string;
  image: string;
  category_id: string;
};

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.string().required(),
  stock: yup.string().required(),
  category_id: yup.array().of(
    yup.object().shape({
      id: yup.string(),
      name: yup.string(),
    })
  ),
});

const CreateProduct = () => {
  // Hooks
  const router = useRouter();
  const queryClient = useQueryClient();

  // Form State
  const {
    control,
    formState: { errors, isValid },
    watch,
    setValue,
    getValues,
    handleSubmit,
    setError,
    trigger,
  } = useForm<Form>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      image: "",
      price: "",
      stock: "",
      category_id: "",
    },
  });

  const form = watch();

  const { data: categories } = useQuery(["/api/categories"], fetchCategories, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const mutation = useMutation(
    () => {
      return NewProduct({
        name: form.name,
        slug: slugify(form.name),
        description: form.description,
        price: form.price,
        image: "https://",
        category_id: form.category_id,
      });
    },
    {
      onError(error) {
        console.log(error);
      },
      onSuccess() {
        router.push("/product");
      },
    }
  );

  return (
    <section className="p-6">
      <Seo templateTitle="Create Product" />
      <div className="max-w-5xl mx-auto">
        <section className="w-full space-y-4 ">
          <div className="w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Product Name
            </label>
            <input
              onChange={(e) => {
                setValue("name", e.target.value);
                setValue("slug", slugify(form.name));
              }}
              value={form.name}
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="name"
              type="text"
              placeholder="Product name..."
            />
            {errors.name && <p className="text-red-600 text-sm">Required</p>}
          </div>

          <div className="w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              onChange={(e) => {
                setValue("description", e.target.value);
              }}
              value={form.description}
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="description"
              type="text"
              placeholder="Product description..."
            />
            {errors.description && (
              <p className="text-red-600 text-sm">Required</p>
            )}
          </div>
          <div className="w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              onChange={(e) => {
                setValue("price", e.target.value);
              }}
              value={form.price}
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="price"
              type="number"
              placeholder="Product price..."
            />
            {errors.price && <p className="text-red-600 text-sm">Required</p>}
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="stock"
              >
                Stock
              </label>
              <input
                onChange={(e) => {
                  setValue("stock", e.target.value);
                }}
                value={form.stock}
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="stock"
                type="number"
                placeholder="Product stock..."
              />
              {errors.stock && <p className="text-red-600 text-sm">Required</p>}
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <div className="relative">
                <Select
                  onChange={(e) => setValue("category_id", e.id.toString())}
                  value={form.category_id}
                  placeholder="Select the category"
                  data={
                    categories?.data.map((item) => {
                      return {
                        id: item.id,
                        name: item.name,
                      };
                    }) || []
                  }
                  overflow="auto"
                  dropdownClassName="max-h-[230px]"
                />
                {errors.category_id && (
                  <p className="text-red-600 text-sm">Required</p>
                )}
              </div>
            </div>
            {/* <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                Published At
              </label>
              <input
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                disabled
                placeholder="Published At"
              />
            </div> */}
          </div>
          <Button
            disabled={
              !form.name ||
              !form.price ||
              !form.category_id ||
              !form.description ||
              !form.stock
            }
            onClick={() => mutation.mutate()}
            className={
              "focus:shadow-outline cursor-pointer rounded bg-yellow-500 py-2 px-4 font-bold text-white shadow hover:bg-yellow-400 focus:outline-none"
            }
          >
            {mutation.isLoading ? "Loading..." : "Submit"}
          </Button>
        </section>
      </div>
    </section>
  );
};

export default CreateProduct;
