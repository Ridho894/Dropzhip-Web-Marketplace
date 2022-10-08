import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Banner from '@/components/Home/Banner'
import ProductFeed from '@/components/Home/ProductFeed'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import Seo from '@/components/Seo'

export default function Home() {
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
        <main className="bg-gray-100">
            <Seo templateTitle="Home" />
            <Header />
            <section className="max-w-screen-xl mx-auto">
                <Banner />
                <ProductFeed products={products} />
            </section>
            <Footer />
        </main>
    )
}
