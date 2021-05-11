import { useState, useEffect } from "react";
import {API} from "../../../config";

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
            {/*{JSON.stringify(collectibles)}*/}
            {collectibles && collectibles.map((collectible) => (
                <li>{collectible.title}</li>
            ))}
        </>
    )
}

export default BrandsScreen