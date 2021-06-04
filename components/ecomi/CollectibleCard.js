import Link from "next/link";
import { soldOut, getRarityThresholds, getEditionTypeThresholds } from "../../utils";

const CollectibleCard = ({collectible}) => {
    return(
        <li key={collectible._id}>
                <Link href={`/collectibles/${collectible.slug}`}><a>
                    <div className={`veve-card relative veve-card--${collectible.rarity.toLowerCase()}`}>
                        {soldOut(collectible.totalAvailable)}
                        <div className="overflow-hidden" style={{ borderRadius: '0 0 10px 10px' }}>
                            <div className={`card ${collectible.rarity.toLowerCase()}`}>
                                <figure>
                                    <img src={collectible.image.url} alt={collectible.name} width={`100%`}/>
                                </figure>
                            </div>
                            <figcaption>
                                <div className="py-2 px-4 bg-gray-900 h-9 overflow-hidden">
                                    <h6 className={`text-gray-300 font-medium`}>{collectible.name}</h6>
                                </div>
                                <div className="py-1 px-4 bg-gray-600 text-sm">
                                    <span className={`inline-block px-1 text-xxs font-medium rounded border ${getRarityThresholds(collectible.rarity)}`}>
                                        {collectible.rarity}
                                    </span>
                                    <span className={`inline-block px-1 text-xxs font-medium rounded border ml-1 ${getEditionTypeThresholds(collectible.editionType)}`}>
                                        {collectible.editionType !== null ? collectible.editionType : 'N/A'}
                                    </span>
                                    <span className="text-white float-right inline-block">
                                        <img width={`15`} className={`inline-block mr-1`} src={`./assets/images/veve/icons/gem.png`} alt={`Price is ${collectible.storePrice}`}/>
                                        {collectible.storePrice}
                                    </span>
                                </div>
                            </figcaption>
                        </div>
                    </div>
                </a></Link>
            </li>
    )
}

export default CollectibleCard