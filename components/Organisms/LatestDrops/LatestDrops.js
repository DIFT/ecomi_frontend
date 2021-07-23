import { useRef } from 'react'
import Link from "next/link"
import { useEffect, useState, useCallback } from "react"
import { getNewArrivals } from "../../../actions/store/store"
import Slider from "react-slick"
import CollectibleCard from "../../Molecules/Cards/CollectibleCard"
import ArrowLeft from "../../Misc/Icons/ArrowLeft"
import ArrowRight from "../../Misc/Icons/ArrowRight"

const LatestDrops = () => {

    const sliderRef = useRef()

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
        <section className={`text-white relative -mt-64 z-10`}>
            <div className="container">
                <div className="flex items-center">
                    <div className="flex-auto">
                        <h6 className={`text-3xl mb-3`}>Latest premium collectibles (NFTs)</h6>
                        <small className={`block mb-5`}>Drag or scroll to see more premium collectibles</small>
                    </div>
                    <div className="flex-auto">
                        <nav className={`text-right`}>
                            <ul>
                                <li className={`inline-block`}><button onClick={e => sliderRef.current.slickPrev()}><ArrowLeft size={`30`}/></button></li>
                                <li className={`inline-block ml-2`}><button onClick={e => sliderRef.current.slickNext()}><ArrowRight size={`30`}/></button></li>
                            </ul>
                        </nav>
                    </div>
                </div>

            </div>

            <Slider {...settings} onSwipe={handleSwiped} ref={sliderRef}>
                {newArrivals && newArrivals.map(collectible => (
                    <div onClickCapture={handleOnItemClick} key={collectible._id}><CollectibleCard collectible={collectible} /></div>
                ))}
                <div className={`bg-gray-900 latest-drops--view-all rounded-3xl`}>
                    <span className={`h-full w-full justify-center text-center text-center align-center items-center flex text-xl`}>View all <br />Coming soon</span>
                </div>
            </Slider>
        </section>
    )
}

export default LatestDrops