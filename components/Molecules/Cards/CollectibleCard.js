import Link from "next/link"
import Badge from "../../Atoms/Badge/Badge"
import {getRarityThresholds, getEditionTypeThresholds, truncate, soldOut} from "../../../utils"


const CollectibleCard = ({ collectible }) => {
    return(
        <article className={`${collectible.image.direction === 'PORTRAIT' ? 'max-w-xs' : 'max-w-2xl'} px-5`} >
            <Link href={`/collectibles/${collectible.slug}`}>
                <a className={`collectible__card collectible__card--${collectible.rarity.toLowerCase()} rounded-lg overflow-hidden block`}>
                    <span className="overflow-hidden block rounded-3xl">
                        <figure className={`relative z-10`}>
                            {soldOut(collectible.totalAvailable)}
                            <div className={`card-fx card-fx--${collectible.rarity.toLowerCase()}`}>
                                <img src={collectible.image.url} alt={collectible.name} width={"auto"} className={`rounded-3xl`} style={{ maxHeight: '369px'}}/>
                            </div>
                        </figure>
                    </span>
                    <figcaption className={`relative -z-1`}>
                        <div className="-mt-4 pt-5 pb-2 px-6 bg-gray-900 overflow-hidden rounded-b-3xl relative z-1">
                            <h6 className={`block font-semibold py-2 text-white`}>{truncate(collectible.name, 30)}</h6>
                        </div>
                        <div className="flex items-center bg-white -mt-6 pt-7 px-6 pb-2 rounded-b-3xl">
                            <div className={`flex-auto`}>
                                <Badge classes={`inline-block px-2 py-1 text-xs rounded mr-2 ${getRarityThresholds(collectible.rarity)}`}>{collectible.rarity}</Badge>
                                <Badge classes={`inline-block px-2 py-1 text-xs rounded ${getEditionTypeThresholds(collectible.editionType)}`}>
                                    {collectible.editionType !== null ? collectible.editionType : 'N/A'}
                                </Badge>
                            </div>
                            <div className={`flex-auto text-right font-semibold text-gray-500`}>
                                <svg className={`gem-svg`} version="1.1"  x="0px" y="0px" width="30px"
                                     height="30px"
                                     viewBox="0 0 102.5 132.2" >
                                    <g id="sapphire">
                                        <polygon className="st1" points="82,47.2 102.5,36.3 102.5,34.5 100.7,33.5 79.8,44.6 82,45.8 	"/>
                                        <polygon className="st2" points="59,33.5 37.5,45.8 37.5,72.5 59,85 82,72.5 82,45.8 	"/>
                                        <polygon id="shine" className="st3" points="31.3,76.7 83.7,42.7 87.2,50.9 34.2,85.5 	"/>
                                        <polygon className="st4" points="16,34.5 59,10.3 59,33.5 37.5,45.8 	"/>
                                        <polygon className="st5" points="16,34.5 16,85 37.5,72.5 37.5,45.8 	"/>
                                        <polygon className="st5" points="16,85 59,110 59,85 37.5,72.5 	"/>
                                        <polygon className="st4" points="59,85 59,110 102.5,85 82,72.5 	"/>
                                        <polygon className="st1" points="82,72.5 82,45.8 102.5,34.5 102.5,85 	"/>
                                        <polygon className="st1" points="82,45.8 59,33.5 59,10.3 102.5,34.5 	"/>
                                        <polygon className="st5" points="16,84.3 37.5,71.8 37.5,72.5 38.7,73.2 16.5,85.3 16,85 	"/>
                                        <polygon className="st5" points="58.3,109.6 59,110 59.4,109.8 59.4,84.8 59,85 58.3,84.6 	"/>
                                        <polygon className="st5" points="37.5,46.2 37.5,45.8 38,45.5 16.5,34.2 16,34.5 16,34.9 	"/>
                                    </g>
                                </svg>
                                {collectible.storePrice}
                            </div>
                        </div>
                    </figcaption>
                </a>
            </Link>
        </article>
    )
}

export default CollectibleCard