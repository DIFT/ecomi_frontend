import React, { useEffect, useState } from 'react'
import Head from "next/head"
import Link from 'next/link'
import Image from 'next/image'
import dynamic from "next/dynamic"
import Router from 'next/router'
import { withRouter } from 'next/router'
import CountUp from 'react-countup'
import { XMasonry, XBlock } from "react-xmasonry"
import { getCookie, isAuth } from '../../../actions/auth'
import Default from "../../../components/Templates/Default"
import SelectCollectibleCard from '/components/Molecules/Cards/SelectCollectibleCard'
import SelectCollectibleItem from './components/SelectCollectibleItem'
import SelectComicItem from './components/SelectComicItem'
import { getFilteredProducts } from '../../../actions/apiCore'
import { getCollectiblesValuation, getComicsValuation, getMarketData, getMarketComicData } from '../../../actions/metrics/metrics'
import {getEditionTypeThresholds, getPercentageChange, getRarityThresholds} from "../../../utils"
import { useTranslation } from 'react-i18next'
import Sticky from 'react-sticky-el'


const ValuationTable = dynamic(
    () => import("../../../components/Organisms/Tables/ValuationTable"),
    { ssr: false }
);

const Valuation = ({ router }) => {

    const { t } = useTranslation();
    const head = () => (
        <Head>
            <title>VEVE {t(`valuation.title`)} | ECOMI WIKI</title>
            <meta name={"description"} content={t(`valuation.findOut`)} />
        </Head>
    )

    const token = getCookie('token')
    const [valuation, setValuation] = useState(0)
    const [vaultRetailPrice, setVaultRetailPrice] = useState(0)
    const [collectiblesValuation, setCollectiblesValuation] = useState(0)
    const [collectiblesRetailPrice, setCollectiblesRetailPrice] = useState(0)
    const [comicsValuation, setComicsValuation] = useState(0)
    const [comicsRetailPrice, setComicsRetailPrice] = useState(0)

    const [collectibles, setCollectibles] = useState([])
    const [comics, setComics] = useState([])
    const [usersCollectibles, setUsersCollectibles] = useState([])
    const [usersComics, setUsersComics] = useState([])
    const [collectibleLoading, setCollectibleLoading] = useState(true)
    const [comicLoading, setComicLoading] = useState(true)

    const [tab, setTab] = useState('')

    useEffect(() => {
        loadCollectibleMarketData()
        loadComicMarketData()
    },[])

    const calcStoreRetailPrice = () => {
        let storeRetail = 0
        collectibles.forEach((collectible) => {
            storeRetail += collectible.storePrice
        })
    }

    useEffect(() => {
        calcStoreRetailPrice()
    }, [collectibles])

    const loadCollectibleMarketData = () => {
        getMarketData()
            .then(data => {
                setCollectibles(data)
                setCollectibleLoading(false)
            })
            .catch(e => console.log('Error getting marketplace data', e))
    }

    const loadComicMarketData = () => {
        getMarketComicData()
            .then(data => {
                setComics(data)
                setComicLoading(false)
            })
            .catch(e => console.log('Error getting marketplace data', e))
    }

    const handleSelectedRows = () => {
        let selectedObj = {}
        collectibles && collectibles.map((collectibleRow, index) => {
            var check = fakeData.find(c => c.collectibleId === collectibleRow.collectibleId);
            const stringMyIndex = `${index}`
            if (check){
                selectedObj = {...selectedObj, [stringMyIndex]: true}
            }
        })
        return selectedObj
    }

    useEffect(() => {
        getCollectiblesValuation(usersCollectibles, token)
            .then(data => {
                if(data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setCollectiblesValuation(data.valuation)
                    setCollectiblesRetailPrice(data.retailPrice)
                }
            })
    }, [usersCollectibles, setValuation])

    useEffect(() => {
        getComicsValuation(usersComics, token)
            .then(data => {
                if(data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setComicsValuation(data.valuation)
                    setComicsRetailPrice(data.retailPrice)
                }
            })
    }, [usersComics, setValuation])

    useEffect(() => {
        setValuation(collectiblesValuation + comicsValuation)
    }, [collectiblesValuation, comicsValuation])

    const calcPercentageChange = (valuation, retailPrice) => {
        const calc = (valuation - retailPrice) / retailPrice * 100
        if (valuation === 0) {
            return ''
        }
        if (calc > 1){
            return <span className="font-bold rounded ml-2 px-1 text-xs bg-green-400 text-green-900">
                 <CountUp end={calc} duration={1} separator="," decimals={2} decimal="."/>%
            </span>
        } else {
            return <span className="font-bold rounded ml-2 px-1 text-xs bg-red-400 text-red-900">
                <CountUp end={calc} duration={1} separator="," decimals={2} decimal="."/>%
            </span>
        }
    }

    const getVaultQuotes = () => {
        switch (true){
            case (valuation > 100 && valuation < 500):
                return(
                    <>
                        <Image
                            src="/assets/images/Rhys.jpg"
                            alt="Image of Rhys Skellern"
                            width={70}
                            height={70}
                            className={`rounded-full border-2 border-black`}
                        />
                        <div className={`text-left`}>
                                    <span className={`block`}>
                                        <Link href={`https://twitter.com/ecomi_rhys`}><a target={"_blank"} className={`text-pink-500 font-medium`}>Rheme</a></Link> says:
                                    </span>
                            <blockquote className={`italic text-sm text-gray-400`}>"That's not a bad looking vault, mate!"</blockquote>
                        </div>
                    </>
                )
            break
            case (valuation > 1000 && valuation < 5000):
                return(
                    <>
                        <Image
                            src="/assets/images/DanCrothers.jpg"
                            alt="Image of Dan Crothers"
                            width={70}
                            height={70}
                            className={`rounded-full border-2 border-black`}
                        />
                        <div className={`text-left`}>
                                    <span className={`block`}>
                                        <Link href={`https://twitter.com/ecomi_rhys`}><a target={"_blank"} className={`text-pink-500`}>DC</a></Link> says:
                                    </span>
                            <blockquote className={`italic text-sm text-gray-400`}>"That is an excellent vault, well done!"</blockquote>
                        </div>
                    </>
                )
            case (valuation > 5000):
                return(
                    <>
                        <Image
                            src="/assets/images/DavidYu.jpg"
                            alt="Image of David Yu"
                            width={70}
                            height={70}
                            className={`rounded-full border-2 border-black`}
                        />
                        <div className={`text-left`}>
                                    <span className={`block`}>
                                        <Link href={`https://twitter.com/DavidYuNZ`}><a target={"_blank"} className={`text-pink-500 font-medium`}>David Yu</a></Link> says:
                                    </span>
                            <blockquote className={`italic text-sm text-gray-400`}>"You think you are a collector?"</blockquote>
                        </div>
                    </>
                )
            break
            default:
                return (
                    <>
                        <Image
                            src="/assets/images/OMITheClown.jpg"
                            alt="Image of OMI The Clown"
                            width={70}
                            height={70}
                            className={`rounded-full border-2 border-black`}
                        />
                        <div className={`text-left`}>
                                    <span className={`block`}>
                                        <Link href={`https://twitter.com/OMI_the_Clown`}><a target={"_blank"} className={`text-pink-500`}>OMI the Clown</a></Link> says:
                                    </span>
                            <blockquote className={`italic text-sm text-gray-400`}>"OMI doesn't play your vault."</blockquote>
                        </div>
                    </>
                )
        }
    }

    const handleCollectibleSelection = (collectibleId, quantity, selected) => {
        const filtered = usersCollectibles.filter((e) => { return e.collectibleId !== collectibleId })
        if (selected) {
            setUsersCollectibles([...filtered])
        } else {
            setUsersCollectibles([...filtered, {"collectibleId": collectibleId, "quantity": quantity }])
        }
    }

    const handleQuantitySelection = (collectibleId, quantity, selected) => {
        const filtered = usersCollectibles.filter((e) => { return e.collectibleId !== collectibleId })
        if (selected){
            setUsersCollectibles([...filtered, {"collectibleId": collectibleId, "quantity": quantity}])
        }
    }

    const handleComicSelection = (uniqueCoverId, quantity, selected) => {
        const filtered = usersCollectibles.filter((e) => { return e.uniqueCoverId !== uniqueCoverId })
        if (selected) {
            setUsersComics([...filtered])
        } else {
            setUsersComics([...filtered, {"uniqueCoverId": uniqueCoverId, "quantity": quantity }])
        }
    }

    const handleQuantityComicSelection = (uniqueCoverId, quantity, selected) => {
        const filtered = usersCollectibles.filter((e) => { return e.uniqueCoverId !== uniqueCoverId })
        if (selected){
            setUsersComics([...filtered, {"uniqueCoverId": uniqueCoverId, "quantity": quantity}])
        }
    }

    return(
        <>
        {head()}
        <Default>
            <section className="text-white px-5 mt-20">
                <div className="container">
                    <div className="pb-5 border-b border-gray-200">
                        <h1 className="text-lg leading-6 font-medium text-gray-200">
                            {t(`valuation.valuation`)}
                        </h1>
                        <p className="mt-2 max-w-4xl text-sm text-gray-300">
                            {t(`valuation.valuationBased`)} <Link href={`/marketplace/floors`}><a className={`text-pink-500`}>{t(`valuation.valuationBased1`)}</a></Link> {t(`valuation.valuationBased2`)}
                        </p>
                    </div>
                </div>
            </section>

            <section className={`text-white text-left py-10`}>
                <div className="container">

                    <h1 className="text-lg leading-6 font-medium text-gray-200 mb-5">Collectibles</h1>
                    <div className={`flex flex-col max-h-96 overflow-auto customTable shadow`}>
                        <div className={`align-middle inline-block min-w-full w-max`}>
                            <div className="shadow overflow-auto">
                                <table className={`table-auto min-w-full divide-y divide-gray-900 border-b border-gray-900 rounded-md`} role={`table`}>
                                    <thead className={`border border-gray-900 hidden sm:table-header-group rounded-t-md`} style={{ background: '#1E263C' }}>
                                    <tr className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
                                        role="row">
                                        <th className="px-6 py-5 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-5 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Quantity</th>
                                        <th className="px-6 py-5 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"></th>
                                    </tr>
                                    </thead>
                                    <tbody className={`flex-1 sm:flex-none divide-y divide-gray-900`} role={"rowgroup"} style={{ background: '#1E263C' }}>
                                    {collectibles && collectibles.map((collectible, i) => (
                                        <SelectCollectibleItem
                                            collectible={collectible}
                                            handleCollectibleSelection={handleCollectibleSelection}
                                            handleQuantitySelection={handleQuantitySelection}
                                        />
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <footer className={`px-6 py-4 rounded-md shadow border border-gray-900`} style={{ background: '#1E263C' }}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
                            <div className={`text-gray-300`}>
                                <div className="flex gap-5 items-center">
                                    {getVaultQuotes()}
                                </div>
                            </div>
                            <div className={`text-right`}>
                                <div className="block">
                                    <span className={`text-gray-400 text-sm font-medium mb-2`}>RRP: $<CountUp end={collectiblesRetailPrice} duration={1} separator="," decimals={2} decimal="."/></span>
                                    {calcPercentageChange(collectiblesValuation, collectiblesRetailPrice)}
                                </div>
                                <p className={`font-normal ${collectiblesValuation > collectiblesRetailPrice ? 'text-green-500' : 'text-red-500'} font-medium text-4xl`}>
                                    + $<CountUp end={collectiblesValuation} duration={1} separator="," decimals={2} decimal="."/>
                                </p>
                            </div>
                        </div>
                    </footer>

                    <h1 className="text-lg leading-6 font-medium text-gray-200 mt-10 mb-5">Comics</h1>
                    <div className={`flex flex-col max-h-96 overflow-auto customTable shadow`}>
                            <div className={`align-middle inline-block min-w-full w-max`}>
                                <div className="shadow overflow-auto">
                                    <table className={`table-auto min-w-full divide-y divide-gray-900 border-b border-gray-900 rounded-md`} role={`table`}>
                                        <thead className={`border border-gray-900 hidden sm:table-header-group rounded-t-md`} style={{ background: '#1E263C' }}>
                                        <tr className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
                                            role="row">
                                            <th className="px-6 py-5 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-5 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Quantity</th>
                                            <th className="px-6 py-5 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"></th>
                                        </tr>
                                        </thead>
                                        <tbody className={`flex-1 sm:flex-none divide-y divide-gray-900`} role={"rowgroup"} style={{ background: '#1E263C' }}>
                                        {comics && comics.map((comic, i) => (
                                            <SelectComicItem
                                                comic={comic}
                                                handleComicSelection={handleComicSelection}
                                                handleQuantityComicSelection={handleQuantityComicSelection}
                                            />
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    <footer className={`px-6 py-4 rounded-md shadow border border-gray-900`} style={{ background: '#1E263C' }}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
                            <div className={`text-gray-300`}>
                                <div className="flex gap-5 items-center">
                                    {getVaultQuotes()}
                                </div>
                            </div>
                            <div className={`text-right`}>
                                <div className="block">
                                    <span className={`text-gray-400 text-sm font-medium mb-2`}>RRP: $<CountUp end={comicsRetailPrice} duration={1} separator="," decimals={2} decimal="."/></span>
                                    {calcPercentageChange()}
                                </div>
                                <p className={`font-normal ${comicsValuation > comicsRetailPrice ? 'text-green-500' : 'text-red-500'} font-medium text-4xl`}>
                                    + $<CountUp end={comicsValuation} duration={1} separator="," decimals={2} decimal="."/>
                                </p>
                            </div>
                        </div>
                    </footer>

                </div>
            </section>

            <section>
                <div className="container">
                    <footer className={`mt-5 px-6 py-4 rounded-md shadow border border-gray-900`} style={{ background: '#1E263C' }}>
                        <div className={`text-center`}>
                            <div className="block">
                                <span className={`text-gray-400 text-sm font-medium mb-2 uppercase`}>The vault is valued at</span>
                            </div>
                            <p className={`font-normal ${valuation > vaultRetailPrice ? 'text-green-500' : 'text-red-500'} font-medium text-6xl`}>
                                $<CountUp end={valuation} duration={1} separator="," decimals={2} decimal="."/>
                            </p>
                        </div>
                    </footer>
                </div>
            </section>

        </Default>
        </>
    )
}

export default withRouter(Valuation);