import Head from "next/head"
import Default from "../../../templates/Default"
import Link from "next/link"
import dynamic from "next/dynamic";
import { readMarketplaceListing } from "../../../actions/marketplace/marketplace"
import { DOMAIN, APP_NAME } from '../../../config'
import MarketListing from "../../../templates/MarketListing";
import Image from "next/image";
import Countdown from 'react-countdown'
import {getPercentageChange, getRarityThresholds, getSerialRarity} from "../../../utils";

const CollectibleValueChart = dynamic(
    () => import("../../../components/ecomi/CollectibleValueChart"),
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

    return(
        <>
            {head()}
            <Default>
                <article className={`container text-white`}>
                    <div className="grid grid-cols-5 gap-20">
                        <div className={`col-span-2`}>
                            <img src={marketListing.element.collectibleType.image.url} alt={marketListing.element.collectibleType.name} title={marketListing.element.collectibleType.name} width={`100%`} />
                        </div>
                        <div className={`col-span-3`}>
                            <Link href={`/ecomi/brands/${marketListing.element.collectibleType.brand.id}`}><a className={`text-blue-500`}>
                                <img src={marketListing.element.collectibleType.brand.image.url} alt={marketListing.element.collectibleType.brand.name} width={`70`} className={`border  border-gray-600 inline-block mr-2 rounded-md `}/>
                                <span className={`uppercase ml-2 text-xs font-medium`}>{marketListing.element.collectibleType.brand.name}</span>
                            </a></Link>
                            <h1 className={`text-6xl mt-5 mb-5`}>{marketListing.element.collectibleType.name}</h1>

                            <span className={`inline-block px-1 text-xs font-medium rounded border ${getRarityThresholds(marketListing.element.collectibleType.rarity)}`}>{marketListing.element.collectibleType.rarity}</span>

                            <span className={`inline-block px-1 text-xs font-medium rounded border ml-1 ${getSerialRarity(marketListing.element.formattedIssueNumber)}`}>{marketListing.element.formattedIssueNumber}</span>

                            <span className={`inline-block text-xs rounded border ml-1 px-1 text-gray-300`}>Total issued: {marketListing.element.collectibleType.totalIssued}</span>

                            <span className={`inline-block text-xs rounded border ml-1 px-1 text-gray-300`}>Provenance: {marketListing.element.transactions.edges.length}</span>


                            {marketListing.listingType === "AUCTION" ? (
                                <span className={`block text-3xl mt-5 mb-5 text-red-500 font-medium`}>
                                    <Countdown date={marketListing.endingAt} /> left
                                </span>
                            ) : null}

                            <div className="block mt-5">
                                <Image
                                    src="/assets/images/veve/icons/gem.png"
                                    alt={`Price is ${marketListing.currentPrice}`}
                                    width={20}
                                    height={20}
                                    className={`inline-block mr-2`}
                                />
                                <span className="ml-3 text-3xl">{marketListing.currentPrice}
                                    {marketListing.listingType === "AUCTION" ? (
                                        <span className={`text-sm inline-block ml-2 mr-2`}>({marketListing.bids.totalCount} bids)</span>
                                    ) : null}
                                    {getPercentageChange(marketListing.currentPrice, marketListing.element.collectibleType.storePrice)}
                                    <span className={`text-xs ml-2 text-gray-300`}>RRP: {marketListing.element.collectibleType.storePrice}</span>
                                </span>
                            </div>

                            <span className={`block text-sm text-gray-300 mt-2`}>Listed by <Link href={`/ecomi/users/${marketListing.seller.username}`}><a className={`text-blue-500`}>
                                {marketListing.seller.avatar !== null ? (
                                    <img src={marketListing.seller.avatar.url} alt={marketListing.seller.username} className={`rounded-full h-5 w-5 inline-block mr-2 ml-1 border`} />
                                ) : null}
                                {marketListing.seller.username}
                            </a></Link></span>

                            <span className={`display-linebreak block mt-10 mb-5 text-lg`}>
                            {marketListing.element.collectibleType.description}
                            </span>

                            <CollectibleValueChart
                                historicalValue={marketListing.element.transactions.edges}
                                name={marketListing.element.collectibleType.name}
                                issueNumber={marketListing.element.formattedIssueNumber}
                                rarity={marketListing.element.collectibleType.rarity}
                                storePrice={marketListing.element.collectibleType.storePrice}
                            />

                            {previousOwnersBlock()}

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