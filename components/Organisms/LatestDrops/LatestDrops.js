import { useRef } from 'react'
import Link from "next/link"
import { useEffect, useState, useCallback } from "react"
import { getNewArrivals } from "../../../actions/store/store"
import Slider from "react-slick"
import CollectibleCard from "../../Molecules/Cards/CollectibleCard"
import ArrowLeft from "../../Misc/Icons/ArrowLeft"
import ArrowRight from "../../Misc/Icons/ArrowRight"
import { useTranslation } from "react-i18next";

const LatestDrops = () => {

    const { t } = useTranslation();

    const sliderRef = useRef()

    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(12)
    const [size, setSize] = useState(0)


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
        getNewArrivals(offset, limit)
            .then(data => {
                if (data.error){
                    console.log('Error fetching new arrivals', data.error)
                } else {
                    setNewArrivals(data.data)
                    setSize(data.size);
                    setOffset(0)
                }
            })
            .catch(e => console.log('Failed to fetch', e))
    }

    // Run on page load
    useEffect(() => {
        listNewArrivals()
    },[])

    const settings = {
        lazyLoad: true,
        slidesToShow: 7.5,
        slidesToScroll: 3,
        swipeToSlide: true,
        infinite: false,
        variableWidth: true,
        speed: 500,
        arrows: false,
        dots: false,
        adaptiveHeight: false,
        afterChange: () => {
            fetchMoreDrops()
        }
    };

    const fetchMoreDrops = () => {
        let toSkip = offset + limit

        getNewArrivals(toSkip, limit)
            .then(data => {
                if (data.error){
                    console.log('Something went wrong fetching more.')
                } else {
                    setNewArrivals([...newArrivals, ...data.data])
                    console.log('new arrivals is now: ', ...newArrivals)
                    setSize(data.size);
                    setOffset(toSkip);
                }
            })
    }

    return(
        <section className={`text-white relative mt-20 z-10`}>
            <div className="container">
                <div className="flex items-center">
                    <div className="flex-auto">
                        <h6 className={`text-3xl mb-3`}>{t(`latestDrops.title`)}</h6>
                        <small className={`block mb-5`}>{t(`latestDrops.dragAndScroll`)}</small>
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
            </Slider>

        </section>
    )
}

export default LatestDrops