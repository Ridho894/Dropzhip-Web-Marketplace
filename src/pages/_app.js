import { store } from '@/app/store'
import 'tailwindcss/tailwind.css'
import { Provider } from 'react-redux'
import ProgressBar from '@badrap/bar-of-progress'
import { Router } from 'next/router'

const progress = new ProgressBar({
    size: 4,
    color: '#131921',
    className: 'z-50',
    delay: 250,
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

const App = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default App
