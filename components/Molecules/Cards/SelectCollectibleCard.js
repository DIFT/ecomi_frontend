import { useEffect, useState } from 'react'
import Link from "next/link"
import Badge from "../../Atoms/Badge/Badge"
import {getRarityThresholds, getEditionTypeThresholds, truncate, soldOut} from "../../../utils"
import ArrowRight from "../../Misc/Icons/ArrowRight"


const SelectCollectibleCard = ({ collectible, classes = '', handleToggle, handleQuantity }) => {

    const [selected, setSelected] = useState(false)
    const [quantity, setQuantity] = useState(0)

    const handleQuantiyChange = (e) => {
        setQuantity(e.target.value)
    }
    
    useEffect(() => {
        handleQuantity({collectibleId: collectible._id, quantity: quantity})
    }, [quantity])

    return(
        <>
            <div className={`flex px-5 mb-10 justify-center items-center align-center filter ${!selected? 'grayscale' : null}`}>
                <div className={`bg-gray-900  collectible__card collectible__card--${collectible.rarity.toLowerCase()} rounded-3xl overflow-hidden block border-4 ${selected ? ' border-pink-500' : 'border-transparent'}`}>
                    <button onClick={e => {
                        handleToggle(e, {collectibleId: collectible._id, quantity: 1})
                        setSelected(!selected)
                        setQuantity(selected ? 0 : 1)
                    }}>
                        <span className="overflow-hidden block rounded-3xl">
                            <figure className={`relative z-10`}>
                                <div className={`card-fx card-fx--${collectible.rarity.toLowerCase()}`}>
                                    <img src={collectible.image.lowResolutionUrl} alt={collectible.name} width={"100%"} className={`rounded-3xl`} />
                                </div>
                            </figure>
                        </span>
                    <figcaption className={`relative -z-1 w-full`}>
                        <div className="flex items-center -mt-4 pt-5 pb-2 px-6 bg-gray-900 overflow-hidden rounded-b-3xl relative z-1">
                            <div className="flex-1">
                                <h6 className={`block text-left font-semibold py-2 text-white`}>{truncate(collectible.name, 20)}</h6>
                            </div>
                            <div>
                                <ArrowRight classes={`text-white float-right`} />
                            </div>
                        </div>
                        <div className="flex items-center bg-white -mt-6 pt-7 px-6 pb-2 rounded-b-3xl z-10">
                            <div className={`flex`}>
                                <Badge classes={`inline-block px-2 py-1 text-xs rounded mr-2 ${getRarityThresholds(collectible.rarity)}`}>{collectible.rarity}</Badge>
                                <Badge classes={`inline-block px-2 py-1 text-xs rounded ${getEditionTypeThresholds(collectible.editionType)}`}>
                                    {collectible.editionType !== null ? collectible.editionType : '?'}
                                </Badge>
                            </div>
                        </div>
                    </figcaption>
                    </button>

                    <div>
                        <div className="flex items-center align-center justify-center text-white bg-gray-900 overflow-hidden rounded-b-3xl relative z-0">
                            <div className={`flex`}>
                                <div className="custom-number-input">
                                    <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                                        <button data-action="decrement"
                                                onClick={e => {
                                                    if (quantity - 1 < 0){
                                                        setQuantity(0)
                                                    } else {
                                                        setQuantity(quantity - 1)
                                                    }
                                                }}
                                                className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                                            <span className="m-auto text-2xl font-thin">−</span>
                                        </button>
                                        <input type="number"
                                               className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                                               name="custom-input-number"
                                               value={quantity}
                                               min={0}
                                               onChange={e => handleQuantiyChange(e)}
                                        />
                                        <button data-action="increment"
                                                onClick={e => setQuantity(quantity + 1)}
                                                className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                                            <span className="m-auto text-2xl font-thin">+</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default SelectCollectibleCard