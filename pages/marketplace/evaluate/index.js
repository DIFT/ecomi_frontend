import Default from "../../../components/Templates/Default"
import React, { useEffect, useState } from 'react'
import { getBrandRevenueData } from "../../../actions/metrics/metrics"
import { useTranslation } from 'react-i18next'

const Evaluate = () => {

    const { t } = useTranslation();
    
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
                    {t(`evaluate.title`)}
                </div>
            </>
        </Default>
    )
}

export default Evaluate