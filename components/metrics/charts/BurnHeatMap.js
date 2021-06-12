import dynamic from "next/dynamic"
import {
    getHeatMapData,
} from "../../../actions/metrics/metrics"
import { useState, useEffect } from "react"

const HeatMap = dynamic(
    () => import("../HeatMap"),
    { ssr: false }
);

const BurnHeatMap = () => {

    const [heatMapData, setHeatMapData] = useState()


    useEffect(() => {
        loadBurnData()
    },[])

    const loadBurnData = () => {
        getHeatMapData()
            .then(data => {
                setHeatMapData(data)
            })
            .catch(e => console.log('Error getting heatmap data'))
    }

    return(
        <div className={`p-5 border border-gray-700 rounded-md`} style={{ background: '#1E263C' }}>
            <div className="text-center text-gray-300">OMI Burn Line Chart</div>
            <span className="text-sm text-gray-300">*Data is captured nightly at 12AM GMT</span>
            <HeatMap heatMapData={heatMapData} name={'omiburn-heat'} />
        </div>
    )
}

export default BurnHeatMap