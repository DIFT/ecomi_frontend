import { useEffect, useState, useCallback } from "react"
import Slider from "react-slick"
import MediumArticleCard from "../../Molecules/Cards/MediumArticleCard";

const LatestMediumArticles = () => {

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
        fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/veve-collectibles`, {
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
        speed: 500,
        arrows: false,
        dots: false,
    };

    return(
        <section className={`text-white relative mt-24`}>
            <div className="container">
                <h6 className={`text-3xl mb-3`}>Latest Medium articles</h6>
                <small className={`block mb-5`}>Drag or scroll to see more Medium articles</small>
            </div>

            <Slider {...settings} onSwipe={handleSwiped}>
                {mediumArticles && mediumArticles.map((article) => (
                    <div onClickCapture={handleOnItemClick} key={article.guid}>
                        <MediumArticleCard article={article} />
                    </div>
                ))}
            </Slider>
        </section>
    )
}

export default LatestMediumArticles