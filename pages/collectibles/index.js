import { useEffect, useState } from 'react'
import { getCollectibles } from '../../actions/collectibles/collectibles'
import Default from "../../components/Templates/Default"
import dynamic from "next/dynamic"

const LatestDrops = dynamic(
    () => import("../../components/Organisms/LatestDrops/LatestDrops"),
    { ssr: false }
)

const Collectibles = () => {

    const [collectibles, setCollectibles] = useState([])

    useEffect(() => {
        getCollectibles(0, 200)
            .then(data => {
                setCollectibles(data.data)
            })
            .catch(e => console.log('Error getting collectibles'))
    }, [])

    return (
        <Default>
            <>

                <LatestDrops />

                <ul>
                    {collectibles && collectibles.map((collectible) => (
                        <li className={`inline-block`}><img src={collectible.image.url} alt={'Failed to load collectible'} width={`100`}  /></li>
                    ))}
                </ul>
            </>
        </Default>
    )
}

export default Collectibles