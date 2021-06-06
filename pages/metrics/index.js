import Default from "../../templates/Default"
import { API } from "../../config";
import Link from "next/link"
import { useEffect, useState } from 'react'
import { getBrands } from "../../actions/brand"
import { getLicenses } from "../../actions/license";
import dynamic from "next/dynamic";
import {
    getHeatMapData,
    getAllBurnData,
    getStoreHistoricalRevenue,
    getBrandRevenueData,
    getLicensorRevenueData,
    getCollectibleRevenueData
} from "../../actions/metrics/metrics";

const HeatMap = dynamic(
    () => import("../../components/metrics/HeatMap"),
    { ssr: false }
);

const Line = dynamic(
    () => import("../../components/metrics/Line"),
    { ssr: false }
);

const StoreRevenueLine = dynamic(
    () => import("../../components/metrics/StoreRevenueLine"),
    { ssr: false }
);

const NftSalesLine = dynamic(
    () => import("../../components/metrics/NftSalesLine"),
    { ssr: false }
);

const BrandRevenueBar = dynamic(
    () => import("../../components/metrics/BrandRevenueBar"),
    { ssr: false }
);

const LicensorRevenueBar = dynamic(
    () => import("../../components/metrics/LicensorRevenueBar"),
    { ssr: false }
);

const CollectiblesRevenueBar = dynamic(
    () => import("../../components/metrics/CollectiblesRevenueBar"),
    { ssr: false }
);

const Metrics = () => {

    const [heatMapData, setHeatMapData] = useState()
    const [burnLineData, setBurnLineData] = useState()
    const [storeRevenue, setStoreRevenue] = useState()
    const [brandRevenueData, setBrandRevenueData] = useState()
    const [licensorRevenueData, setLicensorRevenueData] = useState()
    const [nftRevenueData, setNftRevenueData] = useState()

    useEffect(() => {
        loadBurnData()
    },[])

    const loadBurnData = () => {

        getHeatMapData()
            .then(data => {
                setHeatMapData(data)
            })
            .catch(e => console.log('Error getting heatmap data'))

        getAllBurnData()
            .then((data) => {
                setBurnLineData(data[0].burns)
            })
            .catch(e => console.log('Error getting burn data'))

        getStoreHistoricalRevenue()
            .then((data) => {
                setStoreRevenue(data)
            })
            .catch(e => console.log('Error getting store historical revenue data'))

        getBrandRevenueData()
            .then((data) => {
                setBrandRevenueData(data)
            })
            .catch(e => console.log('Error getting brand revenue data'))

        getLicensorRevenueData()
            .then((data) => {
                console.log('licensor data returned is: ', data)
                setLicensorRevenueData(data)
            })
            .catch(e => console.log('Error getting licensor revenue data'))

        getCollectibleRevenueData()
            .then((data) => {
                setNftRevenueData(data)
            })
            .catch(e => console.log('Error getting nft revenue data'))

    }

    return(
        <Default>
            <>
                <div className="container text-white">
                    <h1 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>Metrics</h1>

                    <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11 text-gray-400`}>We heard investors like graphs? So we got you graphs...</p>

                    {/*<p className={`text-lg mb-8`}>*/}
                    {/*    The underlying economy of VEVE is the OMI Token. The token is needed for two reasons.*/}
                    {/*    Firstly, the sale and purchase of digital collectibles and secondly, access to extra features and*/}
                    {/*    benefits within the app, such as the ’Master Collector Program’.*/}
                    {/*</p>*/}

                    <div className="grid grid-cols-2 gap-20">
                        <div className={`p-5 border border-gray-700 rounded-md`} style={{ background: '#1E263C' }}>
                            <div className="text-center text-gray-300">OMI Burn Heatmap</div>
                            <HeatMap heatMapData={heatMapData} name={'omiburn-heat'} />
                        </div>
                        <div className={`p-5 border border-gray-700 rounded-md`} style={{ background: '#1E263C' }}>
                            <div className="text-center text-gray-300">OMI Burn Line Chart</div>
                            <Line lineData={burnLineData} name={'omiburn-line'} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-20 mt-10">
                        <div className={`p-5 border border-gray-700 rounded-md`} style={{ background: '#1E263C' }}>
                            <div className="text-center text-gray-300">Store Revenue</div>
                            <StoreRevenueLine lineData={storeRevenue} name={`store-revenue`} />
                        </div>
                        <div className={`p-5 border border-gray-700 rounded-md`} style={{ background: '#1E263C' }}>
                            <div className="text-center text-gray-300">NFT Sales</div>
                            <NftSalesLine lineData={storeRevenue} name={'nft-sales'} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-20 mt-10">
                        <div className={`p-5 border border-gray-700 rounded-md`} style={{ background: '#1E263C' }}>
                            <div className="text-center text-gray-300">Brand Revenue Leaderboard</div>
                            <BrandRevenueBar data={brandRevenueData} name={`brand-revenue-bar`} />
                        </div>
                        <div className={`p-5 border border-gray-700 rounded-md`} style={{ background: '#1E263C' }}>
                            <div className="text-center text-gray-300">Licensor Revenue Leaderboard</div>
                            <LicensorRevenueBar data={licensorRevenueData} name={`licensor-revenue-bar`} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-10">
                        <div className="p-5 border border-gray-700 rounded-md" style={{ background: '#1E263C' }}>
                            <div className="text-center text-gray-300">NFT Revenue Board</div>
                            <CollectiblesRevenueBar data={nftRevenueData} name={`collectibles-revenue-bar`} />
                        </div>
                    </div>



                </div>
            </>
        </Default>
    )
}

export default Metrics