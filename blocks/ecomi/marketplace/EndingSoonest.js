import Carousel from "react-elastic-carousel"
import { useEffect, useState } from 'react'
import { getMarketPlaceEndingSoonest } from "../../../actions/marketplace/marketplace"
import CollectibleMarketCard from "../../../components/ecomi/CollectibleMarketCard";

const EndingSoonest = () => {
    const [listings, setListings] = useState([])
    const [offset, setOffset] = useState('')

    useEffect(() => {
        loadListings()
    }, [])

    const loadListings = () => {
        getMarketPlaceEndingSoonest(offset)
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

    // const handleLoadMore = (e) => {
    //     getMarketPlaceEndingSoonest(offset)
    //         .then((data) => {
    //             if (data.error){
    //                 console.log('Error fetching ending soonest listings', data.error)
    //             } else {
    //                 setListings(data.edges)
    //                 setOffset(data.pageInfo.endCursor)
    //             }
    //         })
    // }

    const breakpoints = [
        { width: 440, itemsToShow: 1},
        { width: 450, itemsToShow: 3},
        { width: 1280, itemsToShow: 6},
    ]

    return(
        <section className={`text-white relative`}>
            <div className="container">
                <div className="grid grid-cols-3 items-center">
                    <div className={`col-span-2`}>
                        <h6 className={`text-3xl mb-3`}>Auctions ending #soon</h6>
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

            {/*<button className={`text-lg text-center p-3 m-3 border`} onClick={e => handleLoadMore()}>LOAD MORE</button>*/}
        </section>
    )
}

export default EndingSoonest