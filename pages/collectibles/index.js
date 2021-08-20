import { useEffect, useState } from 'react'
import { getCollectibles } from '../../actions/collectibles/collectibles'
import { getComics } from '../../actions/comics/comics'
import Default from "../../components/Templates/Default"
import dynamic from "next/dynamic"

const LatestDrops = dynamic(
    () => import("../../components/Organisms/LatestDrops/LatestDrops"),
    { ssr: false }
)

const Collectibles = () => {

    const [collectibles, setCollectibles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        
        const getCollectibleData = getCollectibles(0,160)
        const getComicData = getComics(0,200)

        // getCollectibles(0, 200)
        //     .then(data => {
        //         console.log('collectible data is: ', data.data)
        //         setCollectibles(data.data)
        //     })
        //     .catch(e => console.log('Error getting collectibles'))
    }, [])

    return (
        <Default>
            <>

                <LatestDrops />

                { loading ? 'LOADING' : null }

                {JSON.stringify(collectibles)}

                {/*<ul>*/}
                {/*    {collectibles && collectibles.map((collectible) => (*/}
                {/*        <li className={`inline-block`}><img src={collectible.image.fullResolutionUrl} alt={'Failed to load collectible'} width={`100`}  /></li>*/}
                {/*    ))}*/}
                {/*</ul>*/}
            </>
        </Default>
    )
}

export default Collectibles