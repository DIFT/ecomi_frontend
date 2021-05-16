import CountUp from 'react-countup';

export const isChangeGoodOrBad = ( value ) => {
    if (value > 0) {
        return 'text-green-400'
    } else {
        return 'text-red-400'
    }
}

export const soldOut = (collectible) => {
    if (collectible < 1){
        return <span className={`bg-red-300 text-red-800 font-bold uppercase text-sm absolute z-10 py-1 px-2 -right-2 -top-3 rounded border border-red-800`}>Sold out</span>
    } else {
        return collectible
    }
}

export const getRarityThresholds = (collectible) => {
    let threshold;
    switch (collectible){
        case 'COMMON':
            threshold = 'bg-gray-400 border-gray-800 text-gray-900'
            break;
        case 'UNCOMMON':
            threshold = 'bg-green-400 border-green-800 text-green-900'
            break
        case 'RARE':
            threshold = 'bg-yellow-400 border-yellow-800 text-yellow-900'
            break;
        case 'ULTRA_RARE':
            threshold = 'bg-red-400 border-red-800 text-red-900'
            break
        case 'SECRET_RARE':
            threshold = 'bg-pink-400 border-pink-800 text-pink-900'
        default:
            threshold = 'bg-gray-400 border-gray-800 text-gray-900'
            break
    }
    return threshold;
}

export const getEditionTypeThresholds = (collectible) => {
    let threshold;
    switch (collectible){
        case 'FA':
            threshold = 'bg-red-400 border-red-800 text-red-900'
            break;
        case 'FE':
            threshold = 'bg-yellow-400 border-yellow-800 text-yellow-900'
            break
        default:
            threshold = 'bg-gray-400 border-gray-800 text-gray-900'
            break
    }
    return threshold;
}

export const getSerialRarity = (serial) => {
    let serialThreshold;

    switch (true){
        case (serial.match(/\d+/) < 200):
            serialThreshold = 'bg-red-400 border-red-800 text-red-900'
            break
        case (serial.match(/\d+/) < 500):
            serialThreshold = 'bg-yellow-400 border-yellow-800 text-yellow-900'
            break
        default:
            serialThreshold = 'bg-gray-400 border-gray-800 text-gray-900'
    }

    return serialThreshold
}

export const formatListingType = (listingType) => {
    let tag;
    switch (listingType){
        case 'FIXED':
            tag = <span className={`inline-block px-1 text-xxs font-medium rounded border uppercase bg-green-400 border-green-800 text-green-900`}>Fixed price</span>
            break
        case 'AUCTION':
            tag = <span className={`inline-block px-1 text-xxs font-medium rounded border uppercase bg-yellow-400 border-yellow-800 text-yellow-900`}>Auction</span>
            break
    }

    return tag
}

export const getListingType = (listingType) => {
    let listingIcon;

    switch (listingType){
        case 'FIXED':
            listingIcon = <span className={`h-14 w-14 border rounded-full text-center border bg-green-500 border-green-800 text-green-900 absolute z-10 -right-2 -top-3 border-2`}>
                <lord-icon
                    animation="hover"
                    palette="#333333;#333333"
                    size={'50px'}
                    params="80"
                    className={`inline`}
                    src={`./assets/icons/298-coins/298-coins-outline.json`}>
                </lord-icon>
            </span>
            break
        case 'AUCTION':
            listingIcon = <span className={`h-14 w-14 border rounded-full text-center border bg-yellow-400 border-yellow-800 text-yellow-900 absolute z-10 -right-2 -top-3 border-2`}>
                <lord-icon
                    animation="hover"
                    palette="#333333;#333333"
                    size={'50px'}
                    params="80"
                    className={`inline`}
                    src={`./assets/icons/119-law-judge/119-law-judge-outline.json`}>
                </lord-icon>
            </span>
            break
    }


    return listingIcon;
}

export const getPercentageChange = (currentPrice, storePrice) => {
    const calc = (currentPrice - storePrice) / storePrice * 100
    if (calc > 1){
        return <span className="border font-bold rounded ml-2 px-1 text-xs bg-green-400 border-green-800 text-green-900">
            <CountUp end={calc} duration={2.75} separator="," decimals={2} decimal="."/>%
        </span>
    } else {
        return <span className="border font-bold rounded ml-2 px-1 text-xs bg-red-400 border-red-800 text-red-900">
            <CountUp end={calc} duration={2.75} separator="," decimals={2} decimal="."/>%
        </span>
    }
}
