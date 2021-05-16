import Link from "next/link";
import { soldOut, getRarityThresholds, getEditionTypeThresholds } from "../../utils";

const CollectibleCard = ({collectible, index}) => {
    return(
        <li key={index}>
                <Link href={`/ecomi/collectibles/${collectible.node.id}`}><a>
                    <div className={`veve-card relative veve-card--${collectible.node.rarity.toLowerCase()}`}>
                        {soldOut(collectible.node.totalAvailable)}
                        <div className="overflow-hidden" style={{ borderRadius: '0 0 10px 10px' }}>
                            <div className={`card ${collectible.node.rarity.toLowerCase()}`}>
                                <figure>
                                    <img src={collectible.node.image.url} alt={collectible.node.name} width={`100%`}/>
                                </figure>
                            </div>
                            <figcaption>
                                <div className="py-2 px-4 bg-gray-900">
                                    <h6 className={`text-gray-300 font-medium`}>{collectible.node.name}</h6>
                                </div>
                                <div className="py-1 px-4 bg-gray-600 text-sm">
                                                    <span className={`inline-block px-1 text-xxs font-medium rounded border ${getRarityThresholds(collectible.node.rarity)}`}>
                                                        {collectible.node.rarity}
                                                    </span>
                                    <span className={`inline-block px-1 text-xxs font-medium rounded border ml-1 ${getEditionTypeThresholds(collectible.node.editionType)}`}>
                                                        {collectible.node.editionType}
                                                    </span>
                                    <span className="text-white float-right inline-block">
                                                    <img width={`15`} className={`inline-block mr-1`} src={`./assets/images/veve/icons/gem.png`} alt={`Price is ${collectible.node.storePrice}`}/>
                                        {collectible.node.storePrice}
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