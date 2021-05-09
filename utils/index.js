export const isChangeGoodOrBad = ( value ) => {
    if (value > 0) {
        return 'text-green-400'
    } else {
        return 'text-red-400'
    }
}