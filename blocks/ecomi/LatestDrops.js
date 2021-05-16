import Carousel from "react-elastic-carousel"
import Link from "next/link"
import {useEffect, useState} from "react"
import {getNewArrivals} from "../../actions/store/store"
import CollectibleCard from "../../components/ecomi/CollectibleCard"

const LatestDrops = () => {

    const [newArrivals, setNewArrivals] = useState([])

    const listNewArrivals = () => {
        getNewArrivals()
            .then(data => {
                if (data.error){
                    console.log('Error fetching new arrivals', data.error)
                } else {
                    setNewArrivals(data.edges)
                }
            })
            .catch(e => console.log('Failed to fetch', e))
    }

    useEffect(() => {
        listNewArrivals()
    },[])

    const breakpoints = [
        { width: 440, itemsToShow: 1},
        { width: 450, itemsToShow: 3},
        { width: 1280, itemsToShow: 6},
    ]

    return(
        <section className={`text-white relative -mt-32`}>
            <div className="container">

                <div className="grid grid-cols-3 items-center">
                    <div className={`col-span-2`}>
                        <h6 className={`text-3xl mb-3`}>Latest premium collectibles (NFTs)</h6>
                        <small className={`block mb-5`}>Drag or scroll to see more premium collectibles</small>
                    </div>
                    <div className="text-right">
                        <span className={`uppercase text-xs text-gray-400`}>View all</span>
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
                    {newArrivals && newArrivals.map((collectible, index) => (
                        <CollectibleCard collectible={collectible} index={index} />
                    ))}
                </Carousel>
            </ul>
        </section>
    )
}

export default LatestDrops