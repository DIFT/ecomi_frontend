import { useState } from 'react'
import Head from "next/head"
import Default from "../../templates/Default"
import Link from "next/link"
import dynamic from "next/dynamic";
import { readMarketplaceListing } from "../../actions/metrics/marketplace"
import { DOMAIN, APP_NAME } from '../../config'
import MarketListing from "../../templates/MarketListing";
import Image from "next/image";
import Countdown from 'react-countdown'
import {getPercentageChange, getRarityThresholds, getSerialRarity} from "../../utils";

const CollectibleValueChart = dynamic(
    () => import("../../components/ecomi/CollectibleValueChart"),
    { ssr: false }
);

const MicroChart = dynamic(
    () => import("../../components/ecomi/MicroChart"),
    { ssr: false }
);

const MarketplaceListing = ({ marketListing, query }) => {

    const head = () => (
        <Head>
            <title>{marketListing.element.collectibleType.name} | {APP_NAME}</title>
            {/*<meta name={"description"} content={`${category.name}`} />*/}
            {/*<link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />*/}
            {/*<meta property={"og:title"} content={`${category.name} | ${APP_NAME}`} />*/}
            {/*<meta property={"og:description"} content={`${category.name}`} />*/}
            {/*<meta property={"og:type"} content="website" />*/}
            {/*<meta property={"og:url"} content={`${DOMAIN}/categories/${query.slug}`} />*/}
            {/*<meta property={"og:site_name"} content={`${APP_NAME}`} />*/}

            {/*<meta property={"og:image"} content={`${APP_NAME}/blog/photo/${blog.slug}`} /> TODO: Add images and app id maybe static (public/assets/images/)*/}
            {/*<meta property={"og:image:secure_url"} content={`${APP_NAME}/blog/photo/${blog.slug}`} />*/}
            {/*<meta property={"og:image:type"} content={`image/jpg`} />*/}
            {/*<meta property={"fb:app_id"} content={`${APP_NAME}`}/>*/}
        </Head>
    )

    const previousOwnersBlock = () => {
        return(
            <>
                id: {marketListing.element.id}
                <br/>
                Previous owners: {marketListing.element.transactions.edges.length}
                <ul>
                    {marketListing.element.transactions.edges.map((owner, index) => (
                        <li key={index}>
                            Amount: {owner.node.amountUsd}
                            <br/>
                            CreatedAt: {owner.node.createdAt}
                            <br/>
                            Username: <Link href={`/ecomi/users/${owner.node.buyer.id}`}>{owner.node.buyer.username}</Link>
                            <img src={owner.node.buyer.avatar ? owner.node.buyer.avatar.url : 'default.jpg'} alt=""/>
                            <br/>
                            totalCollectibles: {owner.node.buyer.totalCollectibles}
                            <br/>
                            totalLikes: {owner.node.buyer.totalLikes}
                            <br/>
                            totalFollowers: {owner.node.buyer.totalFollowers}
                            <br/>
                            Full Sets: {owner.node.buyer.totalFullSets}
                            <br/>
                            Bio: {owner.node.buyer.bio}
                        </li>
                    ))}
                </ul>
            </>
        )
    }

    const accordion = () => {

        const [activeAccordion, setActiveAccordion] = useState(null);

        const toggleAccordion = (e, id) => {
            e.preventDefault()
            if (activeAccordion === id) {
                return setActiveAccordion(null)
            }
            setActiveAccordion(id)
        }


        return(

        <div className={`faq shadow mb-5`}>
            <header className="rounded-none box-border ">
                <button onClick={(e) => toggleAccordion(e, 'specification')} className={`uppercase text-sm block py-3 px-5 w-full text-left bg-gray-700 mt-10 rounded text-gray-300`}>
                    Specification
                </button>
            </header>
            <div className={`text-left text-gray-900 space-y-6 question transition-all duration-200 ease-in-out ${activeAccordion === 'specification' ? 'h-auto max-h-full' : 'overflow-hidden max-h-0 opacity-0'}`}>
                Specs...
            </div>
            <header className="rounded-none box-border ">
                <button onClick={(e) => toggleAccordion(e, 'historicalValueGraph')} className={`uppercase text-sm block py-3 px-5 w-full text-left bg-gray-700 mt-10 rounded text-gray-300`}>
                    Record of historic value for <span className={`font-medium text-gray-200`}>{marketListing.element.collectibleType.name}</span>
                </button>
            </header>
            <div className={`text-left text-gray-900 space-y-6 question transition-all duration-200 ease-in-out ${activeAccordion === 'historicalValueGraph' ? 'h-auto max-h-full' : 'overflow-hidden max-h-0 opacity-0'}`}>
                <CollectibleValueChart
                    historicalValue={marketListing.element.transactions.edges}
                    storePrice={marketListing.element.collectibleType.storePrice}
                />
            </div>
            <header className="rounded-none box-border ">
                <button onClick={(e) => toggleAccordion(e, 'transactionHistory')} className={`uppercase text-sm block py-3 px-5 w-full text-left bg-gray-700 mt-10 rounded text-gray-300`}>
                    Transaction history
                </button>
            </header>
            <div className={`text-left text-gray-900 space-y-6 question transition-all duration-200 ease-in-out ${activeAccordion === 'transactionHistory' ? 'h-auto max-h-full' : 'overflow-hidden max-h-0 opacity-0'}`}>
                {previousOwnersBlock()}
            </div>
        </div>
        )
    }

    return(
        <>
            {head()}
            <Default>
                <article>
                    <div className={`relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto text-white`}>
                        <div className="grid grid-cols-5 gap-20">
                            <div className={`col-span-2`}>
                                <img
                                    src={marketListing.element.collectibleType.image.url}
                                    alt={marketListing.element.collectibleType.name}
                                    title={marketListing.element.collectibleType.name}
                                    width={`100%`}
                                    className={`rounded-md veve-card`}
                                />
                            </div>
                            <div className={`col-span-3`}>
                                <Link href={`/ecomi/brands/${marketListing.element.collectibleType.brand.id}`}><a className={`text-blue-500`}>
                                    <img src={marketListing.element.collectibleType.brand.image.url} alt={marketListing.element.collectibleType.brand.name} width={`70`} className={`border  border-gray-600 inline-block mr-2 rounded-md `}/>
                                    <span className={`uppercase ml-2 text-xs font-medium`}>{marketListing.element.collectibleType.brand.name}</span>
                                </a></Link>
                                <span className={`block text-gray-400 text-sm mt-5`}>Serial No. {marketListing.element.formattedIssueNumber} of {marketListing.element.collectibleType.totalIssued}</span>
                                <h1 className={`text-4xl mt-1 mb-5`}>{marketListing.element.collectibleType.name}</h1>

                                <span className={`inline-block px-1 text-xs font-medium rounded border ${getRarityThresholds(marketListing.element.collectibleType.rarity)}`}>{marketListing.element.collectibleType.rarity}</span>

                                <span className={`inline-block text-xs rounded border ml-1 px-1 text-gray-300`}>Provenance: {marketListing.element.transactions.edges.length}</span>


                                {marketListing.listingType === "AUCTION" ? (
                                    <>
                                        <span className={`block text-base mt-5 text-gray-200`}>
                                            Place your bid within <span className={`text-red-500 font-medium`}><Countdown date={marketListing.endingAt} /></span> to secure your position.
                                        </span>
                                        <span className="block text-xs mb-5 text-gray-400">*This site does not currently live update bids.</span>
                                    </>
                                ) : null}

                                <div className="block mt-5">
                                    <Image
                                        src="/assets/images/veve/icons/gem.png"
                                        alt={`Price is ${marketListing.currentPrice}`}
                                        width={20}
                                        height={20}
                                        className={`inline-block mr-2`}
                                    />
                                    <span className="ml-3 text-2xl">${marketListing.currentPrice}
                                        {marketListing.listingType === "AUCTION" ? (
                                            <span className={`text-sm inline-block ml-2 mr-2`}>({marketListing.bids.totalCount} bids)</span>
                                        ) : null}
                                        {getPercentageChange(marketListing.currentPrice, marketListing.element.collectibleType.storePrice)}
                                        <MicroChart historicalValue={marketListing.element.transactions.edges} storePrice={marketListing.element.collectibleType.storePrice} />
                                        <span className={`text-xs ml-2 text-gray-300`}>RRP: {marketListing.element.collectibleType.storePrice}</span>
                                    </span>
                                </div>

                                <span className={`block text-sm text-gray-300 mt-2`}>Listed by <Link href={`/ecomi/users/${marketListing.seller.username}`}><a className={`text-blue-500`}>
                                {marketListing.seller.avatar !== null ? (
                                    <img src={marketListing.seller.avatar.url} alt={marketListing.seller.username} className={`rounded-full h-5 w-5 inline-block mr-2 ml-1 border`} />
                                ) : null}
                                    {marketListing.seller.username}
                            </a></Link></span>

                                {accordion()}

                            </div>
                        </div>
                        <div className={`grid grid-cols-1`}>
                            <section className={`display-linebreak block mt-10 mb-5 text-lg`}>
                                    {marketListing.element.collectibleType.description}
                            </section>
                        </div>
                    </div>
                </article>
            </Default>
        </>
    )
}

MarketplaceListing.getInitialProps = ({ query }) => {
    return readMarketplaceListing(query.slug)
        .then(data => {
            if (data.error){
                console.log('Error: ', data.error)
            } else {
                return {
                    marketListing: data,
                    query
                }
            }
        })
}

export default MarketplaceListing