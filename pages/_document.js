import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import getConfig from "next/config"
const { publicRuntimeConfig } = getConfig()

class MyDocument extends Document {

    setGoogleTags() {
        if (publicRuntimeConfig.PRODUCTION){
            return {
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', 'UA-103571215-1');
                `
            }
        }
    }

    render() {
        return (
            <Html lang={`en`} className="antialiased js-focus-visible">
                <Head>
                    <meta charSet={"UTF-8"} />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta name="theme-color" content="#ffffff" />
                    <link rel="stylesheet" href={"https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.css"}/>
                </Head>
                <body>
                <Main />
                <NextScript />
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-103571215-1"></script>
                <script dangerouslySetInnerHTML={this.setGoogleTags()}></script>
                </body>
            </Html>
        )
    }
}


export default MyDocument