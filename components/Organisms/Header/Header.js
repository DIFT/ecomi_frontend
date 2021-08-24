import { useState } from 'react'
import Link from "next/link"
import Image from 'next/image'
import dynamic from 'next/dynamic'
import NProgress from 'nprogress'

import Router from "next/router"

NProgress.configure({ showSpinner: false });

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

import Modal from "/components/Organisms/Modals/Modals"
import { signout, isAuth } from "../../../actions/auth"
import SigninComponent from "/components/Auth/SigninComponent"
import SignupComponent from "/components/Auth/SignupComponent"
import AlertCentre from "/components/Organisms/AlertCentre/AlertCentre"

const ReactTooltip = dynamic(() => import('react-tooltip'), {
    ssr: false
});

// Icons
const CollectibleIcon = dynamic(() => import('/components/Misc/LordIcon').then((mod) => mod.CollectibleIcon), {
    ssr: false
});

const TokenomicsIcon = dynamic(() => import('/components/Misc/LordIcon').then((mod) => mod.TokenomicsIcon), {
    ssr: false
});

const MarketplaceIcon = dynamic(() => import('/components/Misc/LordIcon').then((mod) => mod.MarketplaceIcon), {
    ssr: false
});

const BellIcon = dynamic(() => import('/components/Misc/LordIcon').then((mod) => mod.BellIcon), {
    ssr: false
});

const AvatarIcon = dynamic(() => import('/components/Misc/LordIcon').then((mod) => mod.AvatarIcon), {
    ssr: false
});

const MenuIcon = dynamic(() => import('/components/Misc/LordIcon').then((mod) => mod.MenuIcon), {
    ssr: false
});

const Header = ({ setControlOverflow }) => {

    const [menuOpen, setMenuOpen] = useState(false)
    const [modalState, setModalState] = useState(false)
    const [userExists, setUserExists] = useState(false)
    const [toggleUserDD, setToggleUserDD] = useState(false)
    const [showAlerts, setShowAlerts] = useState(false)

    const userDropDown = () => {
        return(
            <div className={`bg-black p-5 absolute text-white right-2 ${toggleUserDD ? 'block' : 'hidden' }`}>
                <ul>
                    <li>Profile</li>
                    <li>Something else</li>
                    <li><button onClick={() => signout(() => Router.replace('/'))}>Signout</button></li>
                </ul>
            </div>
        )
    }

    return(
        <>
            <header className={`px-5 py-2 absolute w-full z-10 shadow`}>
            <ReactTooltip place="top" type="dark" effect="float"/>
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
                <div>
                    <nav>
                        <ul className="text-right">
                            <li className="inline-block mr-2">
                                <Link href={`/collectibles`}><a>
                                        <span className="border border-gray-500 rounded-full mr-3 inline-block text-center" data-tip={`Collectibles`} data-effect={'solid'} data-event='mouseenter mouseleave'>
                                        <CollectibleIcon
                                            size={`40px`}
                                            params={`60`}
                                            type={`outline`}
                                            palette={`#ffffff;#ffffff`}
                                        />
                                    </span>
                                </a></Link>
                            </li>
                            {/*<li className="inline-block mr-2">*/}
                            {/*    <Link href={`/tokenomics`}><a>*/}
                            {/*            <span className="border border-gray-500 rounded-full mr-3 inline-block text-center" data-tip={`Tokenomics`} data-effect={'solid'} data-event='mouseenter mouseleave'>*/}
                            {/*            <TokenomicsIcon*/}
                            {/*                size={`40px`}*/}
                            {/*                params={`60`}*/}
                            {/*                type={`outline`}*/}
                            {/*                palette={`#ffffff;#ffffff`}*/}
                            {/*            />*/}
                            {/*        </span>*/}
                            {/*    </a></Link>*/}
                            {/*</li>*/}
                            <li className="inline-block mr-2">
                                <Link href={`/marketplace/floors`}><a>
                                        <span className="border border-gray-500 rounded-full mr-3 inline-block text-center" data-tip={`Marketplace Floors`} data-effect={'solid'} data-event='mouseenter mouseleave'>
                                        <MarketplaceIcon
                                            size={`40px`}
                                            params={`60`}
                                            type={`outline`}
                                            palette={`#ffffff;#ffffff`}
                                        />
                                    </span>
                                </a></Link>
                            </li>
                            {/*<li className="inline-block mr-2">*/}
                            {/*    <Link href={`/community`}><a>*/}
                            {/*        <span className="border border-gray-500 rounded-full mr-3 inline-block text-center" data-tip={`Community`} data-effect={'solid'} data-event='mouseenter mouseleave'>*/}
                            {/*        <ChatIcon*/}
                            {/*            size={`40px`}*/}
                            {/*            params={`60`}*/}
                            {/*            type={`outline`}*/}
                            {/*            palette={`#ffffff;#ffffff`}*/}
                            {/*        />*/}
                            {/*    </span>*/}
                            {/*    </a></Link>*/}
                            {/*</li>*/}
                        </ul>

                    </nav>
                </div>
                <div>
                    {/*Login and Auth stuff will go here.*/}
                    <ReactTooltip place="top" type="dark" effect="float"/>

                    {/*Logged in and not admin*/}
                    { isAuth() && isAuth().role === 0 && (<Link href={"/user"}>Dashboard</Link>)}


                    <ul>

                        {/*<li className="inline-block mr-2 relative">*/}
                        {/*    <button onClick={e => setShowAlerts(!showAlerts)}>*/}
                        {/*            <span className="p-1 rounded-full mr-3 inline-block text-center h-9 w-9 bg-gray-700 relative">*/}
                        {/*            <BellIcon*/}
                        {/*                size={`20px`}*/}
                        {/*                params={`60`}*/}
                        {/*                type={`solid`}*/}
                        {/*                palette={`#ffffff;#ffffff`}*/}
                        {/*            />*/}
                        {/*            <span className="h-2 w-2 bg-red-500 absolute rounded-full"></span>*/}
                        {/*        </span>*/}
                        {/*    </button>*/}
                        {/*    {showAlerts ? (*/}
                        {/*        <AlertCentre />*/}
                        {/*    ) : null}*/}
                        {/*</li>*/}

                        {/*Logged in and is admin*/}
                        { isAuth() && isAuth().role === 1 && (
                            <li className="inline-block">
                                <Link href={"/admin"}><a className={`uppercase bg-yellow-500 font-bold text-xs px-3 py-2 rounded mr-3`}>Admin</a></Link>
                            </li>
                        )}

                        {/*If user is NOT logged in*/}
                        { !isAuth() && (
                            <li className="inline-block">
                                <button onClick={e => {
                                    setModalState(true)
                                    setControlOverflow(true)
                                }}>
                                            <span className="p-1 rounded-full mr-3 inline-block text-center h-9 w-9 bg-gray-700">
                                            <AvatarIcon
                                                size={`20px`}
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
                            <>
                                <li className="inline-block">
                                    <button onClick={e => setToggleUserDD(!toggleUserDD)}>
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
                                {userDropDown()}
                            </>
                        )}

                    </ul>
                </div>
            </div>
        </header>
            <Modal modalState={modalState} setModalState={setModalState} setControlOverflow={setControlOverflow}>
                {userExists ? <SigninComponent setUserExists={setUserExists} /> :  <SignupComponent setUserExists={setUserExists} />}
            </Modal>
        </>
    )
}

export default Header