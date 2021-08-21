import { useRef } from 'react'
import Link from "next/link"
import { useEffect, useState, useCallback } from "react"
import { getBrands } from '/actions/brand/brand'
import Slider from "react-slick"
import ArrowLeft from "../../../Misc/Icons/ArrowLeft"
import ArrowRight from "../../../Misc/Icons/ArrowRight"

const BrandsSlider = () => {

    const sliderRef = useRef()

    const [loading, setLoading] = useState(true)
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(15)
    const [size, setSize] = useState(0)

    const [brands, setBrands] = useState([])
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

    const listBrands = () => {
        getBrands(offset, limit)
            .then(data => {
                if (data.error){
                    console.log('Error fetching new brands', data.error)
                } else {
                    setBrands(data.data)
                    setSize(data.size)
                    setOffset(0)
                    setLoading(false)

                }
            })
            .catch(e => console.log('Failed to fetch', e))
    }

    useEffect(() => {
        listBrands()
    },[])

    const settings = {
        className: 'center',
        centerPadding: '20',
        lazyLoad: true,
        slidesToShow: 12,
        slidesToScroll: 1,
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

        getBrands(toSkip, limit)
            .then(data => {
                if (data.error){
                    console.log('Something went wrong fetching more.')
                } else {
                    setBrands([...brands, ...data.data])
                    setSize(data.size)
                    setOffset(toSkip)
                }
            })
    }

    return(
        <section className={`text-white relative mt-20 z-10`}>
            <div className="container">
                <div className="flex items-center">
                    <div className="flex-auto">
                        <h6 className={`text-3xl mb-3`}>Brands</h6>
                        <small className={`block mb-5`}>Drag or scroll to see more premium brands</small>
                    </div>
                    <div className="flex-auto">
                        {loading ? null : (
                            <nav className={`text-right`}>
                                <ul>
                                    <li className={`inline-block`}><button onClick={e => sliderRef.current.slickPrev()}><ArrowLeft size={`30`}/></button></li>
                                    <li className={`inline-block ml-2`}><button onClick={e => sliderRef.current.slickNext()}><ArrowRight size={`30`}/></button></li>
                                </ul>
                            </nav>
                        )}
                    </div>
                </div>
            </div>

            {loading ?
                'LOADING'
                : (
                <Slider {...settings} onSwipe={handleSwiped} ref={sliderRef}>
                    {brands && brands.map(brand => (
                        <div onClickCapture={handleOnItemClick} key={brand._id} className={`px-5`}>
                            <img src={brand.squareImage.thumbnailUrl} alt={brand.name} className={`rounded-xl shadow border border-black`}/>
                        </div>
                    ))}
                </Slider>
            )}
        </section>
    )
}

export default BrandsSlider