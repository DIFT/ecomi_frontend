import { useState, useEffect } from "react";
import {API} from "../../../../config";
import {getBrands} from "../../../../actions/brand/brand";


const ListBrandsScreen = ({ getClickData }) => {

    const [brands, setBrands] = useState([])

    useEffect(() => {
        loadBrands()
    },[])

    const loadBrands = () => {
        getBrands()
            .then((data) => {
                if (data.error){
                    console.log('Error loading brands: ', data.error)
                } else {
                    setBrands(data)
                }
            })
    }

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