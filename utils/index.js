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
            <svg className="inline-block flex-shrink-0 h-3 w-3 text-green-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                 fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"></path>
            </svg>
            <CountUp end={calc} duration={2.75} separator="," decimals={2} decimal="."/>%
        </span>
    } else {
        return <span className="font-bold rounded ml-2 px-1 text-xs bg-red-400 text-red-900">
             <svg className="inline-block flex-shrink-0 h-3 w-3 text-red-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <CountUp end={calc} duration={2.75} separator="," decimals={2} decimal="."/>%
        </span>
    }
}

export const getPercentageChangeNumberOnly = (currentPrice, storePrice) => {
    const calc = (currentPrice - storePrice) / storePrice * 100
    return calc
}

export const isChangeGoodOrBad = ( value ) => {
    if (value > 0) {
        return 'text-green-400'
    } else {
        return 'text-red-400'
    }
}