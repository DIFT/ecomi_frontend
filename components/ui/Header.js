import { useState } from 'react'
import { APP_NAME } from '../../config'
import { signout, isAuth } from "../../actions/auth"
import NProgress from 'nprogress'
import Link from "next/link"
import Image from 'next/image'

import Router from "next/router"
import Search from "../blog/Search"

NProgress.configure({ showSpinner: false });

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

import dynamic from 'next/dynamic';
import EcomiLogo from "../EcomiLogo";
const DynamicLordIcon = dynamic(() => import('../../components/LordIcon'), {
    ssr: false
});

const Header = () => {
    return(
        <>
            <DynamicLordIcon />
            <header className={`p-5 absolute w-full z-10`}>
                <div className="grid grid-cols-2">
                    <div>
                        <h1 className={`ecomiFont flex mt-10`}>
                            <Link href={`/`}><a className={`text-center absolute left-20 top-10 mt-2 `}>
                                <Image
                                    src="/assets/images/ecomi-rings-white.svg"
                                    alt="Picture of the author"
                                    width={70}
                                    height={70}
                                    className={`block`}
                                />
                                <span className={`font-extrabold text-4xl text-white block`}>ECOMI</span>
                                <span className={`text-gray-300 leading-4 font-medium text-lg block`}>INVESTORS</span>
                            </a></Link>
                        </h1>
                    </div>
                    <div>
                        <ul className={`text-right text-white mt-5`}>
                            <li className={`inline-block mr-5`}><Link href={`/ecomi/collectibles`}><a className={`uppercase block text-sm font-medium px-3 text-gray-400 hover:text-white transition duration-500`}>
                                <span className={`border-gray-500 border rounded-full mr-3 inline-block h-14 w-14 text-center`}>
                                    <lord-icon
                                        target={`a`}
                                        animation="loop"
                                        palette="#cccccc;#3C82F6"
                                        size={'50px'}
                                        params="50"
                                        className={`inline`}
                                        src={`./assets/icons/108-box-package-open-close-morph/108-box-package-open-close-morph-outline.json`}>
                                    </lord-icon>
                                </span>
                                Collectibles
                            </a></Link></li>
                            <li className={`inline-block mr-5`}><Link href={`/ecomi/marketplace`}><a className={`uppercase block text-sm font-medium px-3 text-gray-400 hover:text-white transition duration-500`}>
                                <span className={`border-gray-500 border rounded-full mr-3 inline-block h-14 w-14 text-center`}>
                                    <lord-icon
                                        target={`a`}
                                        animation="loop"
                                        palette="#cccccc;#3C82F6"
                                        size={'50px'}
                                        params="50"
                                        className={`inline`}
                                        src={`./assets/icons/119-law-judge/119-law-judge-outline.json`}>
                                    </lord-icon>
                                </span>
                                Marketplace
                            </a></Link></li>
                            <li className={`inline-block mr-5`}><Link href={`/`}><a className={`uppercase block text-sm font-medium px-3 text-gray-400 hover:text-white transition duration-500`}>
                                <span className={`border-gray-500 border rounded-full mr-3 inline-block h-14 w-14 text-center`}>
                                    <lord-icon
                                        target={`a`}
                                        animation="loop"
                                        palette="#cccccc;#3C82F6"
                                        size={'50px'}
                                        params="50"
                                        className={`inline`}
                                        src={`./assets/icons/298-coins/298-coins-outline.json`}>
                                    </lord-icon>
                                </span>
                                Tokenomics
                            </a></Link></li>
                            <li className={`inline-block mr-5`}><Link href={`/`}><a className={`uppercase block text-sm font-medium px-3 text-gray-400 hover:text-white transition duration-500`}>
                                <span className={`border-gray-500 border rounded-full mr-3 inline-block h-14 w-14 text-center`}>
                                    <lord-icon
                                        target={`a`}
                                        animation="loop"
                                        palette="#cccccc;#3C82F6"
                                        size={'50px'}
                                        params="50"
                                        className={`inline-block -ml-2`}
                                        src={`./assets/icons/262-emoji-wow/262-emoji-wow-outline.json`}>
                                    </lord-icon>
                                </span>
                                Speculation
                            </a></Link></li>
                            <li className={`inline-block text-gray-400`}><Link href={`/`}><a className={`uppercase block text-sm font-medium px-3 text-gray-400 hover:text-white transition duration-500`}>
                                <span className={`border-gray-500 border rounded-full mr-3 inline-block h-14 w-14 text-center`}>
                                    <lord-icon
                                        target={`a`}
                                        animation="loop"
                                        palette="#cccccc;#3C82F6"
                                        size={'50px'}
                                        params="50"
                                        className={`inline`}
                                        src={`./assets/icons/411-news-newspaper/411-news-newspaper-outline.json`}>
                                    </lord-icon>
                                </span>
                                Feeds
                            </a></Link></li>
                        </ul>
                    </div>
                </div>
                {/*<EcomiLogo width={`30%`} classes={`mx-auto opacity-70`} />*/}
            </header>
        </>
    )
}

export default Header