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
            threshold = 'bg-pink-400 border-pink-800 text-pink-900 omg'
            break
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