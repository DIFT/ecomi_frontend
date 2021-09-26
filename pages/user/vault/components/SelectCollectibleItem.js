import { useState } from 'react'
import {getEditionTypeThresholds, getPercentageChange, getRarityThresholds} from "../../../../utils"

const SelectCollectibleItem = ({ collectible, handleCollectibleSelection, handleQuantitySelection }) => {

    const [userSelected, setUserSelected] = useState(false)
    const [quantity, setQuantity] = useState(1)

    const handleQuantityChange = (e, collectibleId) => {
        setQuantity(e.target.value)
        handleQuantitySelection(collectibleId, e.target.value, userSelected)
    }
    
    return(
        <tr className={`flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 border border-gray-900`} role={"row"}>
            <td className={`px-6 py-4 whitespace-nowrap`} role={`cell`}>
                <div className="flex items-center">
                    <div
                        className={`w-16 h-16 mr-3 rounded-xl shadow border-2 hover:border-4 hover:border-pink-500 border-black`}
                        style={{
                            background: `url(${collectible?.image?.thumbnailUrl})`,
                            backgroundPosition: '50%',
                            backgroundSize: 'cover'
                        }}>
                    </div>
                    <div>

                        <span>{collectible.name}</span>
                        <br/>
                        <span className={`inline-block px-1 text-xs font-bold rounded ${getRarityThresholds(collectible.rarity)}`}>
                           {collectible.rarity}
                        </span>
                        <span className={`inline-block px-1 text-xs font-bold rounded ml-1 ${getEditionTypeThresholds(collectible.editionType)}`}>
                            {collectible.editionType}
                        </span>
                    </div>
                </div>
            </td>
            <td className={`px-6 py-4 whitespace-nowrap`} role={`cell`}>
                <input
                    type="number"
                    min={0}
                    disabled={!userSelected}
                    className={`rounded-3xl p-3 ${userSelected ? 'bg-gray-900 text-white' : 'opacity-50 bg-gray-900 text-gray-500 '}`}
                    value={quantity}
                    onChange={e => handleQuantityChange(e, collectible.collectibleId)}
                />
            </td>
            <td className={`px-6 py-4 whitespace-nowrap`} role={`cell`}>
                <button
                    className={`border w-20 text-white font-base py-2 px-4 rounded-full font-semibold text-sm ${userSelected ? 'bg-pink-500 border-pink-500' : ' bg-transparent border-white'}`}
                    role="row"
                    onClick={e => {
                        handleCollectibleSelection(collectible.collectibleId, quantity, userSelected)
                        setUserSelected(!userSelected)
                    }}
                >
                    {userSelected ? 'Remove' : 'Add'}
                </button>
            </td>
        </tr>
    )
}

export default SelectCollectibleItem
