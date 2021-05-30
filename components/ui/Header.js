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

// Icons
const LinkIcon = dynamic(() => import('../LordIcon').then((mod) => mod.LinkIcon), {
    ssr: false
});

const CollectibleIcon = dynamic(() => import('../LordIcon').then((mod) => mod.CollectibleIcon), {
    ssr: false
});

const TokenomicsIcon = dynamic(() => import('../LordIcon').then((mod) => mod.TokenomicsIcon), {
    ssr: false
});

const MarketplaceIcon = dynamic(() => import('../LordIcon').then((mod) => mod.MarketplaceIcon), {
    ssr: false
});

const AvatarIcon = dynamic(() => import('../LordIcon').then((mod) => mod.AvatarIcon), {
    ssr: false
});

const MenuIcon = dynamic(() => import('../LordIcon').then((mod) => mod.MenuIcon), {
    ssr: false
});


const Header = ({setControlOverflow}) => {

    const [menuOpen, setMenuOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const loginModal = (e) => {
        e.preventDefault()
    }
    return(
        <>
            <header className={`px-5 py-2 absolute w-full z-10 border-b border-gray-600`}>
                <div className="flex justify-between items-center">
                    <div>
                        <Link href={`/`}><a>
                            <h1 className={`ecomiFont flex align-center items-center`}>
                                <Image
                                    src="/assets/images/ecomi-rings-white.svg"
                                    alt="Ecomi Wiki logo"
                                    width={30}
                                    height={30}
                                    className={`inline-block mr-2`}
                                />
                                <span className={`font-extrabold text-base text-white inline-block ml-2`}>ECOMI</span>
                                <span className={`text-gray-300 text-base font-medium inline-block ml-1`}>WIKI</span>
                            </h1>
                        </a></Link>
                    </div>
                    <div>
                        <nav>
                            <ul className="text-right">
                                <li className="inline-block mr-2">
                                    <Link href={`/ecomi/collectibles`}><a>
                                        <span className="border border-gray-500 rounded-full mr-3 inline-block text-center">
                                        <CollectibleIcon
                                            size={`40px`}
                                            params={`60`}
                                            type={`outline`}
                                            palette={`#ffffff;#ffffff`}
                                        />
                                    </span>
                                    </a></Link>
                                </li>
                                <li className="inline-block mr-2">
                                    <Link href={`/ecomi/tokenomics`}><a>
                                        <span className="border border-gray-500 rounded-full mr-3 inline-block text-center">
                                        <TokenomicsIcon
                                            size={`40px`}
                                            params={`60`}
                                            type={`outline`}
                                            palette={`#ffffff;#ffffff`}
                                        />
                                    </span>
                                    </a></Link>
                                </li>
                                <li className="inline-block mr-2">
                                    <Link href={`/ecomi/marketplace`}><a>
                                        <span className="border border-gray-500 rounded-full mr-3 inline-block text-center">
                                        <MarketplaceIcon
                                            size={`40px`}
                                            params={`60`}
                                            type={`outline`}
                                            palette={`#ffffff;#ffffff`}
                                        />
                                    </span>
                                    </a></Link>
                                </li>
                            </ul>

                        </nav>
                    </div>
                    <div>

                        {/*Logged in and not admin*/}
                        { isAuth() && isAuth().role === 0 && (<Link href={"/user"}>Dashboard</Link>)}
                        {/*Logged in and is admin*/}
                        { isAuth() && isAuth().role === 1 && (<Link href={"/admin"}>Admin</Link>)}

                        {/* If user is logged in*/}
                        { isAuth() && (
                            <button onClick={() => signout(() => Router.replace('/signin'))}>Signout</button>
                        )}

                        <ul>
                            { !isAuth() && (
                                <li className="inline-block">
                                    <button onClick={e => {
                                        setModalOpen(true)
                                        setControlOverflow(true)
                                    }}>
                                            <span className="border border-gray-500 rounded-full inline-block text-center">
                                            <AvatarIcon
                                                size={`30px`}
                                                params={`60`}
                                                type={`solid`}
                                                palette={`#ffffff;#ffffff`}
                                            />
                                        </span>
                                    </button>
                                </li>
                            )}

                            {/* If user is logged in*/}
                            { isAuth() && (
                                <li className="inline-block">
                                    <button>
                                            <span className="border border-gray-500 rounded-full inline-block text-center">
                                                <AvatarIcon
                                                    size={`30px`}
                                                    params={`60`}
                                                    type={`solid`}
                                                    palette={`#ffffff`}
                                                />
                                        </span>
                                    </button>
                                </li>
                                // <button onClick={() => signout(() => Router.replace('/signin'))}>Signout</button>
                            )}

                        </ul>
                        {/*<nav>*/}
                        {/*    <ul className={`text-right text-white`}>*/}
                        {/*        <li className={`inline-block mr-5`}><Link href={`/`}><a className={`uppercase block text-sm font-medium px-3 text-gray-400 hover:text-white transition duration-500`}>*/}
                        {/*            <span className={`border-gray-500 border rounded-full mr-3 inline-block h-14 w-14 text-center`}>*/}
                        {/*                <lord-icon*/}
                        {/*                    target={`a`}*/}
                        {/*                    animation="loop"*/}
                        {/*                    palette="#cccccc;#3C82F6"*/}
                        {/*                    size={'50px'}*/}
                        {/*                    params="50"*/}
                        {/*                    className={`inline`}*/}
                        {/*                    src={`./assets/icons/298-coins/298-coins-outline.json`}>*/}
                        {/*                </lord-icon>*/}
                        {/*            </span>*/}
                        {/*            Tokenomics*/}
                        {/*        </a></Link></li>*/}
                        {/*        <li className={`inline-block mr-5`}><Link href={`/`}><a className={`uppercase block text-sm font-medium px-3 text-gray-400 hover:text-white transition duration-500`}>*/}
                        {/*            <span className={`border-gray-500 border rounded-full mr-3 inline-block h-14 w-14 text-center`}>*/}
                        {/*                <lord-icon*/}
                        {/*                    target={`a`}*/}
                        {/*                    animation="loop"*/}
                        {/*                    palette="#cccccc;#3C82F6"*/}
                        {/*                    size={'50px'}*/}
                        {/*                    params="50"*/}
                        {/*                    className={`inline-block -ml-2`}*/}
                        {/*                    src={`./assets/icons/262-emoji-wow/262-emoji-wow-outline.json`}>*/}
                        {/*                </lord-icon>*/}
                        {/*            </span>*/}
                        {/*            Speculation*/}
                        {/*        </a></Link></li>*/}
                        {/*        <li className={`inline-block text-gray-400`}><Link href={`/`}><a className={`uppercase block text-sm font-medium px-3 text-gray-400 hover:text-white transition duration-500`}>*/}
                        {/*            <span className={`border-gray-500 border rounded-full mr-3 inline-block h-14 w-14 text-center`}>*/}
                        {/*                <lord-icon*/}
                        {/*                    target={`a`}*/}
                        {/*                    animation="loop"*/}
                        {/*                    palette="#cccccc;#3C82F6"*/}
                        {/*                    size={'50px'}*/}
                        {/*                    params="50"*/}
                        {/*                    className={`inline`}*/}
                        {/*                    src={`./assets/icons/411-news-newspaper/411-news-newspaper-outline.json`}>*/}
                        {/*                </lord-icon>*/}
                        {/*            </span>*/}
                        {/*            Feeds*/}
                        {/*        </a></Link></li>*/}
                        {/*        <li className={`inline-block`}><Link href={`/donate`}><a className={`uppercase inline-block text-sm font-medium pl-3 text-gray-400 hover:text-white transition duration-500`}>*/}
                        {/*            <span className={`inline-block h-14 text-center`}>*/}
                        {/*                <lord-icon*/}
                        {/*                    animation="auto"*/}
                        {/*                    palette="#db2777;#3C82F6"*/}
                        {/*                    size={'50px'}*/}
                        {/*                    params="100"*/}
                        {/*                    className={`inline`}*/}
                        {/*                    src={`./assets/icons/20-love-heart/20-love-heart-solid.json`}>*/}
                        {/*                </lord-icon>*/}
                        {/*            </span>*/}
                        {/*        </a></Link></li>*/}
                        {/*    </ul>*/}
                        {/*</nav>*/}

                    </div>
                </div>
                {/*<EcomiLogo width={`30%`} classes={`mx-auto opacity-70`} />*/}
            </header>
            {modalOpen ? (<div className={`fixed bg-black bg-opacity-75 z-50 inset-0`}>
                Modal is open yo.
            </div>) : null}
        </>
    )
}

export default Header