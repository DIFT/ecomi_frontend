import Link from "next/link"
import Badge from "../../Atoms/Badge/Badge"
import {getRarityThresholds, getEditionTypeThresholds, truncate} from "../../../utils"


const CollectibleCard = ({ collectible }) => {
    return(
        <article className={`${collectible.image.direction === 'PORTRAIT' ? 'max-w-xs' : 'max-w-2xl'} px-5`} >
            <Link href={`/collectibles/${collectible.slug}`}>
                <a className={`collectible__card collectible__card--${collectible.rarity.toLowerCase()} rounded-lg overflow-hidden block`}>
                    <span className="overflow-hidden block rounded-3xl">
                        <figure className={`relative z-10`}>
                            <div className={`card-fx card-fx--${collectible.rarity.toLowerCase()}`}>
                                <img src={collectible.image.url} alt={collectible.name} width={"auto"} className={`rounded-3xl`} style={{ maxHeight: '369px'}}/>
                            </div>
                        </figure>
                    </span>
                    <figcaption className={`relative -z-1`}>
                        <div className="-mt-4 pt-5 pb-2 px-6 bg-gray-900 overflow-hidden rounded-b-3xl relative z-1">
                            <h6 className={`block font-semibold py-2`}>{truncate(collectible.name, 30)}</h6>
                        </div>
                        <div className="flex items-center bg-white -mt-6 pt-7 px-6 pb-2 rounded-b-3xl">
                            <div className={`flex-auto`}>
                                <Badge classes={`inline-block px-2 py-1 text-xs rounded mr-2 ${getRarityThresholds(collectible.rarity)}`}>{collectible.rarity}</Badge>
                                <Badge classes={`inline-block px-2 py-1 text-xs rounded ${getEditionTypeThresholds(collectible.editionType)}`}>
                                    {collectible.editionType !== null ? collectible.editionType : 'N/A'}
                                </Badge>
                            </div>
                            <div className={`flex-auto text-right font-semibold text-gray-500`}>
                                ${collectible.storePrice}
                            </div>
                        </div>
                    </figcaption>
                </a>
            </Link>
        </article>
    )
}

export default CollectibleCard