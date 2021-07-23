import { isChangeGoodOrBad } from "../../../utils"

const PriceCard = ({ label, value, prefix, suffix = '', classes }) => {
    return (
        <div className={`bg-gray-900 max-w-xs py-3 px-5 rounded-3xl shadow-inner shadow-lg`}>
            <span className="uppercase text-sm text-gray-300 block tracking-wide">{label}</span>
            <span className={`${classes} text-2xl font-semibold ${isChangeGoodOrBad(value)}`}>{suffix}{value}{prefix}</span>
        </div>
    )
}

export default PriceCard