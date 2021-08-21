import Default from "../../../components/Templates/Default"
import { API } from "../../../config"
import Link from "next/link"
import { useEffect, useState } from 'react'
import { getMarketData } from "../../../actions/metrics/metrics"
import dynamic from "next/dynamic"
import moment from "moment"
import {getEditionTypeThresholds, getPercentageChange, getRarityThresholds} from "../../../utils"
import CollectibleFloors from '../../../components/Organisms/Tables/CollectibleFloors'
import ComicFloors from '../../../components/Organisms/Tables/ComicFloors'

const Metrics = () => {

    const [tab, setTab] = useState('collectibleFloors')

    const renderCorrectTable = () => {
        switch (tab){
            case "collectibleFloors":
                return <CollectibleFloors />
                break
            case "comicFloors":
                return <ComicFloors />
                break
            default:
                return <ComicFloors />
        }
    }

    return(
        <Default>
            <>
                <div className="text-white px-5 mt-20">
                    <p className={`font-semibold text-2xl leading-relaxed`}>Smart data table automatically updated every hour</p>

                    <p className={`block text-base text-gray-300`}>
                        The table below showcases the floor price (lowest available) for all collectibles currently listed on the secondary market with a 'buy it now' option.
                    </p>
                </div>

                <nav className={`px-5 mt-10`}>
                    <ul>
                        <li className="inline-block mr-3">
                            <button onClick={e => setTab("collectibleFloors")} className={`${tab === "collectibleFloors" ? 'bg-pink-500' : 'bg-transparent border border-white'} hover:bg-pink-700 text-white font-base py-2 px-4 rounded-full font-semibold text-xs`}>Collectibles</button>
                        </li>
                        <li className="inline-block mr-3">
                            <button onClick={e => setTab("comicFloors")} className={`${tab === "comicFloors" ? 'bg-pink-500' : 'bg-transparent border border-white'} hover:bg-pink-700 text-white font-base py-2 px-4 rounded-full font-semibold text-xs`}>Comics</button>
                        </li>
                    </ul>
                </nav>


                {renderCorrectTable()}
            </>
        </Default>
    )
}

export default Metrics