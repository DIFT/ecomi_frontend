import { useState, useEffect } from "react";
import {API} from "../../../config";
import PortraitCard from '../PortraitCard'

const BrandsScreen = ({ slug }) => {

    const [collectibles, setCollectibles] = useState([])

    useEffect(() => {
        fetch(`${API}/brand/${slug}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setCollectibles(data.collectibles)
            })
            .catch(e => console.log('Failed to fetch:', e))
    },[])

    return(
        <>
            <div className="grid grid-cols-2 gap-4 px-2">
                {collectibles && collectibles.map((collectible) => (
                    <PortraitCard collectible={collectible} />
                ))}
            </div>
        </>
    )
}

export default BrandsScreen