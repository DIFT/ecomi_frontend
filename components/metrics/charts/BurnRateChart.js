import dynamic from "next/dynamic"
import {
    getAllBurnData,
} from "../../../actions/metrics/metrics"
import { useState, useEffect } from "react"

const Line = dynamic(
    () => import("../Line"),
    { ssr: false }
);

const BurnRateChart = () => {

    const [burnLineData, setBurnLineData] = useState()

    useEffect(() => {
       loadBurnData()
    },[])

    const loadBurnData = () => {
        getAllBurnData()
            .then((data) => {
                console.log('Burn data is: ', data)
                setBurnLineData(data[0].burns)
            })
            .catch(e => console.log('Error getting burn data'))
    }

    return(
        <div className={`p-5 border border-gray-700 rounded-md`} style={{ background: '#1E263C' }}>
            <div className="text-center text-gray-300">OMI Burn Line Chart</div>
            <Line lineData={burnLineData} name={'omiburn-line'} />
        </div>
    )
}

export default BurnRateChart