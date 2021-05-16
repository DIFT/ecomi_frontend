import { useEffect, useState } from 'react'
import PhoneApplication from "../components/veve-ui/PhoneApplication";
import ReactTooltip from "react-tooltip";
import moment from "moment";
import { isChangeGoodOrBad } from "../utils";
import BrandsBlock from "./BrandsBlock";

const VeveOverview = () => {

    const [tab, setTab] = useState(1)

    const toggleTab = (tab) => {
        setTab(tab)
    }

    const storeBlock = () => {
        return(
            <div className={`${tab === 1 ? 'block' : 'hidden'}`}>
                <small className={`sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-purple-500 mb-3 block`}>Grow your collection</small>
                <h2 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>Store front</h2>
                <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11 text-gray-400`}>
                    Users can browse collectibles from their favorite brands in premium digital format and grow their collections.
                </p>
                <p className={`leading-relaxed mb-8 text-lg`}>
                    Upon opening the VEVE app users are immediately presented with featured premium brands and collectibles, upcoming drops and powerful filtering methods. Users can easily navigate and browse digital collectibles offered, including those which are no longer available through the primary VEVE store front.
                </p>
            </div>
        )
    }

    const collectionBlock = () => {
        return(
            <div className={`${tab === 2 ? 'block' : 'hidden'}`}>
                <div className={`flex-1`}>
                    <small className={`sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-blue-500 mb-3 block`}>Interactive NFTs</small>
                    <h2 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>Collection</h2>
                    <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11`}>
                        Users can put their collection on display in their own virtual 3D showrooms. Customize, decorate, create and share.
                    </p>
                    <p className={`leading-relaxed mb-8 text-lg`}>
                        One of the key USPs of VEVE is the rich functionality offered within the application. Users can interact with their collectibles, arrange, scale and pose within a VR showroom or using augmented reality. Users can then create sharable content to show their collection off to the world.
                    </p>
                </div>
            </div>
        )
    }

    const feedBlock = () => {
        return(
            <div className={`${tab === 3 ? 'block' : 'hidden'}`}>
                <div className={`flex-1`}>
                    <small className={`sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-indigo-500 mb-3 block`}>Show 'n' tell</small>
                    <h2 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>Feed</h2>
                    <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11`}>
                        The VEVE feed is at the heart of the VEVE community. Users can utilise the feed to share content, raise discussion, like, comment and subscribe to others users.
                    </p>
                    <p className={`leading-relaxed mb-8 text-lg`}>
                        Community will play a massive part in the success of the VEVE application. VEVE is fortunate enough to have one of, if not the most, enthusiastic of communities in the market both on and off the application - this website is testament to that statement. The importance of community cannot be stressed enough and VEVE is forefronting this within their application.
                    </p>
                </div>
            </div>
        )
    }

    const marketBlock = () => {
        return(
            <div className={`${tab === 4 ? 'block' : 'hidden'}`}>
                <div className={`flex-1`}>
                    <small className={`sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-green-500 mb-3 block`}>Buy, sell and trade</small>
                    <h2 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>Market</h2>
                    <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11`}>
                        The market is the 'ebay' of digital collectibles and allows users to buy, sell and swap with each other.
                    </p>
                    <p className={`leading-relaxed mb-8 text-lg`}>
                        Users can accumulate desired NFTs through the peer 2 peer marketplace. The marketplace allows users to complete their collections or pick up collectibles that they otherwise might have missed out on.
                    </p>
                    <p className={`leading-relaxed mb-8 text-lg`}>
                        Additionally, the VEVE marketplace has already proven to generate active users an exponential gain on their original purchases. For example we recently saw the <a href={`https://twitter.com/vevecollect/status/1386265208427974657`} className={`text-blue-500`}  target={"_blank"}>'Donny' NFT from the Powerpuff Girls sell for $27,000</a>. Donny was originally priced at just $15.99 on the <a href={"https://medium.com/veve-collectibles/powerpuff-girls-series-2-f61c8d4f30e5"} className={`text-blue-500`} target={"_blank"}>VEVE drop day</a>.
                    </p>
                    <p className={`leading-relaxed mb-8 text-lg`}>
                        As the application continues to grow we expect collectibles to be more scarce in ratio to the user base, thus increasing their value more and more as time goes on. One could easily make the argument that purchasing the NFTs themselves is another solid investment choice for a quick turn around.
                    </p>
                </div>
            </div>
        )
    }

    const accountBlock = () => {
        return(
            <div className={`${tab === 5 ? 'block' : 'hidden'}`}>
                <div className={`flex-1`}>
                    <small className={`sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-yellow-600 mb-3 block`}>Management</small>
                    <h2 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>Account</h2>
                    <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11`}>
                        Manage your entire collection from your phone. Browse your collectibles, complete sets, and much more.
                    </p>
                    <p className={`leading-relaxed mb-8 text-lg`}>
                        One of the key USPs of VEVE is the rich functionality offered within the application. Users can interact with their collectibles, arrange, scale and pose within a VR showroom or using augmented reality. Users can then create sharable content to show their collection off to the world.
                    </p>
                </div>
            </div>
        )
    }

    const veveMetrics = () => {
        return(
            <div className={`pt-16 pb-12 sm:pt-20 md:pt-24 xl:pt-32 sm:pb-20 space-y-20 sm:space-y-32 md:space-y-40 lg:space-y-44`}>
                <div className={`relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto`}>
                    <span className={`block mb-3 text-xs text-white`}>VEVE metrics as of {moment().format('MMMM Do YYYY, h:mm:ss a')} (<a href={"https://cutt.ly/wbT97hb"} target={"_blank"} className={`text-blue-500`}>https://cutt.ly/wbT97hb</a>)</span>
                    <ul className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6`}>
                        <li className={`bg-gray-900 text-gray-400 leading-6 py-3 sm:px-3 rounded shadow`}>
                            <span className={`block text-sm`}>Total sales</span>
                            <span className={`block text-3xl text-green-400`}>$14,512,009</span>
                        </li>
                        <li className={`bg-gray-900 text-gray-400 leading-6 py-3 sm:px-3 rounded shadow`}>
                            <span className={`block text-sm`}>24 hour change</span>
                            <span className={`block text-3xl ${isChangeGoodOrBad(13.0)}`}>13.0%</span>
                        </li>
                        <li className={`bg-gray-900 text-gray-400 leading-6 py-3 sm:px-3 rounded shadow`}>
                            <span className={`block text-sm`}>7 day change</span>
                            <span className={`block text-3xl ${isChangeGoodOrBad(13.0)}`}>13.0%</span>
                        </li>
                        <li className={`bg-gray-900 text-gray-400 leading-6 py-3 sm:px-3 rounded shadow`}>
                            <span className={`block text-sm`}>30 day change</span>
                            <span className={`block text-3xl ${isChangeGoodOrBad(13.0)}`}>13.0%</span>
                        </li>
                        <li className={`bg-gray-900 text-gray-400 leading-6 py-3 sm:px-3 rounded shadow`}>
                            <span className={`block text-sm`}>No. NFT sales</span>
                            <span className={`block text-3xl ${isChangeGoodOrBad(514,826)}`}>532,602</span>
                        </li>
                        <li className={`bg-gray-900 text-gray-400 leading-6 py-3 sm:px-3 rounded shadow`}>
                            <span className={`block text-sm`}>30 day change</span>
                            <span className={`block text-3xl ${isChangeGoodOrBad(31.1)}`}>33.3%</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return(
        <>
            <ReactTooltip clickable={true} globalEventOff='click' />
            <section className={`pt-4 pb-4 sm:pt-5 md:pt-6 xl:pt-8 sm:pb-5 bg-gray-900 borer-t border-b border-black`}>
                <div className={`space-y-20 sm:space-y-32 md:space-y-40 lg:space-y-44`}>
                    <div className={`max-w-screen-lg xl:max-w-screen-xl mx-auto`}>
                        <div className={`px-4 sm:px-6 md:px-8 mb-14 sm:mb-20 xl:mb-8 text-center text-gray-300`}>
                            <small className="sm:text-lg sm:leading-snug text-gray-400 mb-3 block">ECOMI Presents...</small>
                            <h1 className="text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-gray-900 mb-8 sm:mb-10">
                                <img src={`./assets/images/veve-logo--white.png`} width={`200`} className={`mx-auto`} alt={`VEVE`} />
                            </h1>
                            <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11`}>VEVE is an app-based marketplace for premium <strong>licensed</strong> digital collectibles (Non-Fungible Tokens/NFTs). With VEVE, users can obtain common, rare, or one-of-a-kind digital collectibles, customise and showcase them in the virtual showrooms, as well as buy, sell or trade collectibles with other VEVE users.</p>
                            <ul className={`flex justify-center mb-10`}>
                                <li className={`inline-block mr-5`}>
                                    <a href="https://play.google.com/store/apps/details?id=com.ecomi.veve" target={"_blank"} className="flex mt-3 w-48 h-14 bg-black text-white border-gray-600 border rounded items-center justify-center">
                                        <div className="mr-3">
                                            <svg viewBox="30 336.7 120.9 129.2" width="30">
                                                <path fill="#FFD400"
                                                      d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"></path>
                                                <path fill="#FF3333"
                                                      d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"></path>
                                                <path fill="#48FF48"
                                                      d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"></path>
                                                <path fill="#3BCCFF"
                                                      d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-xs">GET IT ON</div>
                                            <div className="text-xl font-semibold font-sans -mt-1">Google Play</div>
                                        </div>
                                    </a>
                                </li>
                                <li className={`inline-block`}>
                                    <a href="https://apps.apple.com/us/app/ve-ve/id1478403837" target={"_blank"} className="flex mt-3 w-48 h-14 bg-black text-white border-gray-600 border rounded items-center justify-center">
                                        <div className="mr-3">
                                            <svg viewBox="0 0 384 512" width="30">
                                                <path fill="currentColor"
                                                      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-xs">Download on the</div>
                                            <div className="text-2xl font-semibold font-sans -mt-1">App Store</div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className={`space-y-20 sm:space-y-32 md:space-y-40 lg:space-y-44`}>
                    {veveMetrics()}
                </div>
            </section>

            <section className={`pb-12  sm:pb-20 space-y-20 sm:space-y-32 md:space-y-40 lg:space-y-44`}>
                <div className={`max-w-screen-lg xl:max-w-screen-xl mx-auto`}>
                    <div className="flex flex-wrap items-center ">
                        <div className={`mr-36`}>
                            <PhoneApplication screen={`store`} setTab={setTab} />
                        </div>
                        <div className={`flex-1 text-white`}>
                            {storeBlock()}
                            {collectionBlock()}
                            {feedBlock()}
                            {marketBlock()}
                            {accountBlock()}
                        </div>
                    </div>
                </div>
            </section>

            {/*<BrandsBlock />*/}

        </>
    )
}

export default VeveOverview