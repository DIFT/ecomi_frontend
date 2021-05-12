import Default from "../../templates/Default"
import { API } from "../../config";
import Link from "next/link"
import { useEffect, useState } from 'react'
import { getBrands } from "../../actions/brand"
import { getLicenses } from "../../actions/license";

const Collectible = () => {

    const [brands, setBrands] = useState([])
    const [licenses, setLicenses] = useState([])

    useEffect(() => {
        loadBrands()
        loadLicenses()
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

    const loadLicenses = () => {
        getLicenses()
            .then((data) => {
                if (data.error){
                    console.log('Error loading brands: ', data.error)
                } else {
                    setLicenses(data)
                }
            })
    }

    return(
        <Default>
            <>
                <div className="container">

                    <h5 className={`text-lg mb-3 mt-5`}>Licenses</h5>
                    <ul>
                        {licenses && licenses.map((license) => (
                            <li className={`inline-block`}>
                                <Link href={`/licenses/${license.slug}`}>
                                    <a><img src={`./assets/images/veve/tiles/brands/${license.slug}.jpg`} alt={`${license.name}`} className={`rounded-md`} width={`150`} /></a>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <h5 className={`text-lg mb-3 mt-5`}>Brands</h5>
                    <ul>
                        {brands && brands.map((brand) => (
                            <li className={`inline-block`}>
                                <Link href={`/brands/${brand.slug}`}>
                                    <a><img src={`./assets/images/veve/tiles/brands/${brand.slug}.jpg`} alt={`${brand.name}`} className={`rounded-md`} width={`150`} /></a>
                                </Link>
                            </li>
                        ))}
                    </ul>

                </div>
            </>
        </Default>
    )
}

export default Collectible