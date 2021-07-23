import CountUp from "react-countup"

export const getRarityThresholds = (collectible) => {
    let threshold;
    switch (collectible){
        case 'COMMON':
            threshold = 'bg-gray-400 text-gray-900'
            break;
        case 'UNCOMMON':
            threshold = 'bg-green-400 text-green-900'
            break
        case 'RARE':
            threshold = 'bg-yellow-400 text-yellow-900'
            break;
        case 'ULTRA_RARE':
            threshold = 'bg-red-400 text-red-900'
            break
        case 'SECRET_RARE':
            threshold = 'bg-pink-400 text-pink-900 omg'
            break
        default:
            threshold = 'bg-gray-400 text-gray-900'
            break
    }
    return threshold;
}

export const getEditionTypeThresholds = (collectible) => {
    let threshold;
    switch (collectible){
        case 'FA':
            threshold = 'bg-red-400 text-red-900'
            break;
        case 'FE':
            threshold = 'bg-yellow-400 text-yellow-900'
            break
        default:
            threshold = 'bg-gray-400 text-gray-900'
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

export const truncate = (str, length) => {
    const ending = '...';
    if (length == null) {
        length = 200;
    }
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
}

export const soldOut = (collectible) => {
    if (collectible < 1){
        return <span className={`absolute z-10 top-2 right-2 -rotate-45 collectible__card--sold-out`}><img src={`./assets/images/ui/sold-out.png`} alt={"Item has sold out"} width={"70"} /></span>
    } else {
        return
    }
}

export const getPercentageChange = (currentPrice, storePrice) => {
    const calc = (currentPrice - storePrice) / storePrice * 100
    if (calc > 1){
        return <span className="font-bold rounded ml-2 px-1 text-xs bg-green-400 text-green-900">
            <CountUp end={calc} duration={2.75} separator="," decimals={2} decimal="."/>%
        </span>
    } else {
        return <span className="font-bold rounded ml-2 px-1 text-xs bg-red-400 text-red-900">
            <CountUp end={calc} duration={2.75} separator="," decimals={2} decimal="."/>%
        </span>
    }
}

export const getPercentageChangeNumberOnly = (currentPrice, storePrice) => {
    const calc = (currentPrice - storePrice) / storePrice * 100
    return calc
}