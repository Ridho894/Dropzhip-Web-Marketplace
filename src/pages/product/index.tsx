import { Popover } from "@headlessui/react";
import Checkbox from "@/components/core/Checkbox";
import Input from "@/components/core/Input";
import Pagination from "@/components/core/Pagination";
import Seo from "@/components/Seo";
import { useRouter } from "next/router";
import { useEffect, useState, Fragment, ChangeEvent } from "react";
import { ReactSVG } from "react-svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import fetchProductByUser, {
  Params as GetProductParams,
} from "@/services/products/fetch-by-user.service";
import { thousandFormat } from "@/utils/number";
import { MenuIcon } from "@heroicons/react/solid";
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";
import { toastError, toastSuccess } from "@/components/core/Toast";
import deleteProduct from "@/services/products/delete.service";
import ModalDeleteProduct from "@/components/product/ModalDeleteProduct";
import Error from "@/components/condition/Error";
import Button from "@/components/core/Button";

const ProductPage = () => {
  // Hooks
  const router = useRouter();
  const queryClient = useQueryClient();

  // Modal State
  const [moreThanOne, setMoreThanOne] = useState<boolean>(false);
  const [modalDeleteShow, setModalDeleteShow] = useState<boolean>(false);

  // Data State
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<string>("");

  const payload: GetProductParams = {
    search: search,
    limit: 100,
    sort_order: "DESC",
    take: 10,
  };

  // Fetch data from API
  const {
    data: products,
    isLoading,
    isLoadingError,
  } = useQuery(
    ["product-by-user", JSON.stringify({ ...payload, currentPage })],
    () => {
      const promise = fetchProductByUser(currentPage, payload);

      return promise;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const handleDeleteProduct = useMutation(
    async () => {
      return deleteProduct({
        ids: selectedRows,
      });
    },
    {
      onError(error) {
        console.log(error);
      },
      onSuccess() {
        queryClient.refetchQueries({
          queryKey: ["product-by-user"],
        });
      },
    }
  );

  return (
    <section className="p-6 relative z-0">
      <Seo templateTitle="My Products" />
      <h1 className="text-2xl font-bold">Products</h1>
      <p className="my-1 text-sm">
        Creating product for your ecommerce online store{" "}
      </p>
      <div className="py-8">
        <div>
          <div className="flex items-center space-x-8 mb-8">
            <Input
              placeholder="Search product..."
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              value={search}
              className={"w-full border-2 !p-2 outline-none"}
            />
            <Button
              onClick={() => router.push("/product/create")}
              className={
                "w-max bg-dropzhip_blue-light whitespace-nowrap !p-3 rounded-lg text-white text-sm !px-5 active:scale-105"
              }
            >
              Create Product
            </Button>
          </div>
          <div className="bg-white shadow-sm sm:rounded-lg">
            {/* <div
              className={`relative max-h-[450px] overflow-y-auto mt-4 cursor-default overflow-x-hidden scrollbar-thin scrollbar-thumb-base-400 scrollbar-track-base-100 z-0`}
            > */}
            <div>
              <table className="w-full bg-white text-left table-auto">
                <thead className="text-sm text-gray-700 bg-white font-medium sticky top-0 shadow z-[10]">
                  <tr>
                    <th
                      scope="col"
                      className="px-2 py-3 text-sub3 font-normal w-20"
                    >
                      <Checkbox
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          if (e.target.checked) {
                            setSelectedRows(
                              products?.data?.data?.map(
                                (product, i) => product.id
                              ) ?? []
                            );
                          } else {
                            setSelectedRows([]);
                          }
                        }}
                        checked={
                          products?.total === selectedRows.length &&
                          products?.total > 0
                        }
                      />
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-sub3 font-normal w-[500px]"
                    >
                      Product
                    </th>
                    <th scope="col" className="px-2 py-3 text-sub3 font-normal">
                      Price
                    </th>
                    <th scope="col" className="px-2 py-3 text-sub3 font-normal">
                      Description
                    </th>
                    <th scope="col" className="px-2 py-3 text-sub3 font-normal">
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-sub3 font-normal"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingError && (
                    <td colSpan={99} className="mt-14 py-4">
                      <Error />
                    </td>
                  )}
                  {products?.message === "Data Not Found" && (
                    <tr>
                      <td colSpan={99} className="py-4 text-center">
                        EMPTY PRODUCT
                      </td>
                    </tr>
                  )}

                  {isLoading && (
                    <tr>
                      <td colSpan={99} className="py-4 text-center">
                        LOADING...
                      </td>
                    </tr>
                  )}

                  {products && products?.total > 0 && (
                    <Fragment>
                      {products?.data?.data?.map((item, index) => (
                        <tr
                          className="bg-white border-b even:bg-gray-50"
                          key={index}
                        >
                          <td className="align-top px-2 py-4">
                            <Checkbox
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                if (e.target.checked) {
                                  setSelectedRows([...selectedRows, item.id]);
                                } else {
                                  const newSelectedRows = selectedRows.filter(
                                    (i) => i !== i
                                  );
                                  setSelectedRows(newSelectedRows);
                                }
                              }}
                              checked={selectedRows.includes(item.id)}
                            />
                          </td>
                          <td className="align-top px-2 py-4">{item.name}</td>
                          <td className="align-top px-2 py-4">
                            Rp{thousandFormat(item.price)}
                          </td>
                          <td className="align-top px-2 py-4">
                            {item.description}
                          </td>
                          <td className="align-top px-2 py-4">
                            {item.category_id}
                          </td>
                          <td className="align-top px-2 py-4">
                            <Popover className="relative">
                              <Popover.Button className="border border-base-300 rounded-md p-1 outline-none">
                                <MenuIcon color="gray" height={20} width={20} />
                              </Popover.Button>

                              <Popover.Panel className="absolute z-[2] top-100 right-[60px] min-w-[150px] rounded-md bg-white shadow-md overflow-hidden">
                                <button
                                  onClick={() =>
                                    router.push(`/product/edit/${item.id}`)
                                  }
                                  className="py-3 px-4 text-sub1 text-base-900 border-b border-base-200 last:border-noone w-full text-left hover:bg-base-200"
                                >
                                  <PencilIcon
                                    height={20}
                                    width={20}
                                    className="inline mr-4 mb-1"
                                  />
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedRows([item.id]);
                                    setModalDeleteShow(true);
                                  }}
                                  // onClick={async () => {
                                  //   try {
                                  //     queryClient.refetchQueries({
                                  //       queryKey: ["product-by-user"],
                                  //     });
                                  //     await deleteProduct({
                                  //       id: item.id,
                                  //     });
                                  //     setCurrentPage(1);
                                  //     refetch();
                                  //   } catch (error) {
                                  //     console.log(error);
                                  //     toastError("Failed Deleted");
                                  //   }
                                  // }}
                                  className="py-3 px-4 text-sub1 text-base-900 border-b border-base-200 last:border-noone w-full text-left hover:bg-base-200"
                                >
                                  <TrashIcon
                                    height={20}
                                    width={20}
                                    className="inline mr-4 mb-1"
                                  />
                                  Delete
                                </button>
                              </Popover.Panel>
                            </Popover>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {products?.total! > 10 && (
        <Pagination
          initialPage={currentPage}
          dataLength={products?.total || 0}
          limit={10}
          disabled={isLoading}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Bottom bar tool  */}
      {selectedRows.length > 0 && (
        <div className="sticky left-0 bottom-6 p-3 px-5 bg-yellow-500 text-white flex justify-between items-center w-full rounded-lg">
          <div className="flex-1">
            <span className="text-sub2">
              {selectedRows.length} Selected Data
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setMoreThanOne(true);
                setModalDeleteShow(true);
              }}
              className="px-3 py-2 border border-base-100 rounded-md text-sub3 hover:bg-base-100 hover:text-backgroundDark-200"
            >
              <ReactSVG
                src="/icons/line/Delete.svg"
                height={18}
                width={18}
                wrapper="svg"
                className="inline mr-2 mb-1"
              />
              Delete
            </button>
          </div>
        </div>
      )}

      <ModalDeleteProduct
        moreThanOne={moreThanOne}
        isOpen={modalDeleteShow}
        deleted={`${selectedRows.length > 0 && selectedRows.length.toString()}`}
        onClose={() => {
          setMoreThanOne(false);
          setModalDeleteShow(false);
        }}
        onConfirm={() => {
          setMoreThanOne(false);
          setModalDeleteShow(false);
          setSelectedRows([]);
          handleDeleteProduct.mutate();
        }}
      />
    </section>
  );
};

export default ProductPage;
