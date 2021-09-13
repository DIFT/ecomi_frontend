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

                    <div className="bg-yellow-400 border-t-4 border-yellow-600 rounded-3xl mt-5 text-black px-4 py-3 shadow-md"
                         role="alert">
                        <div className="flex">
                            <div className="py-1">
                                <svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path
                                        d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="font-bold">Comic prices</p>
                                <p className="text-sm">Comic floor prices are currently unavailable at this time, please check back at a later date.</p>
                            </div>
                        </div>
                    </div>

                    <p className={`block text-base text-gray-300 mt-5`}>
                        <Link href={`/user/vault/valuation`}><a className={`text-pink-500`}>Click here to get a vault valuation</a></Link> based off of the current market floor prices in this table.
                    </p>

                </div>

                <nav className={`px-5 mt-10`}>
                    <ul>
                        <li className="inline-block mr-3">
                            <button onClick={e => setTab("collectibleFloors")} className={`${tab === "collectibleFloors" ? 'bg-pink-500' : 'bg-transparent border border-white'} hover:bg-pink-700 text-white font-base py-2 px-4 rounded-full font-semibold text-xs`}>Collectibles</button>
                        </li>
                        <li className="inline-block mr-3">
                            <button onClick={e => setTab("comicFloors")} disabled className={`${tab === "comicFloors" ? 'bg-pink-500' : 'bg-transparent border border-gray-500'} text-gray-500 font-base py-2 px-4 rounded-full font-semibold text-xs`}>Comics</button>
                        </li>
                    </ul>
                </nav>


                {renderCorrectTable()}
            </>
        </Default>
    )
}

export default Metrics