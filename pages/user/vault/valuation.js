import React, { useEffect, useState } from 'react'
import dynamic from "next/dynamic"
import Router from 'next/router'
import { withRouter } from 'next/router'
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

    const token = getCookie('token')
    const [valuation, setValuation] = useState(0)

    const [collectibles, setCollectibles] = useState([])
    const [usersCollectibles, setUsersCollectibles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadMarketData()
    },[])

    const loadMarketData = () => {
        getMarketData()
            .then(data => {
                setCollectibles(data)
            })
            .catch(e => console.log('Error getting marketplace data'))
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
        console.log('Use effect triggered')
        getValuation(usersCollectibles, token)
            .then(data => {
                if(data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValuation(data.valuation)
                }
            })
    }, [usersCollectibles, setValuation])

    // const handleToggle = (e, collectible) => {
    //     const clickedCollectible = checked.indexOf(collectible)
    //     const all = [...checked]
    //     if (!checked.some(person => person.collectibleId === collectible.collectibleId)) {
    //         all.push(collectible)
    //     } else {
    //         all.splice(clickedCollectible, 1)
    //     }
    //     setChecked(all)
    //     formData.set('collectibles', all)
    // }
    //
    // const handleQuantity = (collectible) => {
    //     const all = [...checked]
    //     const newObjArr = all.map(obj => {
    //             if (collectible.collectibleId.includes(obj.collectibleId)) {
    //                 return {...obj, quantity: collectible.quantity}
    //             }
    //             return obj
    //         }
    //     )
    //     setChecked(newObjArr)
    //     formData.set('collectibles', all)
    // }
    //
    // const calcValuation = e => {
    //     console.log('form data is: ' ,checked)
    //     e.preventDefault()
    //     getValuation(checked, token)
    //         .then(data => {
    //             if(data.error) {
    //                 console.log('Error getting valuation: ', data.error)
    //                 setValues({ ...values, error: data.error });
    //             } else {
    //                 setValuation(data.valuation)
    //             }
    //         })
    // }

    return(
        <Default>
            <section className={`mt-0 px-10 pb-12 sm:pb-20 text-white relative min-h-screen flex items-center`}>
                <div className={`relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto`}>
                    <div className="text-center">
                        <img src={`/assets/images/dunn.jpg`}  width={`150`} className={`mb-5 rounded-full mx-auto`}/>
                        <h1 className={`text-4xl sm:text-6xl lg:text-8xl leading-none font-semibold tracking-tight mb-8 sm:mb-10`}>Valuation</h1>
                        <p className={`font-semibold text-2xl leading-relaxed`}>
                            Vault valuations are based off of the current floor prices last captured by ecomiwiki. The result should only serve as a floor expectation for your collection, the calculation will not take into account your mint numbers, provenance, or any other variables that could influence price.
                        </p>
                    </div>
                </div>
            </section>

            <section className={`mt-0 px-10 pb-12 sm:pb-20 text-white relative flex items-center`}>
                <div className={`relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto`}>
                    <p className={`font-normal text-xl`}>
                        Please click on each collectible you own, and be sure to enter the correct quantity of each collectible.
                    </p>
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
                /> : null}
            </section>

            {JSON.stringify(usersCollectibles)}

            <footer className={`text-center p-5 text-white fixed w-full bottom-0 left-0 bg-gray-900 z-10 border-t border-black`}>
                <small className={`block uppercase text-sm font-medium text-gray-300`}>Your vault is valued at:</small>
                <p className={`font-normal text-xl text-green-500 font-medium text-3xl`}>${valuation.toLocaleString()}</p>
            </footer>


        </Default>
    )
}

export default withRouter(Valuation);