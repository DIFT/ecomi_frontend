import { useEffect, useState, useRef, useCallback } from 'react'
import Link from "next/link"
import Slider from "react-slick"
import moment from "moment"
import Image from 'next/image'
import { getVeveMetrics } from "../../../actions/metrics/metrics"
import PriceCard from "../../Molecules/Cards/PriceCard"
import dynamic from "next/dynamic"
import { Noise } from 'noisejs'
import {API} from "../../../config"
import LatestMediumArticles from "../LatestMediumArticles/LatestMediumArticles"
import PhoneApplication from "../../Misc/Emulator/PhoneApplication"
import Default from "../../Templates/Default"
import CollectibleCard from '../../Molecules/Cards/CollectibleCard'
import Badge from "../../Atoms/Badge/Badge"
import {getRarityThresholds, getEditionTypeThresholds, truncate, soldOut} from "../../../utils"
import ArrowRight from "../../Misc/Icons/ArrowRight"
import { getBrands } from "../../../actions/brand/brand"
import { useTranslation } from 'react-i18next'

// Icons
const CheckIcon = dynamic(() => import('../../../components/Misc/LordIcon').then((mod) => mod.CheckIcon), {
    ssr: false
});

const LatestDrops = dynamic(
    () => import("../../Organisms/LatestDrops/LatestDrops"),
    { ssr: false }
)

const CollectiblesRevenueBar = dynamic(
    () => import("../../Organisms/Metrics/CollectiblesRevenueBar"),
    { ssr: false }
);

const VeveIntro = () => {
    const { t } = useTranslation();

    const VeveIntroStripSection = () => {
        return(
            <section className={`veve-intro px-10 pt-4 pb-72 lg:pb-4 sm:pt-5 md:pt-6 xl:pt-8 bg-gray-900  text-white shadow-inner shadow-lg overflow-hidden relative`}>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 py-20">
                        <div>
                            <small className={`block uppercase text-xs mb-5 font-medium text-gray-400`}>{t(`veveIntro.teamPresents`)}</small>
                            <h1 className="text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-gray-900 mb-8 sm:mb-10">
                                <img src={`./assets/images/veve-logo--white.png`} width={`300`} alt={`VEVE`} />
                            </h1>
                            <h2 className={`text-4xl lg:text-6xl leading-none font-semibold tracking-tight mb-8 sm:mb-10`}>{t(`veveIntro.premium`)}</h2>
                            <p className={`font-base text-xl leading-relaxed mb-5`}>
                                {t(`veveIntro.app`)}<strong>{t(`veveIntro.app1`)}</strong>{t(`veveIntro.app2`)}
                            </p>

                            <ul className={`my-10`}>
                                <li className={`inline-block mr-3`}><a href="#" target={"_blank"} className={`border border-white text-white font-base py-2 px-4 rounded-full font-semibold text-sm`}>Google play</a></li>
                                <li className={`inline-block`}><a href="#" target={"_blank"} className={`border border-white text-white font-base py-2 px-4 rounded-full font-semibold text-sm`}>App store</a></li>
                            </ul>

                            <p className={`font-base text-xl leading-relaxed mb-5 text-gray-300`}>
                                {t(`veveIntro.lunched`)}
                            </p>

                            <small className={`uppercase text-sm text-gray-300 block tracking-wide`}>{t(`veveIntro.drops`)}
                            <span className={`cursor-pointer`} data-tip={`${t(`veveIntro.verified`)} <a href="https://youtu.be/LkRZtFeh88A?t=3438" target="_blank" class="text-pink-500">YouTube Live</a>`} data-html={true} data-event='click focus'>
                                <CheckIcon />
                            </span>
                            </small>
                            {/*<p className={`font-base text-base leading-relaxed`}>*/}
                            {/*    With VEVE, users can obtain common, rare, or one-of-a-kind digital collectibles, customise and showcase them in the virtual showrooms,*/}
                            {/*    as well as buy, sell or trade collectibles with other VEVE users.*/}
                            {/*    The app was officially launched in BETA on October 2020 and regularly drops new collectibles every Thursday at 4pm GMT - <strong>The drops tend to sell out within minutes!</strong>*/}
                            {/*    <span className={`cursor-pointer`} data-tip={`Verified by various sources: <a href="https://youtu.be/LkRZtFeh88A?t=3438" target="_blank" class="text-pink-500">YouTube Live</a>`} data-html={true} data-event='click focus'>*/}
                            {/*            <CheckIcon />*/}
                            {/*    </span>*/}
                            {/*</p>*/}
                        </div>
                        <div>
                            <div className={`position`}>
                                <img src={`assets/images/veve-hero.png`} alt="VEVE Hero Image" className={`absolute`} width={`600`} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    const VevePremiumBrands = () => {

        const sliderRef = useRef()

        const [offset, setOffset] = useState(0)
        const [limit, setLimit] = useState(13)
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
                        console.log('Error fetching brands ', data.error)
                    } else {
                        setBrands(data.data)
                        setSize(data.size);
                        setOffset(0)
                    }
                })
        }

        useEffect(() => {
            listBrands()
        },[])

        const settings = {
            className: 'center',
            slidesToShow: 12,
            slidesToScroll: 1,
            swipeToSlide: true,
            lazyLoad: true,
            infinite: true,
            arrows: false,
            dots: false,
            adaptiveHeight: false,
            responsive: [
                {
                    breakpoint: 1600,
                    settings: {
                        slidesToShow: 12,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 10,
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 7,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 4,
                    }
                }
            ],
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
                        setSize(data.size);
                        setOffset(toSkip);
                    }
                })
        }

        return(
            <section className={`pt-4 pb-4 text-white text-center overflow-hidden shadow bg-gray-900`}>
                <h4 className="text-2xl mb-3">
                    {t(`veveIntro.brand`)}
                    <span className={`cursor-pointer inline-block`} data-tip={`${t(`veveIntro.announced`)} <a href="https://medium.com/ecomi/huge-international-licenses-announced-for-ve-ve-d84f747c96ce" target="_blank" class="text-pink-500">https://medium.com/ecomi/huge-international-licenses-announced-for-ve-ve-d84f747c96ce</a>`} data-html={true} data-event='click focus'>
                        <CheckIcon />
                    </span>
                </h4>
                <small className="block text-base text-gray-300 mb-10">
                    {t(`veveIntro.recognized`)}
                </small>

                <Slider {...settings}>
                    {brands && brands.map(brand => (
                        <div className={`px-2`}>
                            <img key={brand._id} src={brand.squareImage.thumbnailUrl} alt={brand.name} className={`rounded-xl shadow border border-black`}/>
                        </div>
                    ))}
                </Slider>
            </section>
        )
    }

    const VeveEmulatorSection = () => {

        const [tab, setTab] = useState(1)

        const toggleTab = (tab) => {
            setTab(tab)
        }

        const storeBlock = () => {
            return(
                <div className={`${tab === 1 ? 'block' : 'hidden'}`}>
                    <h2 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-5`}>{t(`veveIntro.store.title`)}</h2>
                    <small className={`uppercase text-sm text-gray-300 block tracking-wide block mb-8 `}>{t(`veveIntro.store.growCollection`)}</small>

                    <p className={`font-semibold text-2xl leading-relaxed mb-10`}>
                        {t(`veveIntro.store.browse`)}
                    </p>
                    <p className={`font-base text-xl leading-relaxed`}>
                        {t(`veveIntro.store.offers`)}
                    </p>
                </div>
            )
        }

        const collectionBlock = () => {
            return(
                <div className={`${tab === 2 ? 'block' : 'hidden'}`}>
                    <div className={`flex-1`}>
                        <h2 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-5`}>{t(`veveIntro.collection.title`)}</h2>
                        <small className={`uppercase text-sm text-gray-300 block tracking-wide block mb-8 `}>{t(`veveIntro.collection.interactiveNFT`)}</small>

                        <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11`}>
                            {t(`veveIntro.collection.showRooms`)}
                        </p>
                        <p className={`leading-relaxed mb-8 text-lg`}>
                            {t(`veveIntro.collection.functionalities`)}
                        </p>
                    </div>
                </div>
            )
        }

        const feedBlock = () => {
            return(
                <div className={`${tab === 3 ? 'block' : 'hidden'}`}>
                    <div className={`flex-1`}>
                        <h2 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-5`}>{t(`veveIntro.feed.title`)}</h2>
                        <small className={`uppercase text-sm text-gray-300 block tracking-wide block mb-8 `}>{t(`veveIntro.feed.show`)}</small>

                        <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11`}>
                            {t(`veveIntro.feed.description`)}
                        </p>
                        <p className={`leading-relaxed mb-8 text-lg`}>
                            {t(`veveIntro.feed.description2`)}
                        </p>
                    </div>
                </div>
            )
        }

        const marketBlock = () => {
            return(
                <div className={`${tab === 4 ? 'block' : 'hidden'}`}>
                    <div className={`flex-1`}>
                        <h2 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-5`}>{t(`veveIntro.market.title`)}</h2>
                        <small className={`uppercase text-sm text-gray-300 block tracking-wide block mb-8 `}>{t(`veveIntro.market.subtitle`)}</small>

                        <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11`}>
                            {t(`veveIntro.market.description`)}
                        </p>
                        <p className={`leading-relaxed mb-8 text-lg`}>
                            {t(`veveIntro.market.description1`)}
                        </p>
                        <p className={`leading-relaxed mb-8 text-lg`}>
                            {t(`veveIntro.market.description2`)}<a href={`https://twitter.com/vevecollect/status/1386265208427974657`} className={`text-pink-500`}  target={"_blank"}>{t(`veveIntro.market.description3`)}</a>. {t(`veveIntro.market.description4`)} <a href={"https://medium.com/veve-collectibles/powerpuff-girls-series-2-f61c8d4f30e5"} className={`text-pink-500`} target={"_blank"}>{t(`veveIntro.market.description4`)}</a>.
                        </p>
                        <p className={`leading-relaxed mb-8 text-lg`}>
                            {t(`veveIntro.market.description6`)}
                        </p>
                    </div>
                </div>
            )
        }

        const accountBlock = () => {
            return(
                <div className={`${tab === 5 ? 'block' : 'hidden'}`}>
                    <div className={`flex-1`}>
                        <h2 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-5`}>{t(`veveIntro.account.title`)}</h2>
                        <small className={`uppercase text-sm text-gray-300 block tracking-wide block mb-8 `}>{t(`veveIntro.account.subtitle`)}</small>

                        <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11`}>
                            {t(`veveIntro.account.description`)}
                        </p>
                        <p className={`leading-relaxed mb-8 text-lg`}>
                            {t(`veveIntro.account.description1`)}
                        </p>
                    </div>
                </div>
            )
        }

        return(
            <>
            <section className={`px-10 pt-4 pb-4 text-white mb-10 overflow-hidden mt-10`}>
                <div className="container">
                    <p className="mb-8 text-xl leading-relaxed">
                        {t(`veveIntro.description`)}
                    </p>
                </div>
            </section>

                <section className={`px-10 pt-4 pb-4 text-white mb-10 overflow-hidden mt-10`}>
                    <div className={`max-w-screen-lg xl:max-w-screen-xl mx-auto`}>
                        <div className="flex items-center ">
                            <div className={`flex-1 text-white`}>
                                {storeBlock()}
                                {collectionBlock()}
                                {feedBlock()}
                                {marketBlock()}
                                {accountBlock()}
                            </div>
                            <div className={`mr-10 lg:ml-36 hidden md:block`}>
                                <PhoneApplication screen={`store`} setTab={setTab}  />
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }

    const VeveMetricsSection = () => {
        const [vevemetrics, setVeveMetrics] = useState()

        useEffect(() => {
            getVeveMetrics()
                .then(data => {
                    setVeveMetrics(data)
                    console.log('veve metrics is: ', data)
                })
                .catch((e) => console.log('Error getting veve metrics: ', e))
        },[])

        return(
            <section className={`px-10 pt-4 pb-4 sm:pt-5 md:pt-6 xl:pt-8 sm:pb-5 text-white mt-10`}>
                <div className="container">

                    <h4 className={`text-2xl mb-3`}>{t(`veveIntro.metrics.title`)}</h4>

                    <p className="mb-8 text-xl leading-relaxed">
                        {t(`veveIntro.metrics.description`)}
                        <span className={`cursor-pointer`} data-tip={`Source: <strong className="font-bold z-10"><a href="https://techcrunch.com/2020/03/25/the-future-of-collectibles-is-digital/?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAAIu8AJeYB16zZo4BOLLKZdJd3lfzCHdUFBUQZoJm-zvnHvWGSrALKXtClg4P7wG9QPXodNAO7aQRwXJBnyaWF7kN0oPeaOgGOrTMy4numrPdywZXhsOAhZvfn4KUSbuGI5R4cK_nBO_cJFzyfXYrUEoMfcVWwDYEj0b4NsdaXuq1" target="_blank" class="text-pink-500">techcrunch.com</a></strong>`} data-html={true} data-event='click focus'>
                            <CheckIcon />
                        </span>.
                        {t(`veveIntro.metrics.description1`)}
                    </p>

                    <small className="block mt-5 mb-2 sm:mb-5 text-gray-300">
                        {t(`veveIntro.metrics.description2`)} {moment(vevemetrics && vevemetrics.revenue.last_updated).format('MMMM Do YYYY, h:mm:ss a')} (<a href={"https://cutt.ly/wbT97hb"} target={"_blank"} className={`text-pink-500`}>https://cutt.ly/wbT97hb</a>)
                    </small>

                    <ul className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6`}>
                        <li><PriceCard value={vevemetrics && vevemetrics.revenue.currentStoreRevenue.toLocaleString()} label={t(`veveIntro.metrics.totalSales`)} suffix={"$"} classes={`text-green-500`} /></li>
                        <li><PriceCard value={vevemetrics && vevemetrics.revenue.twenty_four_hour_change.toFixed(3)} label={`24 ${t(`veveIntro.metrics.hourChange`)}`} prefix={"%"} /></li>
                        <li><PriceCard value={vevemetrics && vevemetrics.revenue.seven_day_change.toFixed(3)} label={`7 ${t(`veveIntro.metrics.dayChange`)}`} prefix={"%"} /></li>
                        <li><PriceCard value={vevemetrics && vevemetrics.revenue.thirty_day_change.toFixed(3)} label={`30 ${t(`veveIntro.metrics.dayChange`)}`} prefix={"%"} /></li>
                        <li><PriceCard value={vevemetrics && vevemetrics.nfts.currentNFTSales.toLocaleString()} label={t(`veveIntro.metrics.noNFT`)} classes={`text-green-500`} /></li>
                        <li><PriceCard value={vevemetrics && vevemetrics.nfts.thirty_day_change_nft.toFixed(3)} label={`30 ${t(`veveIntro.metrics.dayChange`)}`} prefix={"%"} /></li>
                    </ul>

                    <div className="grid grid-cols-1 mt-10">
                        <div className="p-5 shadow rounded-3xl bg-gray-900">
                            <div className="text-center text-gray-300">{t(`veveIntro.metrics.revenue`)}</div>
                            <CollectiblesRevenueBar id={`collectibles-revenue-bar`} />
                        </div>
                    </div>

                </div>
            </section>
        )
    }

    const VeveRarityExplained = () => {

        const demoCard = () => {

            const [rarity, setRarity] = useState("ULTRA_RARE")

            return(
                <article className={`max-w-md`} >
                    <div className={`collectible__card rounded-lg block relative`}>
                        <span className={`absolute -left-10 -right-10 z-20 bottom-24 max-w-none`}>
                            <Image
                                src="/assets/images/ecto-1.png"
                                alt="Picture of the author"
                                width={590}
                                height={379}
                            />
                        </span>
                        <span className="block rounded-3xl overflow-hidden">
                            <figure className={`relative z-10`}>
                                {soldOut(0)}
                                <span className={`veve-bg-gradient w-100 block relative`} style={{ height: "350px" }}>
                                    {/*<img src={`https://d11unjture0ske.cloudfront.net/collectible_type_image.c6c4987d-df55-48bf-b727-655b73668c06.eafd37d1-295e-4079-ab98-2f9743818eb0.full.jpeg`} alt={`Spider-man`} width={"auto"} className={`rounded-3xl`} />*/}
                                </span>
                            </figure>
                        </span>
                        <figcaption className={`relative -z-1`}>
                            <div className="flex items-center -mt-4 pt-5 pb-2 px-6 bg-gray-900 overflow-hidden rounded-b-3xl relative z-1">
                                <div className="flex-auto">
                                    <h6 className={`block font-semibold py-2 text-sm xl:text-lg text-gray-200`}>
                                        Ghostbusters 1:1 Ecto-1 ({t(`veveIntro.rarity.interactive`)})
                                    </h6>
                                </div>
                                <div className="flex-auto">
                                    <ArrowRight size={"30px"} classes={`text-white float-right`} />
                                </div>
                            </div>
                            <div className="flex items-center bg-white -mt-6 pt-7 px-6 pb-2 rounded-b-3xl">
                                <div className={`flex-auto`}>
                                    <Badge classes={`inline-block px-2 py-1 text-sm rounded mr-2 ${getRarityThresholds(rarity)}`}>{rarity}</Badge>
                                    <Badge classes={`inline-block px-2 py-1 text-sm rounded ${getEditionTypeThresholds("FA")}`}>
                                        FA
                                    </Badge>
                                </div>
                                <div className={`flex-auto text-right text-lg font-semibold text-gray-500`}>
                                    <svg className={`gem-svg`} version="1.1"  x="0px" y="0px" width="40px"
                                         height="40px"
                                         viewBox="0 0 102.5 132.2" >
                                        <g id="sapphire">
                                            <polygon className="st1" points="82,47.2 102.5,36.3 102.5,34.5 100.7,33.5 79.8,44.6 82,45.8 	"/>
                                            <polygon className="st2" points="59,33.5 37.5,45.8 37.5,72.5 59,85 82,72.5 82,45.8 	"/>
                                            <polygon id="shine" className="st3" points="31.3,76.7 83.7,42.7 87.2,50.9 34.2,85.5 	"/>
                                            <polygon className="st4" points="16,34.5 59,10.3 59,33.5 37.5,45.8 	"/>
                                            <polygon className="st5" points="16,34.5 16,85 37.5,72.5 37.5,45.8 	"/>
                                            <polygon className="st5" points="16,85 59,110 59,85 37.5,72.5 	"/>
                                            <polygon className="st4" points="59,85 59,110 102.5,85 82,72.5 	"/>
                                            <polygon className="st1" points="82,72.5 82,45.8 102.5,34.5 102.5,85 	"/>
                                            <polygon className="st1" points="82,45.8 59,33.5 59,10.3 102.5,34.5 	"/>
                                            <polygon className="st5" points="16,84.3 37.5,71.8 37.5,72.5 38.7,73.2 16.5,85.3 16,85 	"/>
                                            <polygon className="st5" points="58.3,109.6 59,110 59.4,109.8 59.4,84.8 59,85 58.3,84.6 	"/>
                                            <polygon className="st5" points="37.5,46.2 37.5,45.8 38,45.5 16.5,34.2 16,34.5 16,34.9 	"/>
                                        </g>
                                    </svg>
                                    120.00
                                </div>
                            </div>
                        </figcaption>
                    </div>
                </article>
            )
        }
        return(
            <section className={`pt-4 pb-4 text-white mb-10 overflow-hidden mt-10 px-10`}>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div>{demoCard()}</div>
                        <div className="col-span-2">
                            <h1 className={`text-3xl mb-3`}>{t(`veveIntro.rarity.title`)}</h1>
                            <p className={`mb-8 text-xl leading-relaxed`}>
                                {t(`veveIntro.rarity.description`)}
                            </p>

                            <p className={`mb-8 text-xl leading-relaxed`}>{t(`veveIntro.rarity.description1`)}</p>

                            <ul className={`grid grid-cols-2 lg:grid-cols-4 gap-4`}>
                                <li className={`bg-gray-900 max-w-xs mb-8 py-3 px-5 rounded-3xl shadow-inner shadow-lg`}>
                                    <span className="uppercase text-sm text-gray-300 block tracking-wide">{t(`veveIntro.rarity.triangles`)}</span>
                                    <span className={`text-2xl font-semibold `}>142,828</span>
                                </li>

                                <li className={`bg-gray-900 max-w-xs mb-8 py-3 px-5 rounded-3xl shadow-inner shadow-lg`}>
                                    <span className="uppercase text-sm text-gray-300 block tracking-wide">{t(`veveIntro.rarity.verticies`)}</span>
                                    <span className={`text-2xl font-semibold `}>128,473</span>
                                </li>

                                <li className={`bg-gray-900 max-w-xs mb-8 py-3 px-5 rounded-3xl shadow-inner shadow-lg`}>
                                    <span className="uppercase text-sm text-gray-300 block tracking-wide">{t(`veveIntro.rarity.materials`)}</span>
                                    <span className={`text-2xl font-semibold `}>29</span>
                                </li>
                            </ul>

                            <small className={`uppercase text-sm text-gray-300 block tracking-wide`}>
                                {t(`veveIntro.rarity.ghostbuster`)}<br/>{t(`veveIntro.rarity.soldOut`)}
                                <span className={`cursor-pointer`} data-tip={`${t(`veveIntro.rarity.verified`)} <a href="https://youtu.be/otMND7Pg3-Y?t=1765" target="_blank" class="text-pink-500">YouTube Live</a>`} data-html={true} data-event='click focus'>
                                <CheckIcon />
                            </span>
                            </small>

                        </div>
                    </div>
                </div>
            </section>
        )
    }

    const VeveReviews = () => {

        const [reviews, setReviews] = useState([])

        useEffect(() => {
            setReviews([
                { date: '12 Aug 2021', cite: 'John Robert Yelland', review: 'Already doubled my money with this app. Plus the veve do look at social media outlets and react very quickly to app issues. They are very efficient, and work very hard to make the app a bigger success than what it already is. Great NFT\'s, and prices reflect that. '},
                { date:'10 Aug 2021', cite: 'Masumi Johnson', review: 'Solid app overall and cool concept. The digital asset trend is here to stay, it\'s just a matter of what specific collectibles people become interested in. Veve makes the most premium ones out'},
                { date:'25 July 2021', cite: 'Macario Ramirez', review: 'This is an awesome app, very easy to use and straight forward. You can buy original limited edition art pieces from popular artists and collectables from major companies like Marvel, DC Comics, Cartoon Network and Universal to name a few. You can view your collection in a 3D setting or display them'},
                { date: '19 June 2021', cite: 'Marcus Peachey', review: 'Thought i\'d wait a couple months before commenting. High quality collectibles, platform is easy to use and understand. They look great in augmented reality and in the virtual showroom. Secondary market works well if you don\'t manage to snag a drop off the primary market too! Can\'t wait to see Star T'},
                { date:'15 July 2021', cite: 'Bryan Farley', review: 'Been on the app since 3/2021. App was in beta when joined. Although their were expected hiccups with Beta testing it\'s kinda amazing how well everything is working now. I had an issue this week not being able to pay for an auction, submitted a support ticket and the team had it resolved within an ho'},
                { date: '4 Aug 2021', cite: 'Connor Christison', review: 'By far the beat NFT platform , the team are fantastic and interact every day with the community, Hugh detailed 3D modles for AR . Great for the family and hard core collectors!'},
                { date:'9 July 2021', cite: 'Jordan Robinson', review: 'As an avid collector veve really did a good job with this app. They listen to the community and take action fast. Highly recommend anyone who likes collecting to try this app out you won\'t regret it. There\'s something for everyone and much much more to come.'},
                { date:'23 June 2021', cite: 'Gary Lightfoot', review: 'Im addicted to veve. I love all the collectibles they release. The app is very user friendly and super easy to navigate. It has literally took over my life 🚀🚀🚀🚀'},
            ])
        },[])

        const settings = {
            className: "center",
            arrows: false,
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 5.5,
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 1600,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        };

        return(
            <section className={`trustpilot__section py-20 `}>
                <h4 className="text-2xl mb-3 text-white text-center">Trusted.</h4>
                <div className="text-center segoe mb-10 text-gray-300">
                    <svg className={`mx-auto tp-stars tp-stars--5 mb-3`} viewBox="0 0 251 46" xmlns="http://www.w3.org/2000/svg" width={`120`}>
                        <g className="tp-star">
                            <path className="tp-star__canvas" fill="#dcdce6"
                                  d="M0 46.330002h46.375586V0H0z"></path>
                            <path className="tp-star__shape"
                                  d="M39.533936 19.711433L13.230239 38.80065l3.838216-11.797827L7.02115 19.711433h12.418975l3.837417-11.798624 3.837418 11.798624h12.418975zM23.2785 31.510075l7.183595-1.509576 2.862114 8.800152L23.2785 31.510075z"
                                  fill="#FFF"></path>
                        </g>
                        <g className="tp-star">
                            <path className="tp-star__canvas" fill="#dcdce6"
                                  d="M51.24816 46.330002h46.375587V0H51.248161z"></path>
                            <path className="tp-star__canvas--half" fill="#dcdce6"
                                  d="M51.24816 46.330002h23.187793V0H51.248161z"></path>
                            <path className="tp-star__shape"
                                  d="M74.990978 31.32991L81.150908 30 84 39l-9.660206-7.202786L64.30279 39l3.895636-11.840666L58 19.841466h12.605577L74.499595 8l3.895637 11.841466H91L74.990978 31.329909z"
                                  fill="#FFF"></path>
                        </g>
                        <g className="tp-star">
                            <path className="tp-star__canvas" fill="#dcdce6"
                                  d="M102.532209 46.330002h46.375586V0h-46.375586z"></path>
                            <path className="tp-star__canvas--half" fill="#dcdce6"
                                  d="M102.532209 46.330002h23.187793V0h-23.187793z"></path>
                            <path className="tp-star__shape"
                                  d="M142.066994 19.711433L115.763298 38.80065l3.838215-11.797827-10.047304-7.291391h12.418975l3.837418-11.798624 3.837417 11.798624h12.418975zM125.81156 31.510075l7.183595-1.509576 2.862113 8.800152-10.045708-7.290576z"
                                  fill="#FFF"></path>
                        </g>
                        <g className="tp-star">
                            <path className="tp-star__canvas" fill="#dcdce6"
                                  d="M153.815458 46.330002h46.375586V0h-46.375586z"></path>
                            <path className="tp-star__canvas--half" fill="#dcdce6"
                                  d="M153.815458 46.330002h23.187793V0h-23.187793z"></path>
                            <path className="tp-star__shape"
                                  d="M193.348355 19.711433L167.045457 38.80065l3.837417-11.797827-10.047303-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418974zM177.09292 31.510075l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z"
                                  fill="#FFF"></path>
                        </g>
                        <g className="">
                            <path className="tp-star__canvas" fill="#8f8f8f"
                                  d="M205.064416 46.330002h46.375587V0h-46.375587z"></path>
                            <path className="tp-star__canvas--half" fill="#00b67a"
                                  d="M205.064416 46.330002h23.187793V0h-23.187793z"></path>
                            <path className="tp-star__shape"
                                  d="M244.597022 19.711433l-26.3029 19.089218 3.837419-11.797827-10.047304-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418975zm-16.255436 11.798642l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z"
                                  fill="#FFF"></path>
                        </g>
                    </svg>
                    We're rated <strong>"Excellent"</strong> (<strong>4.3</strong> / 5) based on <a href="https://play.google.com/store/apps/details?id=com.ecomi.veve&hl=en_GB&gl=US&reviewId=gp%3AAOqpTOHDQ-Lo5qtpo0TEySbo1hVn8xzz2eaVStKhSE9TuGwg2xkAlFFjl9wiwgZePXja7RMX6A0skwssWWRhrxU&showAllReviews=true" className={`font-bold border-b border-gray-500`}>6,018+ reviews.</a> Showing our favourite reviews.
                </div>

                <Slider {...settings}>
                    {reviews && reviews.map((review, index) => (
                        <div className="p-5">
                            <div className={`trustpilot-card block relative shadow bg-gray-900 text-gray-300 p-5 max-w-sm rounded-3xl shadow-inner shadow-lg`} key={index}>
                                <div className="block tp-stars tp-stars--5 mb-3">
                                    <svg viewBox="0 0 251 46" xmlns="http://www.w3.org/2000/svg" width={`100`}>
                                        <g className="tp-star">
                                            <path className="tp-star__canvas" fill="#dcdce6"
                                                  d="M0 46.330002h46.375586V0H0z"></path>
                                            <path className="tp-star__shape"
                                                  d="M39.533936 19.711433L13.230239 38.80065l3.838216-11.797827L7.02115 19.711433h12.418975l3.837417-11.798624 3.837418 11.798624h12.418975zM23.2785 31.510075l7.183595-1.509576 2.862114 8.800152L23.2785 31.510075z"
                                                  fill="#FFF"></path>
                                        </g>
                                        <g className="tp-star">
                                            <path className="tp-star__canvas" fill="#dcdce6"
                                                  d="M51.24816 46.330002h46.375587V0H51.248161z"></path>
                                            <path className="tp-star__canvas--half" fill="#dcdce6"
                                                  d="M51.24816 46.330002h23.187793V0H51.248161z"></path>
                                            <path className="tp-star__shape"
                                                  d="M74.990978 31.32991L81.150908 30 84 39l-9.660206-7.202786L64.30279 39l3.895636-11.840666L58 19.841466h12.605577L74.499595 8l3.895637 11.841466H91L74.990978 31.329909z"
                                                  fill="#FFF"></path>
                                        </g>
                                        <g className="tp-star">
                                            <path className="tp-star__canvas" fill="#dcdce6"
                                                  d="M102.532209 46.330002h46.375586V0h-46.375586z"></path>
                                            <path className="tp-star__canvas--half" fill="#dcdce6"
                                                  d="M102.532209 46.330002h23.187793V0h-23.187793z"></path>
                                            <path className="tp-star__shape"
                                                  d="M142.066994 19.711433L115.763298 38.80065l3.838215-11.797827-10.047304-7.291391h12.418975l3.837418-11.798624 3.837417 11.798624h12.418975zM125.81156 31.510075l7.183595-1.509576 2.862113 8.800152-10.045708-7.290576z"
                                                  fill="#FFF"></path>
                                        </g>
                                        <g className="tp-star">
                                            <path className="tp-star__canvas" fill="#dcdce6"
                                                  d="M153.815458 46.330002h46.375586V0h-46.375586z"></path>
                                            <path className="tp-star__canvas--half" fill="#dcdce6"
                                                  d="M153.815458 46.330002h23.187793V0h-23.187793z"></path>
                                            <path className="tp-star__shape"
                                                  d="M193.348355 19.711433L167.045457 38.80065l3.837417-11.797827-10.047303-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418974zM177.09292 31.510075l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z"
                                                  fill="#FFF"></path>
                                        </g>
                                        <g className="tp-star">
                                            <path className="tp-star__canvas" fill="#dcdce6"
                                                  d="M205.064416 46.330002h46.375587V0h-46.375587z"></path>
                                            <path className="tp-star__canvas--half" fill="#dcdce6"
                                                  d="M205.064416 46.330002h23.187793V0h-23.187793z"></path>
                                            <path className="tp-star__shape"
                                                  d="M244.597022 19.711433l-26.3029 19.089218 3.837419-11.797827-10.047304-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418975zm-16.255436 11.798642l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z"
                                                  fill="#FFF"></path>
                                        </g>
                                    </svg>
                                    <span className="block absolute right-3.5 top-3.5 text-gray-400">{review.date}</span>
                                </div>
                                <blockquote>
                                    {truncate(`${review.review}`, 150)}
                                    <cite className={`block text-gray-400 mt-2`}>{review.cite}</cite>
                                </blockquote>
                            </div>
                        </div>
                    ))}
                </Slider>
            </section>
        )
    }

    return(
        <>
            {VeveIntroStripSection()}
            {VevePremiumBrands()}
            {VeveEmulatorSection()}
            {VeveRarityExplained()}
            {VeveReviews()}
            {VeveMetricsSection()}
            <LatestMediumArticles mediumUser={`veve-collectibles`} title={t(`veveIntro.meduim`)} />
        </>
    )
}

export default VeveIntro