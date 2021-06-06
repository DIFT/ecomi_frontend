import Carousel from "react-elastic-carousel"
import { useEffect, useState } from 'react'
import { getMarketPlaceListings } from "../../../actions/metrics/marketplace"
import CollectibleMarketCard from "../../../components/ecomi/CollectibleMarketCard";

const LatestListings = () => {
    const [listings, setListings] = useState([])
    const [offset, setOffset] = useState('')

    useEffect(() => {
        loadListings()
    }, [])

    const loadListings = () => {
        getMarketPlaceListings(offset)
            .then((data) => {
                if (data.error){
                    console.log('Error fetching marketplace listings', data.error)
                } else {
                    setListings(data.edges)
                    setOffset(data.pageInfo.endCursor)
                }
            })
            .catch(e => console.log('Error fetching listings ', e))
    }

    const handleLoadMore = (e) => {
        getMarketPlaceListings(offset)
            .then((data) => {
                if (data.error){
                    console.log('Error fetching marketplace listings', data.error)
                } else {
                    setListings(data.edges)
                    setOffset(data.pageInfo.endCursor)
                    console.log('Cursor is now:' , data.pageInfo.endCursor)
                }
            })
    }

    const breakpoints = [
        { width: 440, itemsToShow: 1},
        { width: 450, itemsToShow: 3},
        { width: 1280, itemsToShow: 6},
    ]

    return(
        <section className={`text-white relative mb-10`}>
            <div className="container">
                <div className="grid grid-cols-3 items-center">
                    <div className={`col-span-2`}>
                        <h6 className={`text-3xl mb-3`}>New marketplace listings</h6>
                        <small className={`block mb-3`}>Drag or scroll to see more premium collectibles</small>
                    </div>
                </div>
            </div>

            <ul className={`cursor-grab`}>
                <Carousel
                    breakPoints={breakpoints}
                    itemPadding={[20, 20]}
                    pagination={false}
                    outerSpacing={150}
                    showEmptySlots
                >
                    {listings && listings.map((listing, index) => (
                        <CollectibleMarketCard collectible={listing} index={index} />
                    ))}
                </Carousel>
            </ul>
        </section>
    )
}

export default LatestListings