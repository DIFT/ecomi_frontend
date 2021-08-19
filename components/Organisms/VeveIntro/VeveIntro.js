import { useEffect, useState, useRef } from 'react'
import Link from "next/link"
import moment from "moment"
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


// Icons
const CheckIcon = dynamic(() => import('../../../components/Misc/LordIcon').then((mod) => mod.CheckIcon), {
    ssr: false
});

const LatestDrops = dynamic(
    () => import("../../Organisms/LatestDrops/LatestDrops"),
    { ssr: false }
)

const VeveIntro = () => {

    const VeveIntroStripSection = () => {
        return(
            <section className={`veve-intro px-10 pt-4 pb-4 sm:pt-5 md:pt-6 xl:pt-8 sm:pb-5 bg-gray-900  text-white shadow-inner shadow-lg overflow-hidden relative`}>
                <div className="container">
                    <div className="grid grid-cols-2 gap-3 py-20">
                        <div>
                            <small className={`block uppercase text-xs mb-5 font-medium text-gray-400`}>The ECOMI team presents...</small>
                            <h1 className="text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-gray-900 mb-8 sm:mb-10">
                                <img src={`./assets/images/veve-logo--white.png`} width={`300`} alt={`VEVE`} />
                            </h1>
                            <h2 className={`text-6xl leading-none font-semibold tracking-tight mb-8 sm:mb-10`}>Premium, officially licensed, digital collectibles (NFTs)</h2>
                            <p className={`font-base text-xl leading-relaxed mb-5`}>
                                VEVE is an app-based marketplace available on iOS and Android for premium <strong>licensed</strong> digital collectibles (Non-Fungible Tokens/NFTs).
                            </p>

                            <ul className={`my-10`}>
                                <li className={`inline-block mr-3`}><a href="#" target={"_blank"} className={`border border-white text-white font-base py-2 px-4 rounded-full font-semibold text-sm`}>Google play</a></li>
                                <li className={`inline-block`}><a href="#" target={"_blank"} className={`border border-white text-white font-base py-2 px-4 rounded-full font-semibold text-sm`}>App store</a></li>
                            </ul>

                            <p className={`font-base text-xl leading-relaxed mb-5 text-gray-300`}>
                                The app was officially launched in BETA on October 2020 and regularly drops new collectibles every Thursday at 4pm GMT
                            </p>

                            <strong className={`text-pink-500`}>Drops frequently sell out within minutes generating millions of revenue.</strong>
                            <span className={`cursor-pointer`} data-tip={`Verified by various sources: <a href="https://youtu.be/LkRZtFeh88A?t=3438" target="_blank" class="text-pink-500">YouTube Live</a>`} data-html={true} data-event='click focus'>
                                <CheckIcon />
                            </span>
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

    const VeveEmulatorSection = () => {

        const [tab, setTab] = useState(1)

        const toggleTab = (tab) => {
            setTab(tab)
        }

        const storeBlock = () => {
            return(
                <div className={`${tab === 1 ? 'block' : 'hidden'}`}>
                    <h2 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-5`}>Store front</h2>
                    <small className={`uppercase text-sm text-gray-300 block tracking-wide block mb-8 `}>Grow your collection</small>

                    <p className={`font-semibold text-2xl leading-relaxed mb-10`}>
                        Users can browse collectibles from their favorite brands in premium digital format and grow their collections.
                    </p>
                    <p className={`font-base text-xl leading-relaxed`}>
                        Upon opening the VEVE app users are immediately presented with featured premium brands and collectibles, upcoming drops and powerful filtering methods. Users can easily navigate and browse digital collectibles offered, including those which are no longer available through the primary VEVE store front.
                    </p>
                </div>
            )
        }

        const collectionBlock = () => {
            return(
                <div className={`${tab === 2 ? 'block' : 'hidden'}`}>
                    <div className={`flex-1`}>
                        <h2 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-5`}>Collection</h2>
                        <small className={`uppercase text-sm text-gray-300 block tracking-wide block mb-8 `}>Interactive NFTs</small>

                        <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11`}>
                            Users can put their collection on display in their own virtual 3D showrooms. Customize, decorate, create and share.
                        </p>
                        <p className={`leading-relaxed mb-8 text-lg`}>
                            One of the key USPs of VEVE is the rich functionality offered within the application. Users can interact with their collectibles, arrange, scale and pose within a VR showroom or using augmented reality. Users can then create sharable content to show their collection off to the world.
                        </p>
                    </div>
                </div>
            )
        }

        const feedBlock = () => {
            return(
                <div className={`${tab === 3 ? 'block' : 'hidden'}`}>
                    <div className={`flex-1`}>
                        <h2 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-5`}>Feed</h2>
                        <small className={`uppercase text-sm text-gray-300 block tracking-wide block mb-8 `}>Show 'n' tell</small>

                        <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11`}>
                            The VEVE feed is at the heart of the VEVE community. Users can utilise the feed to share content, raise discussion, like, comment and subscribe to others users.
                        </p>
                        <p className={`leading-relaxed mb-8 text-lg`}>
                            Community will play a massive part in the success of the VEVE application. VEVE is fortunate enough to have one of, if not the most, enthusiastic of communities in the market both on and off the application - this website is testament to that statement. The importance of community cannot be stressed enough and VEVE is forefronting this within their application.
                        </p>
                    </div>
                </div>
            )
        }

        const marketBlock = () => {
            return(
                <div className={`${tab === 4 ? 'block' : 'hidden'}`}>
                    <div className={`flex-1`}>
                        <h2 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-5`}>Market</h2>
                        <small className={`uppercase text-sm text-gray-300 block tracking-wide block mb-8 `}>Buy, sell and trade</small>

                        <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11`}>
                            The market is the 'ebay' of digital collectibles and allows users to buy, sell and swap with each other.
                        </p>
                        <p className={`leading-relaxed mb-8 text-lg`}>
                            Users can accumulate desired NFTs through the peer 2 peer marketplace. The marketplace allows users to complete their collections or pick up collectibles that they otherwise might have missed out on.
                        </p>
                        <p className={`leading-relaxed mb-8 text-lg`}>
                            Additionally, the VEVE marketplace has already proven to generate active users an exponential gain on their original purchases. For example we recently saw the <a href={`https://twitter.com/vevecollect/status/1386265208427974657`} className={`text-pink-500`}  target={"_blank"}>'Donny' NFT from the Powerpuff Girls sell for $27,000</a>. Donny was originally priced at just $15.99 on the <a href={"https://medium.com/veve-collectibles/powerpuff-girls-series-2-f61c8d4f30e5"} className={`text-pink-500`} target={"_blank"}>VEVE drop day</a>.
                        </p>
                        <p className={`leading-relaxed mb-8 text-lg`}>
                            As the application continues to grow we expect collectibles to be more scarce in ratio to the user base, thus increasing their value more and more as time goes on. One could easily make the argument that purchasing the NFTs themselves is another solid investment choice for a quick turn around.
                        </p>
                    </div>
                </div>
            )
        }

        const accountBlock = () => {
            return(
                <div className={`${tab === 5 ? 'block' : 'hidden'}`}>
                    <div className={`flex-1`}>
                        <h2 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-5`}>Account</h2>
                        <small className={`uppercase text-sm text-gray-300 block tracking-wide block mb-8 `}>Management</small>

                        <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11`}>
                            Manage your entire collection from your phone. Browse your collectibles, complete sets, and much more.
                        </p>
                        <p className={`leading-relaxed mb-8 text-lg`}>
                            One of the key USPs of VEVE is the rich functionality offered within the application. Users can interact with their collectibles, arrange, scale and pose within a VR showroom or using augmented reality. Users can then create sharable content to show their collection off to the world.
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
                        Using the VEVE app collectible enthusiasts and hobbyists can purchase a multitude of collectibles from their favourite brands.
                        Each collectible is minted within a limited number of availability and is assigned a type of rarity typically associated with
                        collectibles.
                    </p>
                </div>
            </section>

                <section className={`px-10 pt-4 pb-4 text-white mb-10 overflow-hidden mt-10`}>
                    <div className={`max-w-screen-lg xl:max-w-screen-xl mx-auto`}>
                        <div className="flex items-center ">
                            <div className={`mr-10 lg:mr-36 hidden md:block`}>
                                <PhoneApplication screen={`store`} setTab={setTab}  />
                            </div>
                            <div className={`flex-1 text-white`}>
                                {storeBlock()}
                                {collectionBlock()}
                                {feedBlock()}
                                {marketBlock()}
                                {accountBlock()}
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
                })
                .catch((e) => console.log('Error getting veve metrics: ', e))

        },[])

        return(
            <section className={`px-10 pt-4 pb-4 sm:pt-5 md:pt-6 xl:pt-8 sm:pb-5 text-white mt-10`}>
                <div className="container">

                    <small className="block mt-5 mb-2 sm:mb-5 text-gray-300">
                        VEVE metrics as of {moment(vevemetrics && vevemetrics.revenue.last_updated).format('MMMM Do YYYY, h:mm:ss a')} (<a href={"https://cutt.ly/wbT97hb"} target={"_blank"} className={`text-pink-500`}>https://cutt.ly/wbT97hb</a>)
                    </small>

                    <ul className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6`}>
                        <li><PriceCard value={vevemetrics && vevemetrics.revenue.currentStoreRevenue.toLocaleString()} label={`Total sales`} suffix={"$"} classes={`text-green-500`} /></li>
                        <li><PriceCard value={vevemetrics && vevemetrics.revenue.twenty_four_hour_change.toFixed(3)} label={`24 hour change`} prefix={"%"} /></li>
                        <li><PriceCard value={vevemetrics && vevemetrics.revenue.seven_day_change.toFixed(3)} label={`7 day change`} prefix={"%"} /></li>
                        <li><PriceCard value={vevemetrics && vevemetrics.revenue.thirty_day_change.toFixed(3)} label={`30 day change`} prefix={"%"} /></li>
                        <li><PriceCard value={vevemetrics && vevemetrics.nfts.currentNFTSales.toLocaleString()} label={`No. NFT sales`} classes={`text-green-500`} /></li>
                        <li><PriceCard value={vevemetrics && vevemetrics.nfts.thirty_day_change_nft.toFixed(3)} label={`30 day change`} prefix={"%"} /></li>
                    </ul>

                </div>
            </section>
        )
    }

    const VeveMarketSection = () => {
        return(
            <section className={`px-10 pt-4 pb-4 sm:pt-5 md:pt-6 xl:pt-8 sm:pb-5 text-white mt-10`}>
                <div className="container">

                    <h4 className={`text-2xl mb-3`}>$370 Billion dollar market</h4>

                    <p className="mb-8 text-xl leading-relaxed">
                        The collectibles industry is said to be worth approximately $370 billion dollars as of March 2020
                        <span className={`cursor-pointer`} data-tip={`Source: <strong className="font-bold z-10"><a href="https://techcrunch.com/2020/03/25/the-future-of-collectibles-is-digital/?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAAIu8AJeYB16zZo4BOLLKZdJd3lfzCHdUFBUQZoJm-zvnHvWGSrALKXtClg4P7wG9QPXodNAO7aQRwXJBnyaWF7kN0oPeaOgGOrTMy4numrPdywZXhsOAhZvfn4KUSbuGI5R4cK_nBO_cJFzyfXYrUEoMfcVWwDYEj0b4NsdaXuq1" target="_blank" class="text-pink-500">techcrunch.com</a></strong>`} data-html={true} data-event='click focus'>
                            <CheckIcon />
                        </span>.
                        VEVE identified a gap in this market for premium digital collectibles backed by blockchain technology, which allows uniqueness,
                        scarcity and accurate provenance of collectibles. The rise of NFT popularity in 2021 is thought to exponentially increase this
                        industry worth over the coming years. VEVE have positioned themselves to be a front runner for the premium digital collectible
                        format due to their early foresight in 2017.
                    </p>

                </div>
            </section>
        )
    }

    const VevePremiumBrandsSection = () => {

        const CANVAS_WIDTH = 3000;
        // The amplitude. The amount the noise affects the movement.
        const NOISE_AMOUNT = 5;
        // The frequency. Smaller for flat slopes, higher for jagged spikes.
        const NOISE_SPEED = 0.004;
        // Pixels to move per frame. At 60fps, this would be 18px a sec.
        const SCROLL_SPEED = 0.3;

        const bubbles = [
            {
                s: 0.6,
                x: 1134,
                y: 45,
            },
            {
                s: 0.6,
                x: 1620,
                y: 271,
            },
            {
                s: 0.6,
                x: 1761,
                y: 372,
            },
            {
                s: 0.6,
                x: 2499,
                y: 79,
            },
            {
                s: 0.8,
                x: 2704,
                y: 334,
            },
            {
                s: 0.6,
                x: 2271,
                y: 356,
            },
            {
                s: 0.6,
                x: 795,
                y: 226,
            },
            {
                s: 0.6,
                x: 276,
                y: 256,
            },
            {
                s: 0.6,
                x: 1210,
                y: 365,
            },
            {
                s: 0.6,
                x: 444,
                y: 193,
            },
            {
                s: 0.6,
                x: 2545,
                y: 387,
            },
            {
                s: 0.8,
                x: 1303,
                y: 193,
            },
            {
                s: 0.8,
                x: 907,
                y: 88,
            },
            {
                s: 0.8,
                x: 633,
                y: 320,
            },
            {
                s: 0.8,
                x: 323,
                y: 60,
            },
            {
                s: 0.8,
                x: 129,
                y: 357,
            },
            {
                s: 0.8,
                x: 1440,
                y: 342,
            },
            {
                s: 0.8,
                x: 1929,
                y: 293,
            },
            {
                s: 0.8,
                x: 2135,
                y: 198,
            },
            {
                s: 0.8,
                x: 2276,
                y: 82,
            },
            {
                s: 0.8,
                x: 2654,
                y: 182,
            },
            {
                s: 0.8,
                x: 2783,
                y: 60,
            },
            {
                s: 1.0,
                x: 1519,
                y: 118,
            },
            {
                s: 1.0,
                x: 1071,
                y: 233,
            },
            {
                s: 1.0,
                x: 1773,
                y: 148,
            },
            {
                s: 1.0,
                x: 2098,
                y: 385,
            },
            {
                s: 1.0,
                x: 2423,
                y: 244,
            },
            {
                s: 1.0,
                x: 901,
                y: 385,
            },
            {
                s: 1.0,
                x: 624,
                y: 111,
            },
            {
                s: 1.0,
                x: 75,
                y: 103,
            },
            {
                s: 1.0,
                x: 413,
                y: 367,
            },
            {
                s: 1.0,
                x: 2895,
                y: 271,
            },
            {
                s: 1.0,
                x: 1990,
                y: 75,
            },
        ];

        const noise = new Noise();

        const animationRef = useRef();
        const bubblesRef = useRef(
            bubbles.map((bubble) => ({
                ...bubble,
                noiseSeedX: Math.floor(Math.random() * 64000),
                noiseSeedY: Math.floor(Math.random() * 64000),
                xWithNoise: bubble.x,
                yWithNoise: bubble.y,
            })),
        );

        const [isReady, setReady] = useState(false);

        useEffect(() => {
            setTimeout(() => {
                setReady(true);
            }, 200);

            animationRef.current = requestAnimationFrame(animate);

            return () => {
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
            };
        }, []);

        function animate() {
            bubblesRef.current = bubblesRef.current.map((bubble, index) => {
                const newNoiseSeedX = bubble.noiseSeedX + NOISE_SPEED;
                const newNoiseSeedY = bubble.noiseSeedY + NOISE_SPEED;

                const randomX = noise.simplex2(newNoiseSeedX, 0);
                const randomY = noise.simplex2(newNoiseSeedY, 0);

                const newX = bubble.x - SCROLL_SPEED;

                const newXWithNoise = newX + randomX * NOISE_AMOUNT;
                const newYWithNoise = bubble.y + randomY * NOISE_AMOUNT;

                const element = document.getElementById(`bubble-${index}`);

                if (element) {
                    element.style.transform = `translate(${newXWithNoise}px, ${newYWithNoise}px) scale(${bubble.s})`;
                }

                return {
                    ...bubble,
                    noiseSeedX: newNoiseSeedX,
                    noiseSeedY: newNoiseSeedY,
                    x: newX < -200 ? CANVAS_WIDTH : newX,
                    xWithNoise: newXWithNoise,
                    yWithNoise: newYWithNoise,
                };
            });

            animationRef.current = requestAnimationFrame(animate);
        }

        const backgroundPositions = [];

        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
                backgroundPositions.push(`${-154 * j}px ${-154 * i}px`);
            }
        }

        return(
            <section className={`pt-4 pb-4 text-white text-center mb-10 overflow-hidden mt-10`}>
                <h4 className="text-2xl mb-3">
                    Premium brands and licenses
                    <span className={`cursor-pointer inline-block`} data-tip={`Announced Feb 20th 2020 <a href="https://medium.com/ecomi/huge-international-licenses-announced-for-ve-ve-d84f747c96ce" target="_blank" class="text-pink-500">https://medium.com/ecomi/huge-international-licenses-announced-for-ve-ve-d84f747c96ce</a>`} data-html={true} data-event='click focus'>
                        <CheckIcon />
                    </span>
                </h4>
                <small className="block text-base text-gray-300">
                    VEVE is trusted and recognised by some of the biggest and most popular brands in the world
                </small>

                <div className="bubbles-wrapper">
                    <div className="bubbles">
                        {bubbles.map((bubble, index) => (
                            <div
                                className="bubble"
                                id={`bubble-${index}`}
                                key={`${bubble.x} ${bubble.y}`}
                                style={{
                                    backgroundPosition: backgroundPositions[index],
                                    opacity: isReady ? 1 : 0,
                                    transform: `translate(${bubble.x}px, ${bubble.y}px) scale(${bubble.s})`,
                                }}
                            />
                        ))}
                    </div>
                </div>

                <Link href={`/brands`}><a className="text-sm border border-white text-white font-base py-2 px-4 rounded-full font-semibold">Browse</a></Link>

            </section>
        )
    }

    const VeveRarityExplained = () => {

        const cardExample = {
            "brand": {
                "name": "Marvel Mightys",
                "id": "c92feb01-ef87-4dcd-bb55-80d18cff7fa6",
                "slug": "marvel-mightys"
            },
            "image": {
                "url": "https://d11unjture0ske.cloudfront.net/collectible_type_image.c6c4987d-df55-48bf-b727-655b73668c06.eafd37d1-295e-4079-ab98-2f9743818eb0.full.jpeg",
                "direction": "PORTRAIT",
                "thumbnailUrl": "https://d11unjture0ske.cloudfront.net/collectible_type_image.c6c4987d-df55-48bf-b727-655b73668c06.eafd37d1-295e-4079-ab98-2f9743818eb0.thumbnail.jpeg",
                "lowResolutionUrl": "https://d11unjture0ske.cloudfront.net/collectible_type_image.c6c4987d-df55-48bf-b727-655b73668c06.eafd37d1-295e-4079-ab98-2f9743818eb0.low.jpeg",
                "fullResolutionUrl": "https://d11unjture0ske.cloudfront.net/collectible_type_image.c6c4987d-df55-48bf-b727-655b73668c06.eafd37d1-295e-4079-ab98-2f9743818eb0.full.jpeg",
                "highResolutionUrl": "https://d11unjture0ske.cloudfront.net/collectible_type_image.c6c4987d-df55-48bf-b727-655b73668c06.eafd37d1-295e-4079-ab98-2f9743818eb0.high.jpeg"
            },
            "_id": "c6c4987d-df55-48bf-b727-655b73668c06",
            "createdAt": "2021-08-14T16:21:18.091Z",
            "editionType": "FA",
            "name": "Red Skull",
            "rarity": "ULTRA_RARE",
            "slug": "red-skull",
            "storePrice": 13,
            "totalAvailable": 1,
        }

        const demoCard = () => {

            const [rarity, setRarity] = useState("ULTRA_RARE")

            return(
                <article className={`max-w-md`} >
                    <div className={`collectible__card rounded-lg block relative`}>
                        <img src={`/assets/images/ecto-1.png`} className={`absolute -left-10 z-20 bottom-24 max-w-none`} width={"550px"}/>
                        <span className="block rounded-3xl overflow-hidden">
                            <figure className={`relative z-10`}>
                                <span className={`veve-bg-gradient w-100 block relative`} style={{ height: "350px" }}>
                                    {/*<img src={`https://d11unjture0ske.cloudfront.net/collectible_type_image.c6c4987d-df55-48bf-b727-655b73668c06.eafd37d1-295e-4079-ab98-2f9743818eb0.full.jpeg`} alt={`Spider-man`} width={"auto"} className={`rounded-3xl`} />*/}
                                </span>
                            </figure>
                        </span>
                        <figcaption className={`relative -z-1`}>
                            <div className="flex items-center -mt-4 pt-5 pb-2 px-6 bg-gray-900 overflow-hidden rounded-b-3xl relative z-1">
                                <div className="flex-auto">
                                    <h6 className={`block font-semibold py-2 text-xl text-white`}>Ghostbusters 1:1 Ecto-1 (Interactive)</h6>
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
            <section className={`pt-4 pb-4 text-white mb-10 overflow-hidden mt-10`}>
                <div className="container">
                    <h1 className={`text-3xl mb-3`}>How does it work?</h1>
                    {demoCard()}
                </div>
            </section>
        )
    }

    return(
        <>
            {VeveIntroStripSection()}
            {VeveRarityExplained()}
            {VeveMetricsSection()}
            {VeveEmulatorSection()}
            {VeveMarketSection()}
            <LatestMediumArticles mediumUser={`veve-collectibles`} title={`Latest VEVE Medium articles`} />
            {VevePremiumBrandsSection()}
        </>
    )
}

export default VeveIntro