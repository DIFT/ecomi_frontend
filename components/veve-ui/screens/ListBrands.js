import { useState, useEffect } from "react";
import {API} from "../../../config";


const ListBrandsScreen = ({ getClickData }) => {

    const [brands, setBrands] = useState([])

    useEffect(() => {
        fetch(`${API}/brands`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setBrands(data)
            })
            .catch(e => console.log('Failed to fetch:', e))
    },[])

    return(
        <>
            <ul className={`grid grid-cols-2 gap-2 px-2`}>
                {brands && brands.map((brand) => (
                    <li><button onClick={e => getClickData(brand.slug, 'brand')}>
                        <img src={`./assets/images/veve/tiles/brands/${brand.slug}.jpg`} alt={`${brand.name}`} className={`rounded-md`} />
                    </button></li>
                ))}
            </ul>

        </>
    )
}

export default ListBrandsScreen