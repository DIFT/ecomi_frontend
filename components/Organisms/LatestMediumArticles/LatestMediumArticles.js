import { useEffect, useState, useCallback, useRef } from "react"
import Slider from "react-slick"
import MediumArticleCard from "../../Molecules/Cards/MediumArticleCard"
import ArrowLeft from "../../Misc/Icons/ArrowLeft"
import ArrowRight from "../../Misc/Icons/ArrowRight"

const LatestMediumArticles = ({ mediumUser, title }) => {

    const sliderRef = useRef()

    const [mediumArticles, setMediumArticles] = useState([])
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

    // Fetch latest medium articles via rss2json
    const getMediumArticles = () => {
        fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${mediumUser}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setMediumArticles(data.items)
            })
            .catch(e => console.log('Failed to fetch:', e))
    }

    useEffect(() => {
        getMediumArticles()
    },[])

    const settings = {
        className: "center z-50",
        centerPadding: "100px",
        swipeToSlide: true,
        infinite: false,
        variableWidth: true,
        lazyLoad: true,
        slidesToShow: 5,
        speed: 500,
        arrows: false,
        dots: false,
    };

    return(
        <section className={`text-white relative mt-24`}>
            <div className="container">
                <div className="flex items-center">
                    <div className="flex-auto">
                        <h6 className={`text-3xl mb-3`}>{title}</h6>
                        <small className={`block mb-5`}>Drag or scroll to see more Medium articles</small>
                    </div>
                    <div className="flex-auto">
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
            </div>

            <Slider {...settings} onSwipe={handleSwiped} ref={sliderRef}>
                {mediumArticles && mediumArticles.map((article) => (
                    <div onClickCapture={handleOnItemClick} key={article.guid}>
                        <MediumArticleCard article={article} />
                    </div>
                ))}
                <div className={`bg-gray-900 medium-articles--view-all rounded-3xl`}>

                        <a href={`https://medium.com/${mediumUser}`} target="_blank" className={`block h-full w-full justify-center text-center text-center align-center items-center flex text-xl`}>View all</a>

                </div>
            </Slider>
        </section>
    )
}

export default LatestMediumArticles