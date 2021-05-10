import Default from "../templates/Default"
import Link from "next/link"
import { useState, useEffect } from 'react'
import moment from 'moment'
import CountUp from 'react-countup';
import VeveOverview from "../blocks/VeveOverview";
moment().format()
import { isChangeGoodOrBad } from "../utils";
import { API } from "../config"

const Index = () => {

    const [rtPrice, setRtPrice] = useState(0)
    const [prices, setPrices] = useState()

    const getData = () => {
        fetch(`${API}/metrics/omi`, {
            method: 'GET',
            headers: {
                'X-CMC_PRO_API_KEY': 'c867dd02-79fe-449c-8e65-02040c1534fd',
                'Accepts': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setRtPrice(data[0].price.currentPrice)
                setPrices([data[0]])
            })
            .catch(e => console.log('Failed to fetch:', e))
    }
    useEffect(() => {
        getData()
    },[])

    const omiTokenMetrics = () => {
        return(
            <div className={`mb-14 sm:mb-20 xl:mb-8`}>
                <span className={`block mb-3 text-xs`}>OMI token metrics as of {moment().format('MMMM Do YYYY, h:mm:ss a')} (<a href={"https://www.coinbase.com/price/ecomi"} target={"_blank"} className={`text-blue-500`}>https://www.coinbase.com/price/ecomi</a>)</span>
                <div className={`relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto`}>
                    <ul className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6`}>
                        <li className={`bg-white text-gray-400 leading-6 py-3 sm:px-3 rounded-xl shadow`}>
                            <span className={`block text-sm`}>OMI Price</span>
                            <span className={`block text-3xl text-green-400`}>${rtPrice && rtPrice.toString().substring(0,8)}</span>
                        </li>
                        <li className={`bg-white text-gray-400 leading-6 py-3 sm:px-3 rounded-xl shadow`}>
                            <span className={`block text-sm`}>1 hour change</span>
                            <span className={`block text-3xl ${isChangeGoodOrBad(prices && prices[0].price.percent_change_1h)}`}>{prices && prices[0].price.percent_change_1h.toString().substring(0,6)}%</span>
                        </li>
                        <li className={`bg-white text-gray-400 leading-6 py-3 sm:px-3 rounded-xl shadow`}>
                            <span className={`block text-sm`}>24 hour change</span>
                            <span className={`block text-3xl ${isChangeGoodOrBad(prices && prices[0].price.percent_change_24h)}`}>{prices && prices[0].price.percent_change_24h.toString().substring(0,6)}%</span>
                        </li>
                        <li className={`bg-white text-gray-400 leading-6 py-3 sm:px-3 rounded-xl shadow`}>
                            <span className={`block text-sm`}>7 day change</span>
                            <span className={`block text-3xl ${isChangeGoodOrBad(prices && prices[0].price.percent_change_7d)}`}>{prices && prices[0].price.percent_change_7d.toString().substring(0,6)}%</span>
                        </li>
                        <li className={`bg-white text-gray-400 leading-6 py-3 sm:px-3 rounded-xl shadow`}>
                            <span className={`block text-sm`}>30 day change</span>
                            <span className={`block text-3xl ${isChangeGoodOrBad(prices && prices[0].price.percent_change_30d)}`}>{prices && prices[0].price.percent_change_30d.toString().substring(0,6)}%</span>
                        </li>
                        <li className={`bg-white text-gray-400 leading-6 py-3 sm:px-3 rounded-xl shadow`}>
                            <span className={`block text-sm`}>60 day change</span>
                            <span className={`block text-3xl ${isChangeGoodOrBad(prices && prices[0].price.percent_change_60d)}`}>{prices && prices[0].price.percent_change_60d.toString().substring(0,6)}%</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    const ecomiOverview = () => {
        return(
            <section className={`bg-gray-50 pt-16 pb-12 sm:pt-20 md:pt-24 xl:pt-32 sm:pb-20 relative border-t border-b`} style={{ overflowX: 'clip'}}>
                <div className="ecomi-rings">
                    <img src={`./assets/images/ecomi-art.png`} />
                </div>
                <div className={`space-y-20 sm:space-y-32 md:space-y-40 lg:space-y-44 overflow-hidden`}>
                    <div className={`relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto`}>
                        <div className={`px-4 sm:px-6 md:px-8 mb-14 sm:mb-20 xl:mb-8`}>
                            <div className={`w-12 h-12 rounded-xl mb-8 bg-gradient-to-br flex items-center justify-center from-blue-400 to-blue-600 mb-8 p-2`}>
                                <img src={`./assets/images/ecomi-rings-white.svg`} />
                            </div>
                            <small className="sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-blue-600 mb-3 block">Introducing...</small>
                            <h1 className="text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-gray-900 ">ECOMI</h1>
                            <small className={`block mb-8 sm:mb-10 text-gray-400`}><strong>TLDR:</strong> ECOMI is the company. VEVE is the application. OMI is the token.</small>

                            <p className="max-w-screen-lg text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11">
                                ECOMI is a Singapore registered business
                                <span className={`cursor-pointer`} data-tip={`Verified <strong className="font-bold">ECOMI TECHNOLOGY PTE. LTD</strong> via <a href="https://www.tis.bizfile.gov.sg/ngbtisinternet/faces/oracle/webcenter/portalapp/pages/TransactionMain.jspx?selectedETransId=dirSearch" target="_blank" class="text-blue-400">bizfile.gov.sg</a>`} data-html={true} data-event='click focus'>
                                    <lord-icon
                                        animation="click"
                                        palette="#34D399"
                                        size={'30px'}
                                        params="30"
                                        className={`inline`}
                                        src={`./assets/icons/24-approved-checked/24-approved-checked-solid.json`}>
                                    </lord-icon>
                                </span>
                                , operated and supported by ORBIS Blockchain
                                Technology Ltd. ORBIS is a registered company in New Zealand with offices in Auckland, New York,
                                Taipei and Shanghai.
                            </p>

                            <p className="max-w-screen-lg leading-relaxed mb-8 text-lg">
                                ECOMI’s aim is to create the world’s best platform to purchase, protect and collect premium
                                licensed digital collectibles using Distributed Ledger Technology. ECOMI consists of two elements, the <a href={`https://www.veve.me`} target="_blank" className={`text-blue-500`}>VEVE ecosystem</a> and the <a href={`https://securewallet.shop`} className={`text-blue-500`} target={"_blank"}>ECOMI Secure Storage Wallet</a>
                            </p>

                            <p className="max-w-screen-lg leading-relaxed mb-8 text-lg">
                                In 2017 ECOMI identified a gap in the market for premium digital collectibles
                                <span className={`inline-block cursor-pointer`} data-tip={`Source: <a href="https://medium.com/ecomi/why-collectables-are-going-digital-and-how-you-can-own-your-own-37b1cc30b0f7" target="_blank" class="text-blue-400">https://medium.com/ecomi/why-collectables-are-going-digital-and-how-you-can-own-your-own-37b1cc30b0f7</a>`} data-html={true} data-event='click focus'>
                                    <lord-icon
                                        animation="click"
                                        palette="#34D399"
                                        size={'30px'}
                                        params="30"
                                        className={`inline`}
                                        src={`./assets/icons/24-approved-checked/24-approved-checked-solid.json`}>
                                    </lord-icon>
                                </span>, or NFTs to you and me. After identifying this gap, and predicting the rise of the technology, they started development on an end-to-end digital collectible ecosystem called VEVE. <span className={`text-xs block`}>(Formelly 'Ecomi Collect')</span>
                            </p>

                            <p className="max-w-screen-lg leading-relaxed mb-8 text-lg">
                                The VEVE ecosystem offers IP licensors and collectors a new type of digital asset class which is powered by blockchain technology for legitimate authenticity and scarcity.
                            </p>

                            {omiTokenMetrics()}
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    const meetTheTeam = () => {
        return(
            <section className={`relative z-10 text-center max-w-screen-lg xl:max-w-screen-xl mx-auto pt-16 sm:pt-20 md:pt-24 xl:pt-32`}>
                <div className={`px-4 sm:px-6 md:px-8`}>

                    <div className={`w-12 h-12 rounded-xl mb-8 bg-gradient-to-br flex items-center justify-center from-gray-400 to-gray-600 mb-8 p-2 mx-auto`}>
                        <lord-icon
                            animation="hover"
                            palette="#ffffff"
                            size={'50px'}
                            className={`inline`}
                            src={`./assets/icons/44-avatar-user-in-circle/44-avatar-user-in-circle-solid.json`}>
                        </lord-icon>
                    </div>
                    <h2 className={`text-3xl sm:text-5xl lg:text-6xl leading-none font-medium text-gray-900 tracking-tight mb-8`}>Key Team Members.</h2>

                    <div className="grid grid-cols-3">
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                    </div>

                </div>
            </section>
        )
    }

    return(
        <Default>
            <div className={`space-y-20 sm:space-y-32 md:space-y-40 lg:space-y-44 overflow-hidden pb-12 sm:pb-20`}>
                <header className={`relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto`}>
                    <div className={`px-4 sm:px-6 md:px-8 mb-14 sm:mb-20 xl:mb-8`}>
                        <h1 className={`ecomiFont text-2xl font-medium block mb-0 mt-14 text-gray-400`}>
                            <img src={`./assets/images/ecomi.png`} width={`50`} className={`inline-block mr-3`}/>
                            <span className={`text-gray-900 font-extrabold`}>ECOMI</span> INVESTORS
                        </h1>
                        <h1 className={`text-4xl sm:text-6xl lg:text-7xl leading-none font-medium tracking-tight text-gray-900 mt-10 mb-8 sm:mt-10 sm:mb-10`}>
                            Community due diligence package for curious investors.
                        </h1>
                        <p className={`max-w-screen-lg text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11`}>
                            This is the <strong className={`text-black`}>unofficial</strong> due diligence package and rumour mill ran by enthusiastic and optimistic Ecomi investors. We've done all the heavy lifting for you to so that you can make your own informed decision. You can also view the <a href={`https://drive.google.com/file/d/1UNE-EvjuMIaWJUfvF3qQiTe0OKLFAJXV/view`} target={'_blank'} className={`text-blue-500`}>official whitepaper here</a>.
                        </p>
                        <small className="text-sm font-semibold tracking-wide uppercase mb-4">Did you know?</small>
                        <p className={`max-w-screen-lg text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11`}>
                            If you had chosen to invest just <strong className={`text-gray-900`}>$10,000</strong> into ECOMI {moment("20210131", "YYYYMMDD").fromNow()}, today your investment would be worth a staggering <strong className={`sm:px-2 sm:py-2 inline-block bg-gray-50 border border-gray-200 rounded-xl text-green-400 text-lg sm:text-3xl`}>$<CountUp end={333555703.802535 * rtPrice} duration={2.75} separator="," decimals={4} decimal="."/></strong>
                        </p>
                        <p className={`max-w-screen-lg text-lg mb-0 sm:mb-2`}>ECOMI(OMI) is currently available to buy on the following exchanges</p>
                        <ul className={`flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 text-center`}>
                            <li className={`inline-block`}>
                                <Link href={`https://ascendex.com/`} ><a className={`bg-gray-900 block p-2 h-full rounded-lg border-2 border-gray-700`} target={'_blank'}><img src={`./assets/images/exchanges/ascendex.png`} width={`100`} /></a></Link>
                            </li>
                            <li className={`inline-block`}>
                                <Link href={`https://bitforex.com/`} ><a className={`w-full sm:w-auto flex-none bg-gray-50 text-gray-400 hover:text-gray-900 font-mono leading-6 py-3 sm:px-3 border border-gray-200 rounded-xl flex items-center justify-center space-x-2 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200`} target={'_blank'}><img src={`./assets/images/exchanges/bitforex.svg`} width={`100`} /></a></Link>
                            </li>
                        </ul>
                    </div>
                </header>
            </div>
            {ecomiOverview()}
            <VeveOverview />
            {/*<Link href="/signup">Signup</Link>*/}
        </Default>
    )
}

export default Index