import Button from '@/components/Core/Button'
import Checkbox from '@/components/Core/Checkbox'
import Input from '@/components/Core/Input'
import Pagination from '@/components/Core/Pagination'
import AppLayout from '@/components/Layouts/AppLayout'
import Seo from '@/components/Seo'
import axios from '@/lib/axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState, Fragment } from 'react'

const ProductPage = () => {
    const router = useRouter()
    const [selectedRows, setSelectedRows] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('api/products')
            setProducts(data)
        } catch (error) {
            console.log(error)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <section className="p-6">
            <Seo templateTitle="My Products" />
            <h1 className="text-2xl font-bold">Products</h1>
            <div className="py-12">
                <div>
                    <div className="flex items-center space-x-8 mb-8">
                        <Input
                            placeholder="Search product..."
                            className={'w-full !p-3 outline-none'}
                        />
                        <button
                            onClick={() => router.push('/product/create')}
                            className={
                                'w-max bg-dropzhip_blue-light whitespace-nowrap !p-3 rounded-lg text-white text-sm !px-5 active:scale-105'
                            }>
                            Create Product
                        </button>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div
                            className={`relative max-h-[450px] overflow-y-auto mt-4 cursor-default overflow-x-hidden scrollbar-thin scrollbar-thumb-base-400 scrollbar-track-base-100 z-0`}>
                            <table className="w-full bg-white text-left table-auto">
                                <thead className="text-sm text-gray-700 bg-white font-medium sticky top-0 shadow z-[10]">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-sub3 font-normal w-20">
                                            <Checkbox
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        setSelectedRows(
                                                            products?.data?.map(
                                                                (_, i) => i,
                                                            ),
                                                        )
                                                    } else {
                                                        setSelectedRows([])
                                                    }
                                                }}
                                                checked={
                                                    products?.data?.length ===
                                                        selectedRows.length &&
                                                    products?.data?.length > 0
                                                }
                                            />
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-sub3 font-normal w-[500px]">
                                            Product
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-sub3 font-normal">
                                            Code
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-sub3 font-normal">
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-sub3 font-normal">
                                            Created At
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.data?.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={99}
                                                className="py-4 text-center">
                                                EMPTY PRODUCT
                                            </td>
                                        </tr>
                                    )}
                                    {loading ? (
                                        <tr>
                                            <td
                                                colSpan={99}
                                                className="py-4 text-center">
                                                LOADING...
                                            </td>
                                        </tr>
                                    ) : (
                                        <Fragment>
                                            {products?.data?.map(
                                                (item, index) => (
                                                    <tr
                                                        className="bg-white border-b even:bg-gray-50"
                                                        key={index}>
                                                        <td className="align-top px-2 py-4">
                                                            <Checkbox
                                                                onChange={e => {
                                                                    if (
                                                                        e.target
                                                                            .checked
                                                                    ) {
                                                                        setSelectedRows(
                                                                            [
                                                                                ...selectedRows,
                                                                                index,
                                                                            ],
                                                                        )
                                                                    } else {
                                                                        const newSelectedRows = selectedRows.filter(
                                                                            i =>
                                                                                i !==
                                                                                index,
                                                                        )
                                                                        setSelectedRows(
                                                                            newSelectedRows,
                                                                        )
                                                                    }
                                                                }}
                                                                checked={selectedRows.includes(
                                                                    index,
                                                                )}
                                                            />
                                                        </td>
                                                        <td className="align-top px-2 py-4">
                                                            {item.name}
                                                        </td>
                                                        <td className="align-top px-2 py-4">
                                                            {item.id}
                                                        </td>
                                                        <td className="align-top px-2 py-4">
                                                            -
                                                        </td>
                                                        <td className="align-top px-2 py-4">
                                                            {item.created_at}
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </Fragment>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {products?.data?.length >= 10 && (
                <Pagination
                    initialPage={currentPage}
                    dataLength={products?.data?.length || 0}
                    limit={10}
                    disabled={loading}
                />
            )}
        </section>
    )
}

export default ProductPage
