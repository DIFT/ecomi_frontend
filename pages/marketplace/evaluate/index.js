import Default from "../../../components/Templates/Default"
import React, { useEffect, useState } from 'react'
import { getBrandRevenueData } from "../../../actions/metrics/metrics"

const Evaluate = () => {
    const [brandMarketData, setBrandMarketData] = useState()


    console.log('market data brands', brandMarketData)
    useEffect(() => {
        loadBrandMarketData()
    },[])


    const loadBrandMarketData = () => {
        getBrandRevenueData()
            .then(data => {
                setBrandMarketData(data)
            })
            .catch(e => console.log('Error getting marketplace data'))
    }


    return(
        <Default>
            <>
                <div className="container text-white px-10">
                    Evaluate
                </div>
            </>
        </Default>
    )
}

export default Evaluate