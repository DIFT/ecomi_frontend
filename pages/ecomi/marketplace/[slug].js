import Head from "next/head"
import Default from "../../../templates/Default"
import Link from "next/link"
import { readMarketplaceListing } from "../../../actions/marketplace/marketplace"
import { DOMAIN, APP_NAME } from '../../../config'

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
                <main>
                    <div className="container text-white">
                        <Link href={`/ecomi/marketplace`} className={`text-white`}><a>Back</a></Link>
                        <h1>{marketListing.element.collectibleType.name} - {marketListing.element.formattedIssueNumber}</h1>
                        <br/>
                        Price: {marketListing.currentPrice}
                        <br/>
                        <br/>
                        brand: <Link href={`/ecomi/brands/${marketListing.element.collectibleType.brand.id}`}>{marketListing.element.collectibleType.brand.name}</Link>
                        <br/>
                        id: {marketListing.element.collectibleType.id}
                        <br/>
                        name: <Link href={`/ecomi/collectibles/${marketListing.element.collectibleType.id}`}><a>{marketListing.element.collectibleType.name}</a></Link>
                        <br/>
                        Serial: {marketListing.element.formattedIssueNumber}
                        <br/>
                        rarity: {marketListing.element.collectibleType.rarity}
                        <br/>
                        totalIssued: {marketListing.element.collectibleType.totalIssued}
                        <br/>
                        totalAvailable: {marketListing.element.collectibleType.totalAvailable}
                        <br/>
                        image: <img src={marketListing.element.collectibleType.image.url} alt={marketListing.element.collectibleType.name} title={marketListing.element.collectibleType.name} />
                        <hr/>
                        <br/>
                        {previousOwnersBlock()}
                    </div>
                </main>
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