import Link from "next/link"
import { useEffect, useState, useCallback } from "react"
import { getNewArrivals } from "../../../actions/store/store"
import Slider from "react-slick"
import CollectibleCard from "../../Molecules/Cards/CollectibleCard";

const LatestDrops = () => {

    const [newArrivals, setNewArrivals] = useState([])
    const [swiped, setSwiped] = useState(false)

    const handleSwiped = useCallback(() => {
        setSwiped(true)
    }, [setSwiped])

    const handleOnItemClick = useCallback(
        (e) => {
            if (swiped) {
                e.stopPropagation()
                e.preventDefault()
                setSwiped(false)
            }
        },
        [swiped],
    )

    // Fetch new arrivals
    const listNewArrivals = () => {
        getNewArrivals()
            .then(data => {
                if (data.error){
                    console.log('Error fetching new arrivals', data.error)
                } else {
                    setNewArrivals(data)
                }
            })
            .catch(e => console.log('Failed to fetch', e))
    }

    // Run on page load
    useEffect(() => {
        listNewArrivals()
    },[])

    const settings = {
        className: "center z-50",
        centerPadding: "100px",
        swipeToSlide: true,
        infinite: false,
        variableWidth: true,
        speed: 500,
        arrows: false,
        dots: false,
    };

    return(
        <section className={`text-white relative -mt-64`}>
            <div className="container">
                <h6 className={`text-3xl mb-3`}>Latest premium collectibles (NFTs)</h6>
                <small className={`block mb-5`}>Drag or scroll to see more premium collectibles</small>
            </div>

            <Slider {...settings} onSwipe={handleSwiped}>
                {newArrivals && newArrivals.map(collectible => (
                    <div onClickCapture={handleOnItemClick} key={collectible._id}><CollectibleCard collectible={collectible} /></div>
                ))}
            </Slider>
        </section>
    )
}

export default LatestDrops