import { useEffect, useState } from 'react'
import { XMasonry, XBlock } from "react-xmasonry"
import { getCollectibles } from '../../actions/collectibles/collectibles'
import { getComics } from '../../actions/comics/comics'
import { getFilteredProducts } from '../../actions/apiCore'
import { getBrands } from "../../actions/brand/brand"
import CollectibleCard from '/components/Molecules/Cards/CollectibleCard'
import Default from "../../components/Templates/Default"
import dynamic from "next/dynamic"


const LatestDrops = dynamic(
    () => import("../../components/Organisms/LatestDrops/LatestDrops"),
    { ssr: false }
)

const Brands = dynamic(
    () => import("../../components/Organisms/Sliders/Brands/Brands"),
    { ssr: false }
)

const Collectibles = () => {

    const [collectibles, setCollectibles] = useState([])
    const [loading, setLoading] = useState(true)
    const [brands, setBrands] = useState([])

    const [myFilters, setMyFilters] = useState({
        filters: {
            price: []
        }
    });

    const [limit, setLimit] = useState(15);
    const [offset, setOffset] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const loadFilteredResults = (newFilters) => {
        getFilteredProducts(offset, limit, newFilters).then( data => {
            console.log('Data is: ', data)
            if (data.error){
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setOffset(0);
            }
        })
    };

    const listBrands = () => {
        getBrands(0, 50)
            .then(data => {
                if (data.error){
                    console.log('Error fetching brands ', data.error)
                } else {
                    setBrands(data.data)
                    setSize(data.size);
                    setOffset(0)
                }
            })
    }

    const loadMore = () => {
        let toSkip = offset + limit;
        getFilteredProducts(toSkip, limit, myFilters.filters).then( data => {
            if (data.error){
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setOffset(toSkip);
            }
        })
    };

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore}>Load more</button>
            )
        )
    };

    const handleFilters = (filters, filterBy) => {
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        if (filterBy === "prices"){
            newFilters.filters[filterBy] = handlePrice(filters);
        }

        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data){
            if (data[key]._id === parseInt(value)){
                array = data[key].array;
            }
        }

        return array;
    };

    useEffect(() => {
        listBrands()
        loadFilteredResults(offset, limit, myFilters.filters);
    }, [])

    return (
        <Default>
            <div className={`grid grid-cols-5 gap-5 px-5 my-10`}>
                <aside>
                    <div className="bg-gray-900 shadow text-gray-300 rounded-3xl py-5">
                        <section className={`my-5 px-10`}>
                            <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-300">Rarity</h2>
                            <ul className={`my-2`}>
                                <li className={`inline-block mr-2 my-2`}><button className={`bg-transparent border border-white hover:bg-pink-700 hover:border-pink-500 hover:border-pink-500 text-white font-base py-2 px-4 rounded-full font-semibold text-xs`} onClick={filters => handleFilters('COMMON', 'rarity')}>Common</button></li>
                                <li className={`inline-block mr-2 my-2`}><button className={`bg-transparent border border-white hover:bg-pink-700 hover:border-pink-500 text-white font-base py-2 px-4 rounded-full font-semibold text-xs`} onClick={filters => handleFilters('UNCOMMON', 'rarity')}>Uncommon</button></li>
                                <li className={`inline-block mr-2 my-2`}><button className={`bg-transparent border border-white hover:bg-pink-700 hover:border-pink-500 text-white font-base py-2 px-4 rounded-full font-semibold text-xs`} onClick={filters => handleFilters('RARE', 'rarity')}>Rare</button></li>
                                <li className={`inline-block mr-2 my-2`}><button className={`bg-transparent border border-white hover:bg-pink-700 hover:border-pink-500 text-white font-base py-2 px-4 rounded-full font-semibold text-xs`} onClick={filters => handleFilters('ULTRA_RARE', 'rarity')}>Ultra Rare</button></li>
                                <li className={`inline-block mr-2 my-2`}><button className={`bg-transparent border border-white hover:bg-pink-700 hover:border-pink-500 text-white font-base py-2 px-4 rounded-full font-semibold text-xs`} onClick={filters => handleFilters('SECRET_RARE', 'rarity')}>Secret Rare</button></li>
                            </ul>
                        </section>

                        <section className={`my-5 px-10`}>
                            <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-300">Edition</h2>
                            <ul className={`my-2`}>
                                <li className={`inline-block mr-2 my-2`}><button className={`bg-transparent border border-white hover:bg-pink-700 hover:border-pink-500 text-white font-base py-2 px-4 rounded-full font-semibold text-xs`} onClick={filters => handleFilters('FA', 'editionType')}>First Apperance</button></li>
                                <li className={`inline-block mr-2 my-2`}><button className={`bg-transparent border border-white hover:bg-pink-700 hover:border-pink-500 text-white font-base py-2 px-4 rounded-full font-semibold text-xs`} onClick={filters => handleFilters('FE', 'editionType')}>First Edition</button></li>
                                <li className={`inline-block mr-2 my-2`}><button className={`bg-transparent border border-white hover:bg-pink-700 hover:border-pink-500 text-white font-base py-2 px-4 rounded-full font-semibold text-xs`} onClick={filters => handleFilters('CE', 'editionType')}>Comic-Con Exclusive</button></li>
                            </ul>
                        </section>

                        <section className={`my-5 px-10`}>
                            <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-300">Brand</h2>
                            <ul className={`my-2`}>
                                {brands && brands.map(brand => (
                                    <li className={`inline-block my-2 mr-2`}>
                                        <button onClick={filters => handleFilters(brand.name, 'brand.name')}><img key={brand._id} src={brand.squareImage.thumbnailUrl} alt={brand.name} className={`rounded-xl shadow border border-black hover:border-4 hover:border-pink-500  `} width={`60`} /></button>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </aside>
                <section className={`col-span-4`}>
                    {/*<LatestDrops />*/}
                    {/*<Brands />*/}
                    <XMasonry>

                        {filteredResults && filteredResults.map((collectible, index) => {
                            if (collectible.image.direction === "LANDSCAPE"){
                                return <XBlock width={2}><CollectibleCard collectible={collectible} classes={`mb-5`} /></XBlock>
                            } else {
                                return <XBlock><CollectibleCard collectible={collectible} /></XBlock>
                            }
                        })}
                        {/*{collectibles && collectibles.map(collectible => {*/}
                        {/*    if (collectible.image.direction === "LANDSCAPE"){*/}
                        {/*        return <XBlock width={2}><CollectibleCard collectible={collectible} classes={`mb-5`} /></XBlock>*/}
                        {/*    } else {*/}
                        {/*        return <XBlock><CollectibleCard collectible={collectible} /></XBlock>*/}
                        {/*    }*/}
                        {/*})}*/}
                    </XMasonry>
                    {loadMoreButton()}
                </section>
            </div>
        </Default>
    )
}

export default Collectibles