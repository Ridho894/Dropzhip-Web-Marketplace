import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Banner from '@/components/Home/Banner'
import ProductFeed from '@/components/Home/ProductFeed'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import Seo from '@/components/Seo'
import fetchProducts from '@/services/products/fetch.service'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
    // Fetch data from API
    const { data: products, isLoading, isError } = useQuery(
        ['/api/products'],
        fetchProducts,
    )

    return (
        <main className="bg-gray-100">
            <Seo templateTitle="Home" />
            <Header />
            <section className="max-w-screen-xl mx-auto">
                <Banner />
                {isLoading && <p>Loading</p>}
                {isError && <p>Error</p>}
                <ProductFeed products={products} />
            </section>
            <Footer />
        </main>
    )
}
