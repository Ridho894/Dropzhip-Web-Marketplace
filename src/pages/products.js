import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import Head from 'next/head'
import { useEffect, useState, Fragment } from 'react'

const ProductPage = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [products, setProducts] = useState([])
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
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Products
                </h2>
            }>
            <Head>
                <title>Laravel - Products</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <Fragment>
                            {error ? (
                                <p>Error...</p>
                            ) : (
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-6 bg-white border-b border-gray-200">
                                        {products?.data?.map((item, i) => (
                                            <p key={i}>{item.name}</p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Fragment>
                    )}
                </div>
            </div>
        </AppLayout>
    )
}

export default ProductPage