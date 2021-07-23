const PortraitCard = ({ collectible }) => {
    return(
        <div className="text-center w-36 rounded-md overflow-hidden bg-gray-300 items-center justify-center flex mx-auto">
            <div>
                <img src={`./assets/images/veve/collectibles/cards/${collectible.brand[0].slug}/${collectible.slug}.jpg`} width="100%" className="h-48 block" />
                <span className="block text-xs py-1 px-2 bg-gray-100 text-black text-left rounded-md">{collectible.title}</span>
                <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-left float-left">{collectible.rarity}</span>
                <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-right float-right">
                    <img src="./assets/images/veve/icons/gem.png" width="13px" className="inline-block mr-1" />
                    {collectible.listPrice}
                </span>
            </div>
        </div>
    )
}

export default PortraitCard