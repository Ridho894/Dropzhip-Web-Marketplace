import Header from '@/components/Header'
import Seo from '@/components/Seo'
import { useRouter } from 'next/router'

const DetailCategory = () => {
    const router = useRouter()
    const { slug } = router.query
    return (
        <main>
            <Seo templateTitle={slug} />
            <Header />
            <p>DetailCategory</p>
        </main>
    )
}

export default DetailCategory
