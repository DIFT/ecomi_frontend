import { useEffect, useState } from 'react'
import moment from "moment"
import { getVeveMetrics } from "../../../actions/metrics/metrics"
import PriceCard from "../../Molecules/Cards/PriceCard";

const VeveIntro = () => {

    const VeveIntroStripSection = () => {
        return(
            <section className={`pt-4 pb-4 sm:pt-5 md:pt-6 xl:pt-8 sm:pb-5 bg-gray-900 borer-t border-b border-black text-white text-center shadow-inner shadow-lg`}>
                <div className="container">
                    <small className={`block mb-5 text-sm text-gray-300`}>The ECOMI team presents...</small>
                    <h1 className="text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-gray-900 mb-8 sm:mb-10">
                        <img src={`./assets/images/veve-logo--white.png`} width={`300`} className={`mx-auto`} alt={`VEVE`} />
                    </h1>
                    <p className={`font-base text-xl leading-relaxed`}>
                        VEVE is an app-based marketplace available on iOS and Android for premium <strong>licensed</strong> digital collectibles (Non-Fungible Tokens/NFTs).
                        With VEVE, users can obtain common, rare, or one-of-a-kind digital collectibles, customise and showcase them in the virtual showrooms,
                        as well as buy, sell or trade collectibles with other VEVE users.
                    </p>

                    <ul className={`my-10`}>
                        <li className={`inline-block mr-3`}><a href="#" target={"_blank"} className={`border border-white text-white font-base py-2 px-4 rounded-full font-semibold`}>Google play</a></li>
                        <li className={`inline-block`}><a href="#" target={"_blank"} className={`border border-white text-white font-base py-2 px-4 rounded-full font-semibold`}>App store</a></li>
                    </ul>
                </div>
            </section>
        )
    }

    const VeveMetricsSection = () => {
        const [vevemetrics, setVeveMetrics] = useState()

        useEffect(() => {
            getVeveMetrics()
                .then(data => {
                    console.log('Metric data is: ', data)
                    setVeveMetrics(data)
                })
                .catch((e) => console.log('Error getting veve metrics: ', e))

        },[])

        return(
            <section className={`pt-4 pb-4 sm:pt-5 md:pt-6 xl:pt-8 sm:pb-5 text-white mt-10`}>
                <div className="container">

                    <small className="block mt-5 mb-2 sm:mb-5 text-gray-300">
                        VEVE metrics as of {moment(vevemetrics && vevemetrics.revenue.last_updated).format('MMMM Do YYYY, h:mm:ss a')} (<a href={"https://cutt.ly/wbT97hb"} target={"_blank"} className={`text-pink-500`}>https://cutt.ly/wbT97hb</a>)
                    </small>

                    <ul className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6`}>
                        <li><PriceCard value={vevemetrics && vevemetrics.revenue.currentStoreRevenue.toLocaleString()} label={`Total sales`} suffix={"$"} classes={`text-green-500`} /></li>
                        <li><PriceCard value={vevemetrics && vevemetrics.revenue.twenty_four_hour_change.toFixed(3)} label={`24 hour change`} prefix={"%"} /></li>
                        <li><PriceCard value={vevemetrics && vevemetrics.revenue.seven_day_change.toFixed(3)} label={`7 day change`} prefix={"%"} /></li>
                        <li><PriceCard value={vevemetrics && vevemetrics.revenue.thirty_day_change.toFixed(3)} label={`30 day change`} prefix={"%"} /></li>
                        <li><PriceCard value={vevemetrics && vevemetrics.nfts.currentNFTSales.toLocaleString()} label={`No. NFT sales`} classes={`text-green-500`} /></li>
                        <li><PriceCard value={vevemetrics && vevemetrics.nfts.thirty_day_change_nft.toFixed(3)} label={`30 day change`} prefix={"%"} /></li>
                    </ul>

                </div>
            </section>
        )
    }

    const VeveMarketSection = () => {
        return(
            <section className={`pt-4 pb-4 sm:pt-5 md:pt-6 xl:pt-8 sm:pb-5 text-white mt-10`}>
                <div className="container">

                    <h4 className={`text-2xl font-semibold mb-3 uppercase`}>$370 Billion dollar market</h4>

                    <p className="mb-8 text-xl">
                        The collectibles industry is said to be worth approximately $370 billion dollars as of March 2020.
                        VEVE identified a gap in this market for premium digital collectibles backed by blockchain technology, which allows uniqueness,
                        scarcity and accurate provenance of collectibles. The rise of NFT popularity in 2021 is thought to exponentially increase this
                        industry worth over the coming years. VEVE have positioned themselves to be a front runner for the premium digital collectible
                        format due to their early foresight in 2017.
                    </p>

                    <p className="mb-8 text-xl">
                        Using the VEVE app collectible enthusiasts and hobbyists can purchase a multitude of collectibles from their favourite brands.
                        Each collectible is minted within a limited number of availability and is assigned a type of rarity typically associated with
                        collectibles. The app was officially launched in October 2020 and regularly drops new collectibles every Thursday 4pm GMT - <strong>The drops reguarly sell out within minutes!</strong>
                    </p>

                </div>
            </section>
        )
    }

    return(
        <>
            {VeveIntroStripSection()}
            {VeveMetricsSection()}
            {VeveMarketSection()}
        </>
    )
}

export default VeveIntro