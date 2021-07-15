const TextInput = ({ inputValue, setInputValue }) => {
    return(
        <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder={`Type here...`}
            className={`w-auto border bg-gray-200 inline-block`}
        />
    )
}

export default TextInput