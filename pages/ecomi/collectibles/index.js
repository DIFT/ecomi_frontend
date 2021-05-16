import Default from "../../../templates/Default"
import { API } from "../../../config"
import Link from "next/link"
import { useEffect, useState } from 'react'
import { getMarketPlaceListings } from "../../../actions/marketplace/marketplace"

const Collectibles = () => {

    const [collectibles, setCollectibles] = useState([])
    const [offset, setOffset] = useState('')

    useEffect(() => {
        //loadListings()
    }, [])

    // const loadListings = () => {
    //     getMarketPlaceListings(offset)
    //         .then((data) => {
    //             if (data.error){
    //                 console.log('Error fetching marketplace collectibles', data.error)
    //             } else {
    //                 setCollectibles(data.edges)
    //                 setOffset(data.pageInfo.endCursor)
    //             }
    //         })
    //         .catch(e => console.log('Error fetching collectibles ', e))
    // }

    const handleLoadMore = (e) => {
        getMarketPlaceListings(offset)
            .then((data) => {
                if (data.error){
                    console.log('Error fetching marketplace collectibles', data.error)
                } else {
                    setCollectibles(data.edges)
                    setOffset(data.pageInfo.endCursor)
                    console.log('Cursor is now:' , data.pageInfo.endCursor)
                }
            })
    }

    const handleClick = (id) => {
        console.log('ID of listing is: ', id)
    }

    return (
        <>
            <Default>
                <div className="container text-white">

                    Collectibles page yo!
                    {/*<ul>*/}
                    {/*    {collectibles && collectibles.map((listing, index) => (*/}
                    {/*        <li className="inline-block mr-3 border">*/}
                    {/*            <Link href={`/ecomi/marketplace/${listing.node.id}`}>*/}
                    {/*                <a>*/}
                    {/*                    <button>*/}
                    {/*                        <img src={listing.node.element.collectibleType.image.url} alt={listing.node.element.collectibleType.name} width={`100`} />*/}
                    {/*                        Price: {listing.node.currentPrice}*/}
                    {/*                        <br/>*/}
                    {/*                        Listing id: {listing.node.id}*/}
                    {/*                        <br/>*/}
                    {/*                        Collectible id: {listing.node.element.collectibleType.id}*/}
                    {/*                        <br/>*/}
                    {/*                        Collectible Name: {listing.node.element.collectibleType.name}*/}
                    {/*                        <br/>*/}
                    {/*                        Rarity: {listing.node.element.collectibleType.rarity}*/}
                    {/*                        <br/>*/}
                    {/*                        Total issued: {listing.node.element.collectibleType.totalIssued}*/}
                    {/*                        <br/>*/}
                    {/*                        Issue number: {listing.node.element.formattedIssueNumber}*/}
                    {/*                        <br/>*/}
                    {/*                        Seller: {listing.node.seller.id}*/}
                    {/*                        <br/>*/}
                    {/*                        Username: {listing.node.seller.username}*/}
                    {/*                        <br/>*/}
                    {/*                        {listing.node.endingAt ? `Ending at ${listing.node.endingAt}` : null}*/}
                    {/*                        <br/>*/}
                    {/*                        {listing.node.listingType === "AUCTION" ? `Auction with ${listing.node.bids.totalCount} bids on it.` : 'Buy it now'}*/}
                    {/*                        <br/>*/}
                    {/*                        Number of similar collectibles: {listing.node.marketMetadata.totalMarketListings}*/}
                    {/*                        <br/>*/}
                    {/*                        Status: {listing.node.status}*/}
                    {/*                    </button>*/}
                    {/*                </a>*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*    ))}*/}
                    {/*</ul>*/}

                    {/*<button className={`text-lg text-center p-3 m-3 border`} onClick={e => handleLoadMore()}>LOAD MORE</button>*/}
                </div>
            </Default>
        </>
    )
}

export default Collectibles