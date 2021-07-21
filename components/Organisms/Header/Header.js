import { useState } from 'react'
import Link from "next/link"
import Image from 'next/image'
import NProgress from 'nprogress'

import Router from "next/router"

NProgress.configure({ showSpinner: false });

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

const Header = ({ setControlOverflow }) => {

    return(
        <header className={`px-5 py-2 absolute w-full z-10`}>
            <div className="flex justify-between items-center">

                <div>
                    <Link href={`/`}><a>
                        <h1 className={`flex align-center items-center`}>
                            <Image
                                src="/assets/images/ecomi-rings-white.svg"
                                alt="Ecomi Wiki logo"
                                width={30}
                                height={30}
                                className={`inline-block mr-2`}
                            />
                            <span className={`font-bold text-base text-white inline-block ml-2`}>ECOMI</span>
                            <span className={`text-gray-300 text-base font-medium inline-block ml-1`}>WIKI</span>
                        </h1>
                    </a></Link>
                </div>

            </div>
        </header>
    )
}

export default Header