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

const ReactTooltip = dynamic(() => import('react-tooltip'), {
    ssr: false
});

// Icons
const CollectibleIcon = dynamic(() => import('../../Misc/LordIcon').then((mod) => mod.CollectibleIcon), {
    ssr: false
});

const TokenomicsIcon = dynamic(() => import('../../Misc/LordIcon').then((mod) => mod.TokenomicsIcon), {
    ssr: false
});

const MarketplaceIcon = dynamic(() => import('../../Misc/LordIcon').then((mod) => mod.MarketplaceIcon), {
    ssr: false
});

const Header = ({ setControlOverflow }) => {

    return(
        <header className={`px-5 py-2 absolute w-full z-10`}>
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
                            {/*<li className="inline-block mr-2">*/}
                            {/*    <Link href={`/collectibles`}><a>*/}
                            {/*            <span className="border border-gray-500 rounded-full mr-3 inline-block text-center" data-tip={`Collectibles`} data-effect={'solid'} data-event='mouseenter mouseleave'>*/}
                            {/*            <CollectibleIcon*/}
                            {/*                size={`40px`}*/}
                            {/*                params={`60`}*/}
                            {/*                type={`outline`}*/}
                            {/*                palette={`#ffffff;#ffffff`}*/}
                            {/*            />*/}
                            {/*        </span>*/}
                            {/*    </a></Link>*/}
                            {/*</li>*/}
                            <li className="inline-block mr-2">
                                <Link href={`/tokenomics`}><a>
                                        <span className="border border-gray-500 rounded-full mr-3 inline-block text-center" data-tip={`Tokenomics`} data-effect={'solid'} data-event='mouseenter mouseleave'>
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
                </div>
            </div>
        </header>
    )
}

export default Header