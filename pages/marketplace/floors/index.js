import Default from "../../../components/Templates/Default"
import Head from "next/head"
import { API } from "../../../config"
import Link from "next/link"
import { useEffect, useState } from 'react'
import { getMarketData } from "../../../actions/metrics/metrics"
import dynamic from "next/dynamic"
import moment from "moment"
import {getEditionTypeThresholds, getPercentageChange, getRarityThresholds} from "../../../utils"
import CollectibleFloors from '../../../components/Organisms/Tables/CollectibleFloors'
import ComicFloors from '../../../components/Organisms/Tables/ComicFloors'
import { useTranslation } from 'react-i18next'

const Metrics = () => {

    const { t } = useTranslation();
    const head = () => (
        <Head>
            <title>{t(`floors.title`)}</title>
            <meta name={"description"} content={t(`floors.updateByHour`)} />
        </Head>
    )

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
        <>
            {head()}
            <Default>
                <>
                    <div className="text-white px-5 mt-20">
                        <p className={`font-semibold text-2xl leading-relaxed`}>{t(`floors.autoUpdate`)}</p>

                        <p className={`block text-base text-gray-300`}>
                            {t(`floors.floorPrices`)}
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
                                    <p className="font-bold">{t(`floors.comicPrices`)}</p>
                                    <p className="text-sm">{t(`floors.currentlyComics`)}<Link href={`/donate`}><a className={`text-pink-500 font-medium`}>{t(`floors.currentlyComics1`)}</a></Link>{t(`floors.currentlyComics2`)}</p>
                                </div>
                            </div>
                        </div>

                        <p className={`block text-base text-gray-300 mt-5`}>
                            <Link href={`/user/vault/valuation`}><a className={`text-pink-500`}>{t(`floors.valutValuation`)}</a></Link>{t(`floors.basedOff`)}
                        </p>

                    </div>

                    <nav className={`px-5 mt-10`}>
                        <ul>
                            <li className="inline-block mr-3">
                                <button onClick={e => setTab("collectibleFloors")} className={`${tab === "collectibleFloors" ? 'bg-pink-500 border border-pink-500' : 'bg-transparent border border-white'} hover:bg-pink-700 text-white font-base py-2 px-4 rounded-full font-semibold text-xs`}>{t(`floors.collectibles`)}</button>
                            </li>
                            <li className="inline-block mr-3">
                                <button onClick={e => setTab("comicFloors")} className={`${tab === "comicFloors" ? 'bg-pink-500 border border-pink-500' : 'bg-transparent border border-white'} text-white font-base py-2 px-4 rounded-full font-semibold text-xs`}>{t(`floors.comics`)}</button>
                            </li>
                        </ul>
                    </nav>


                    {renderCorrectTable()}
                </>
            </Default>
        </>
    )
}

export default Metrics