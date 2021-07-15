import Link from "next/link"
import Image from "next/image"
import { getRarityThresholds, getSerialRarity, formatListingType, getListingType, getPercentageChange } from "../../utils"
import Countdown from "react-countdown";

const CollectibleMarketCard = ({collectible, index}) => {

    const truncate = (str, length) => {
        const ending = '...';
        if (length == null) {
            length = 200;
        }
        if (str.length > length) {
            return str.substring(0, length - ending.length) + ending;
        } else {
            return str;
        }
    }

    const handleWidth = (direction) => {
        if (direction === "LANDSCAPE"){
            return { width: '610px' }
        }else {
            return {}
        }
    }

    return(
        <li key={index} className={`my-2 relative`} style={handleWidth(collectible.node.element.collectibleType.image.direction)}>
            {getListingType(collectible.node.listingType)}
            <Link href={`/ecomi/marketplace/${collectible.node.id}`}><a>
                <div className={`veve-card relative veve-card--${collectible.node.element.collectibleType.rarity.toLowerCase()}`}>
                    <div className="overflow-hidden" style={{ borderRadius: '0 0 10px 10px' }}>
                        <div className={`card ${collectible.node.element.collectibleType.rarity.toLowerCase()}`}>
                            <figure>
                                <img src={collectible.node.element.collectibleType.image.url} alt={collectible.node.element.collectibleType.name} width={`100%`}/>
                            </figure>
                        </div>
                        <figcaption>

                            <div className="py-2 px-4 bg-gray-900 h-9 overflow-hidden">
                                <h6 className={`text-gray-300 font-medium`}>{truncate(`${collectible.node.element.collectibleType.name}`, 33)}</h6>
                            </div>
                            <div className="py-2 px-4 bg-gray-800">
                                <div>
                                    <span className="inline-block mr-1 text-sm">
                                        <Image
                                            src="/assets/images/veve/icons/gem.png"
                                            alt={`Price is ${collectible.node.currentPrice}`}
                                            width={20}
                                            height={20}
                                            className={`inline-block mr-2`}
                                        />
                                        <span className={`ml-2`}>
                                            {collectible.node.currentPrice}
                                            {collectible.node.listingType === "AUCTION" ? (
                                                <span className={`inline-block text-xs inline-block ml-1 mr-1 text-gray-300`}>
                                                   ({collectible.node.bids.totalCount} bids)
                                                </span>
                                                ) : null}
                                        </span>
                                        {getPercentageChange(collectible.node.currentPrice, collectible.node.element.collectibleType.storePrice)}
                                    </span>

                                </div>
                            </div>
                            <div className="py-1 px-4 bg-gray-600 text-sm">
                                <span className={`inline-block px-1 text-xxs font-medium rounded border ${getRarityThresholds(collectible.node.element.collectibleType.rarity)}`}>
                                    {collectible.node.element.collectibleType.rarity}
                                </span>
                                <span className={`inline-block px-1 text-xxs font-medium rounded border ml-1 ${getSerialRarity(collectible.node.element.formattedIssueNumber)}`}>
                                    {collectible.node.element.formattedIssueNumber}
                                </span>
                                <span className="inline-block text-gray-300 text-xs float-right pt-0.5">
                                        {collectible.node.seller.avatar !== null ? (
                                            <img src={collectible.node.seller.avatar.url} alt={collectible.node.seller.username} className={`rounded-full h-4 w-4 inline-block mr-2 border`} />
                                        ) : null}
                                    {truncate(collectible.node.seller.username, 10)}
                                </span>
                            </div>

                            {collectible.node.listingType === "AUCTION" ? (
                                <span className={`py-1 px-4 text-center block text-sm text-white bg-red-500 pt-0.5 font-medium w-100`}>
                                    <Countdown date={collectible.node.endingAt} /> left
                                </span>
                            ) : null}

                        </figcaption>
                    </div>
                </div>
            </a></Link>
        </li>
    )
}

export default CollectibleMarketCard

