import dynamic from "next/dynamic"
import {
    getUserGrowthData,
} from "../../../actions/metrics/metrics"
import { useState, useEffect } from "react"

const Line = dynamic(
    () => import("../Line"),
    { ssr: false }
);

const UserGrowthChart = () => {

    const [userGrowthData, setUserGrowthData] = useState()

    useEffect(() => {
        loadBurnData()
    },[])

    const loadBurnData = () => {
        getUserGrowthData()
            .then((data) => {
                setUserGrowthData(data[0].counts)
            })
            .catch(e => console.log('Error getting user count data'))
    }

    return(
        <div className={`p-5 border border-gray-700 rounded-md text-center `} style={{ background: '#1E263C' }}>
            <div className="text-gray-300">VEVE Active User Growth Line Chart</div>
            <span className="text-sm text-gray-300">*User growth is captured nightly at 12AM GMT</span>
            <Line lineData={userGrowthData} name={'vevegrowth-line'} />
        </div>
    )
}

export default UserGrowthChart