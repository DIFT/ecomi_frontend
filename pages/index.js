import Default from "../components/Templates/Default"
import Head from "next/head"
import Link from "next/link"
import { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
import dynamic from "next/dynamic"
import { API } from "../config"
import moment from 'moment'
import CountUp from 'react-countup'
import PriceCard from "../components/Molecules/Cards/PriceCard"
import TeamMembers from "../components/Organisms/TeamMembers/TeamMembers"
import VeveIntro from "../components/Organisms/VeveIntro/VeveIntro"
import LatestMediumArticles from "../components/Organisms/LatestMediumArticles/LatestMediumArticles";

const CheckIcon = dynamic(() => import('../components/Misc/LordIcon').then((mod) => mod.CheckIcon), {
    ssr: false
});

const Index = () => {

    const head = () => (
        <Head>
            <title>ECOMI | VEVE | NFTS | COLLECTIBLES | ECOMI WIKI</title>
            <meta name={"description"} content={`This is the unofficial due diligence package, and rumour mill, ran by enthusiastic and optimistic ECOMI investors. We've done all the heavy lifting for you to so that you can make your own informed decision`} />
        </Head>
    )

    const [rtPrice, setRtPrice] = useState(0)
    const [prices, setPrices] = useState()
    const [exchanges, setExchanges] = useState([])

    const getOmiPrices = () => {
        fetch(`${API}/metrics/omi`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setRtPrice(data[0].price.currentPrice)
                setPrices([data[0]])
            })
            .catch(e => console.log('Failed to fetch:', e))
    }

    const getExchanges = () => {
        const exchangeList = [
            {"id": 1, "title": "BitForex", "url": "https://bitforex.com"},
            {"id": 2, "title": "AscendEx", "url": "https://ascendex.com"},
            {"id": 3, "title": "Gate.io", "url": "https://gate.io"},
            {"id": 4, "title": "OKEx", "url": "https://www.okex.com/join/1850629"},
        ]
        setExchanges(exchangeList)
    }
    
    useEffect(() => {
        getOmiPrices()
        getExchanges() // TODO: Hook this up with back end
    },[])

    const hero = () => {
        return(
            <section className={`mt-0 px-10 pb-12 sm:pb-20 text-white relative min-h-screen flex items-center`}>
                <div className={`relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto`}>
                    <img src={`./assets/images/ecomi-art.png`}  width={`50%`} className={`absolute -right-28 -bottom-96 opacity-30`} alt={"ECOMI Fan Art by OMI The Clown"}/>
                    <section>
                        <h1 className={`text-4xl sm:text-6xl lg:text-8xl leading-none font-semibold tracking-tight mb-8 sm:mb-10`}>
                            Community due diligence package for curious investors.
                        </h1>
                        <p className={`font-semibold text-2xl leading-relaxed`}>
                            This is the unofficial due diligence package, and rumour mill, ran by enthusiastic and optimistic ECOMI investors.
                            We've done all the heavy lifting for you to so that you can make your own informed decision.
                            You can also view the <a href={`https://drive.google.com/file/d/1UNE-EvjuMIaWJUfvF3qQiTe0OKLFAJXV/view`} target={'_blank'} className={`text-pink-500 font-semibold`}>official whitepaper here</a>.
                        </p>
                    </section>

                    {omiTokenMetrics()}

                    <section className={`mb-16`}>
                        <small className="text-sm font-semibold tracking-wide uppercase mb-2 text-gray-300 block">Did you know?</small>
                        <p className={`font-normal text-xl`}>If you had chosen to invest just $10,000 into the OMI token {moment("20210131", "YYYYMMDD").fromNow()}, today your investment would be worth a staggering {" "}
                            <strong className={`sm:px-2 my-2 mt-2 inline-block bg-green-300 rounded-xl text-green-800 text-2xl leading-relaxed`}>
                                $<CountUp end={333555703.802535 * rtPrice} duration={2.75} separator="," decimals={4} decimal="."/>
                            </strong>
                            {" "}
                            <span className={`cursor-pointer`} data-tip={`ECOMI is <strong>not</strong> a public company, any dicussion of investment is regarding the OMI token.`} data-html={true} data-event='click focus'>
                                <CheckIcon />
                            </span>
                        </p>
                    </section>

                    <section>
                        <small className={`block text-base`}>ECOMI(OMI) is currently available to buy on the following exchanges
                            <span className={`cursor-pointer`} data-tip={`Verified by <strong className="font-bold z-10">Coin Market Cap</strong> <a href="https://coinmarketcap.com/currencies/ecomi/markets/" target="_blank" class="text-pink-500">https://coinmarketcap.com/currencies/ecomi/markets/</a>`} data-html={true} data-event='click focus'>
                                    <CheckIcon />
                            </span>
                        </small>
                        <ul className={`my-5`}>
                            {exchanges && exchanges.map(exchange => <li key={exchange.id} className={`inline-block mr-3`}>
                                <a href={exchange.url} target={"_blank"} className="bg-pink-500 hover:bg-pink-700 text-white font-base py-2 px-4 rounded-full font-semibold text-sm">{exchange.title}</a>
                            </li>)}
                        </ul>
                    </section>

                </div>
            </section>
        )
    }

    const ecomiIntro = () => {
        return(
            <section className={`px-10 text-white pt-16 pb-12 relative`} style={{ overflowX: 'clip'}}>
                <div className={`space-y-20 sm:space-y-32 md:space-y-40 lg:space-y-44 overflow-hidden`}>
                    <div className={`relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto`}>
                        <div className={`text-gray-300`}>
                            <h1 className="text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white ">ECOMI</h1>
                            <small className={`block mt-3 mb-8 sm:mb-10 text-gray-300`}><strong>TLDR:</strong> ECOMI is the company. VEVE is the application. OMI is the token.</small>
                            <div className="text-white">
                                <p className={`font-semibold text-2xl leading-relaxed mb-8`}>
                                    ECOMI is a Singapore registered business, operated and supported by ORBIS Blockchain Technology Ltd
                                    <span className={`cursor-pointer`} data-tip={`Verified <strong className="font-bold">ECOMI TECHNOLOGY PTE. LTD</strong> via <a href="https://www.tis.bizfile.gov.sg/ngbtisinternet/faces/oracle/webcenter/portalapp/pages/TransactionMain.jspx?selectedETransId=dirSearch" target="_blank" class="text-blue-400">bizfile.gov.sg</a>`} data-html={true} data-event='click focus'>
                                    <CheckIcon />
                                    </span>.
                                    ORBIS is a registered company in New Zealand.
                                </p>

                                <p className="mb-8 text-xl">
                                    ECOMI’s aim is to create the world’s best platform to purchase, protect and collect premium
                                    licensed digital collectibles using Distributed Ledger Technology. ECOMI consists of two elements, the <a href={`https://www.veve.me`} target="_blank" className={`text-pink-500 font-semibold`}>VEVE application</a> and the <a href={`https://securewallet.shop`} className={`text-pink-500 font-semibold`} target={"_blank"}>ECOMI Secure Storage Wallet</a>
                                </p>

                                <p className="mb-8 text-xl">
                                    In 2017 ECOMI identified a gap in the market for premium digital collectibles
                                    <span className={`inline-block cursor-pointer`} data-tip={`Source: <a href="https://medium.com/ecomi/why-collectables-are-going-digital-and-how-you-can-own-your-own-37b1cc30b0f7" target="_blank" class="text-blue-400">https://medium.com/ecomi/why-collectables-are-going-digital-and-how-you-can-own-your-own-37b1cc30b0f7</a>`} data-html={true} data-event='click focus'>
                                        <CheckIcon />
                                    </span>
                                    , or NFTs to you and me. After identifying this gap, and predicting the rise of the technology, they started development on an end-to-end digital collectible ecosystem called VEVE.
                                </p>

                                <p className="mb-8 text-xl">
                                    The VEVE ecosystem offers IP licensors and collectors a new type of digital asset class which is powered by blockchain technology for legitimate authenticity and scarcity. The entire ecosystem is underpinned by the deflationary OMI token and comprosies of some interesting tokenomics, which you can <Link href={`/tokenomics`}><a className={`text-pink-500`}>learn more about here</a></Link>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    const ecomiMediumArticles = () => {
        return(
            <section className={`mb-16 xl:-mt-44 z-10`}>
                <LatestMediumArticles mediumUser={`ecomi`} title={`Latest ECOMI Medium articles`} />
            </section>
        )
    }

    const omiTokenMetrics = () => {
        return (
            <section className={`text-white relative`} style={{ overflowX: 'clip'}}>
                <div className={`space-y-20 sm:space-y-32 md:space-y-40 lg:space-y-44 overflow-hidden`}>
                    <div className={`relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto`}>
                        <div className={`mb-14 sm:mb-20 xl:mb-8 text-gray-300`}>
                            <small className={`block mt-5 mb-2 sm:mb-5 text-gray-300`}>OMI token metrics as of June 21st 2021, 8:59:18 pm <a href={`https://www.coinbase.com/price/ecomi`} target={"_blank"} className={`text-pink-500 font-semibold`}>(https://www.coinbase.com/price/ecomi)</a></small>

                            <ul className={`grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6`}>
                                <li><PriceCard value={rtPrice && rtPrice.toString().substring(0,8)} label={`OMI Price`} suffix={"$"} /></li>
                                <li><PriceCard value={prices && prices[0].price.percent_change_1h.toString().substring(0,6)} label={`1 hour change`} prefix={"%"} /></li>
                                <li><PriceCard value={prices && prices[0].price.percent_change_24h.toString().substring(0,6)} label={`24 hour change`} prefix={"%"} /></li>
                                <li><PriceCard value={prices && prices[0].price.percent_change_7d.toString().substring(0,6)} label={`7 day change`} prefix={"%"} /></li>
                                <li><PriceCard value={prices && prices[0].price.percent_change_30d.toString().substring(0,6)} label={`30 day change`} prefix={"%"} /></li>
                                <li><PriceCard value={prices && prices[0].price.percent_change_60d.toString().substring(0,6)} label={`60 day change`} prefix={"%"} /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return(
        <>
            {head()}
            <Default>
                <ReactTooltip clickable={true} />
                {hero()}
                {ecomiMediumArticles()}
                {ecomiIntro()}
                <TeamMembers />
                <VeveIntro />
            </Default>
        </>

    )
}

export default Index