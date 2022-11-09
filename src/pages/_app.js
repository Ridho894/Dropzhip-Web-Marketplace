import { store } from '@/app/store'
import 'tailwindcss/tailwind.css'
import { Provider } from 'react-redux'
import ProgressBar from '@badrap/bar-of-progress'
import { Router } from 'next/router'
import Layout from '@/components/Layouts/Admin'
import { useAuth } from '@/hooks/auth'
import '@/styles/global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const progress = new ProgressBar({
    size: 4,
    color: '#131921',
    className: 'z-50',
    delay: 250,
})

const routeWithoutLayout = [
    '/login',
    '/register',
    '/forgot-password',
    '/',
    '/category/[slug]',
]

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

const queryClient = new QueryClient()

function MyApp({ Component, router, pageProps }) {
    // const { user } = useAuth({ middleware: 'auth' })
    if (routeWithoutLayout.includes(router.pathname))
        return (
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                </QueryClientProvider>
            </Provider>
        )

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </QueryClientProvider>
        </Provider>
    )
}

export default MyApp
