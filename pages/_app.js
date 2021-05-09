import Head from "next/head"
import styles from '../public/assets/styles/styles.scss';
import "tailwindcss/tailwind.css";

// import App from 'next/app'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>ECOMI Investors • [Work in Progress]</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp