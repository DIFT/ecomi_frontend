import { useEffect, useState } from 'react'
import { getCollectibles } from '../../actions/collectibles/collectibles'
import Default from "../../components/Templates/Default"


const Collectibles = () => {

    const [collectibles, setCollectibles] = useState([])

    useEffect(() => {
        getCollectibles(0, 200)
            .then(data => {
                setCollectibles(data)
            })
            .catch(e => console.log('Error getting collectibles'))
    }, [])

    return (
        <Default>
            <>
                <div className="relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto text-white">
                    <header className="space-y-6 mb-20 text-lg pb-20">
                        <h1 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>Collectibles</h1>
                        <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11 text-gray-400`}>List of collecibles</p>
                    </header>
                </div>

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