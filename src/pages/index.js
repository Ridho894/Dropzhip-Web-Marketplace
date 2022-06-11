import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Banner from '@/components/Home/Banner'
import ProductFeed from '@/components/Home/ProductFeed'

export default function Home({ products }) {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <main className="bg-gray-100">
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta charSet="utf-8" />
                <title>DropZhip Development</title>
            </Head>
            <Header />
            <section className="max-w-screen-xl mx-auto">
                <Banner />
                <ProductFeed products={products} />
            </section>
            <Footer />
        </main>
    )
}

export async function getServerSideProps(context) {
    const products = await fetch(
        'https://fakestoreapi.com/products',
    ).then(res => res.json())
    return {
        props: {
            products,
        },
    }
}
