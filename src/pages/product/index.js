import Button from '@/components/Core/Button'
import Input from '@/components/Core/Input'
import AppLayout from '@/components/Layouts/AppLayout'
import Seo from '@/components/Seo'
import axios from '@/lib/axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState, Fragment } from 'react'

const ProductPage = () => {
    const router = useRouter()
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
        <section>
            <Seo templateTitle="My Products" />

            <div className="py-12">
                <div className="sm:px-6 lg:px-8">
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
        </section>
    )
}

export default ProductPage
