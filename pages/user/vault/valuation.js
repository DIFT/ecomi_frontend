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
import { getFilteredProducts } from '../../../actions/apiCore'
import { getValuation, getMarketData } from '../../../actions/metrics/metrics'
import {getEditionTypeThresholds, getPercentageChange, getRarityThresholds} from "../../../utils"


const ValuationTable = dynamic(
    () => import("../../../components/Organisms/Tables/ValuationTable"),
    { ssr: false }
);

const Valuation = ({ router }) => {

    const head = () => (
        <Head>
            <title>VEVE Vault Valuation | ECOMI WIKI</title>
            <meta name={"description"} content={`Find out how much your VEVE vault is worth at a minimum using our valuation tool.`} />
        </Head>
    )

    const token = getCookie('token')
    const [valuation, setValuation] = useState(0)
    const [vaultRetailPrice, setVaultRetailPrice] = useState(0)

    const [collectibles, setCollectibles] = useState([])
    const [usersCollectibles, setUsersCollectibles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadMarketData()
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

    const [mySelectedRows, setMySelectedRows] = useState({});

    const fakeData = [
        {"collectibleId": "b94e5d49-35f0-4bdc-9e41-d5c484df5ae7", "quantity": 2},
        {"collectibleId": "1def2f37-8043-4aa8-a490-b4024db216ff", "quantity": 2},
        {"collectibleId": "ac5bc2af-f67d-46da-bac1-1b404a3dd6d1", "quantity": 2}
    ]

    // useEffect(() => {
    //     let selectedObj = {}
    //     collectibles && collectibles.map((collectibleRow, index) => {
    //         var check = fakeData.find(c => c.collectibleId === collectibleRow.collectibleId);
    //         const stringMyIndex = `${index}`
    //         selectedObj = {[stringMyIndex]: true}
    //         if (check){
    //             setMySelectedRows({...mySelectedRows, "77": true })
    //             console.log('selected rows state is: ', mySelectedRows)
    //         }
    //     })
    // }, [collectibles])

    const loadMarketData = () => {
        getMarketData()
            .then(data => {
                setCollectibles(data)
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

    const EditableCell = ({
                              value: initialValue,
                              row: { index },
                              column: { id },
                              updateMyData, // This is a custom function that we supplied to our table instance
                          }) => {
        // We need to keep and update the state of the cell normally
        const [value, setValue] = React.useState(initialValue)

        const onChange = e => {
            setValue(e.target.value)
        }

        // We'll only update the external data when the input is blurred
        const onBlur = () => {
            updateMyData(index, id, value)
        }

        // If the initialValue is changed external, sync it up with our state
        React.useEffect(() => {
            setValue(initialValue)
        }, [initialValue])

        return <input value={value} onChange={onChange} onBlur={onBlur} className={`bg-gray-900 text-white rounded-lg p-3`} />
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name', // accessor is the "key" in the data
                Cell: (cellProps => {
                    return (
                        <>
                            <div className="flex items-center">

                                <div className={`w-16 h-16 mr-3 rounded-xl shadow border-2 hover:border-4 hover:border-pink-500 border-black`} style={{
                                    background: `url(${cellProps.row.original.image?.thumbnailUrl})`,
                                    backgroundPosition: '50%',
                                    backgroundSize: 'cover'
                                }}></div>
                                <div>
                                    <span>{cellProps.row.original.name}</span>
                                    <br/>
                                    <span className={`inline-block px-1 text-xs font-bold rounded ${getRarityThresholds(cellProps.row.original.rarity)}`}>
                                       {cellProps.row.original.rarity}
                                    </span>
                                    <span className={`inline-block px-1 text-xs font-bold rounded ml-1 ${getEditionTypeThresholds(cellProps.row.original.editionType)}`}>
                                        {cellProps.row.original.editionType}
                                    </span>
                                </div>
                            </div>

                        </>
                    )
                })
            },
        ],
        []
    )

    useEffect(() => {
        getValuation(usersCollectibles, token)
            .then(data => {
                if(data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValuation(data.valuation)
                    setVaultRetailPrice(data.retailPrice)
                }
            })
    }, [usersCollectibles, setValuation])

    const calcPercentageChange = () => {
        const calc = (valuation - vaultRetailPrice) / vaultRetailPrice * 100
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
        console.log('valuation is: ', valuation)
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

    return(
        <>
        {head()}
        <Default>
            <section className="text-white px-5 mt-20">
                <h1 className={`font-semibold text-2xl leading-relaxed`}>Valuation</h1>
                <p className={`block text-base text-gray-300`}>
                    Vault valuations are based off of the current <Link href={`/marketplace/floors`}><a className={`text-pink-500`}>floor prices</a></Link> last captured. In the near future you will be able to save your collectibles to your profile and track your valuation growth in various data charts.
                </p>
                <div
                    className="bg-blue-300 border-t-4 border-blue-400 rounded-3xl text-black px-4 py-3 shadow-md mt-5"
                    role="alert">
                    <div className="flex">
                        <div className="py-1">
                            <svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path
                                    d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"></path>
                            </svg>
                        </div>
                        <div><p className="font-bold">Note</p>
                            <p className="text-sm">The result should only serve as a floor expectation for your collection, the calculation will not take into account your mint numbers, provenance, or any other variables that could influence price.</p>
                            <p className="text-sm font-medium">Comic floor prices are also currently unavailable at this time.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 mt-10 text-white px-5">
                {collectibles && collectibles ? <ValuationTable
                    columns={columns}
                    data={collectibles}
                    setCollectibles={setCollectibles}
                    loading={loading}
                    setValuation={setValuation}
                    valuation={valuation}
                    setUsersCollectibles={setUsersCollectibles}
                    usersCollectibles={usersCollectibles}
                    selectedRows={mySelectedRows}
                /> : null}
            </section>

            <footer className={`text-center p-5 text-white fixed w-full bottom-0 left-0 bg-gray-900 z-10 border-t border-black`}>
                <div className="container">
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
                        <div className={`text-gray-300`}>
                            <div className="flex gap-5 items-center">
                                {getVaultQuotes()}
                            </div>
                        </div>
                        <div className={`text-right`}>
                            <div className="block">
                                <span className={`text-gray-400 text-sm font-medium mb-2`}>RRP: $<CountUp end={vaultRetailPrice} duration={1} separator="," decimals={2} decimal="."/></span>
                                {calcPercentageChange()}
                            </div>
                            <p className={`font-normal ${valuation > vaultRetailPrice ? 'text-green-500' : 'text-red-500'} font-medium text-5xl`}>
                                + $<CountUp end={valuation} duration={1} separator="," decimals={2} decimal="."/>
                            </p>
                        </div>
                    </div>
                </div>

            </footer>

        </Default>
        </>
    )
}

export default withRouter(Valuation);