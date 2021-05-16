import { useState, useEffect } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { gsap } from 'gsap'
import ListBrandsScreen from "./screens/ListBrands";
import BrandScreen from "./screens/BrandScreen";

const PhoneApplication = ({screen, setTab}) => {

    const [deviceScreen, setDeviceScreen] = useState('store');
    const [slug, setSlug] = useState('');

    useEffect(() => {
        setDeviceScreen(screen)
    }, [])

    useEffect(() => {
        gsap.fromTo('.device__content', {opacity: 0}, {opacity: 1, duration: 1})
    },[deviceScreen])

    const phoneHeader = () => {
        return(
            <header className={`device__header`}>
                <div className="grid grid-cols-2">
                    <div>
                        <img src="./assets/images/veve-logo--white.png" className="device__header-logo" alt="VEVE" />
                    </div>
                    <div className={`text-right`}>
                        <button className="device__header-button inline-block">
                            <span className="bag-counter">5</span>
                            <img src={`./assets/images/veve/icons/bag.png`} className={`device__header-img bag`} />
                        </button>
                        <button className="device__header-button inline-block">
                            <img src={`./assets/images/veve/icons/search.png`} className={`device__header-img search`} />
                        </button>
                    </div>
                </div>
            </header>
        )
    }

    const handleScreenChange = (e, screen, tab) => {
        e.preventDefault()
        setDeviceScreen(screen)
        setTab(tab)
    }

    const getClickData = (slug, screen) => {
        setDeviceScreen(screen)
        setSlug(slug)
    }

    const phoneFooter = () => {
        return(
            <footer className={`device__footer`}>
                <div className="grid grid-cols-5 place-content-center text-center">
                    <div className={`text-xs text-gray-400`}>
                        <button className={`device__footer-button block ${deviceScreen === 'store' ? 'active' : null}`} onClick={e => handleScreenChange(e, 'store', 1)}>
                            <img src={`./assets/images/veve/icons/store.png`} className={`device__footer-img`} />
                            <span className={`device__footer-title`}>Store</span>
                        </button>
                    </div>
                    <div className={`text-xs text-gray-400`}>
                        <button className={`device__footer-button block ${deviceScreen === 'collection' ? 'active' : null}`} onClick={e => handleScreenChange(e, 'collection', 2)}>
                            <img src={`./assets/images/veve/icons/showroom.png`} className={`device__footer-img`} />
                            <span className={`device__footer-title`}>Collection</span>
                        </button>
                    </div>
                    <div className={`text-xs text-gray-400`}>
                        <button className={`device__footer-button block ${deviceScreen === 'feed' ? 'active' : null} `} onClick={e => handleScreenChange(e, 'feed', 3)}>
                            <img src={`./assets/images/veve/icons/feed.png`} className={`device__footer-img`} />
                            <span className={`device__footer-title`}>Feed</span>
                        </button>
                    </div>
                    <div className={`text-xs text-gray-400`}>
                        <button className={`device__footer-button block ${deviceScreen === 'market' ? 'active' : null} `} onClick={e => handleScreenChange(e, 'market', 4)}>
                            <img src={`./assets/images/veve/icons/market.png`} className={`device__footer-img`} />
                            <span className={`device__footer-title`} >Market</span>
                        </button>
                    </div>
                    <div className={`text-xs text-gray-400`}>
                        <button className={`device__footer-button block ${deviceScreen === 'profile' ? 'active' : null}`} onClick={e => handleScreenChange(e, 'profile', 5)}>
                            <img src={`./assets/images/veve/icons/account.png`} className={`device__footer-img`} />
                            <span className={`device__footer-title`}>Profile</span>
                        </button>
                    </div>
                </div>
            </footer>
        )
    }

    const storeScreen = () => {
        return(
            <div className={`device__screen--store`}>
                <>
                    <div className={`pt-2 pl-2`}>
                        <ScrollContainer>
                            <div className="grid grid-cols-4 gap-2 w-max mb-2">
                                <button className={`text-center h-36 w-24 rounded-md bg-black items-center justify-center flex`}>Browse</button>
                                <button className={`text-center h-36 w-24 rounded-md bg-black items-center justify-center flex`}>Drops</button>
                                <button className={`text-center h-36 w-24 rounded-md bg-black items-center justify-center flex`} onClick={e => setDeviceScreen('brands')}>Brands</button>
                                <button className={`text-center h-36 w-24 rounded-md bg-black items-center justify-center flex mr-2`}>New</button>
                            </div>
                        </ScrollContainer>

                        <span className={`block text-sm text-gray-400 border-b border-gray-500 relative mt-7 mb-3`}><span className={`absolute -bottom-1 veve-light-grey-bg pr-1`}>Latest drops</span></span>

                        <ScrollContainer>
                            <div className="grid grid-cols-5 gap-2 w-max mb-2">
                                <div className={`text-center h-48 w-80 rounded-md overflow-hidden bg-black items-center justify-center flex`}>
                                    <img src={`./assets/images/veve/tiles/latest/delorean.jpg`} width={`100%`} />
                                </div>
                                <div className={`text-center h-48 w-80 rounded-md overflow-hidden bg-black items-center justify-center flex`}>
                                    <img src={`./assets/images/veve/tiles/latest/ultraman2d.jpg`} width={`100%`} />
                                </div>
                                <div className={`text-center h-48 w-80 rounded-md overflow-hidden bg-black items-center justify-center flex`}>
                                    <img src={`./assets/images/veve/tiles/latest/batman-bw.jpg`} width={`100%`} />
                                </div>
                                <div className={`text-center h-48 w-80 rounded-md overflow-hidden bg-black items-center justify-center flex`}>
                                    <img src={`./assets/images/veve/tiles/latest/ultraman.jpg`} width={`100%`} />
                                </div>
                                <div className={`text-center h-48 w-36 bg-gray-300 rounded-md bg-black items-center justify-center flex mr-2`}>
                                    <div>
                                        <img src={`./assets/images/veve/icons/viewall.png`} width={`40`} className={`block mx-auto mb-3`}/>
                                        <span className="block">View all</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollContainer>

                        <span className={`block text-sm text-gray-400 border-b border-gray-500 relative mt-7 mb-3`}><span className={`absolute -bottom-1 veve-light-grey-bg pr-1`}>Featured</span></span>

                        <ScrollContainer>
                            <div className="grid grid-cols-6 gap-2 w-max mb-2">
                                <div className={`text-center w-36 rounded-md overflow-hidden bg-gray-300  items-center justify-center flex`}>
                                    <div>
                                        <img src={`./assets/images/veve/tiles/featured/jim-lee_joker.jpg`} width={`100%`} className={`h-48 block`} />
                                        <span className="block text-xs py-1 px-2 bg-gray-100 text-black text-left rounded-md">#21 Jim Lee The Joker</span>
                                        <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-left float-left">Common</span>
                                        <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-right float-right">
                                            <img src={`./assets/images/veve/icons/gem.png`} width={`13px`} className={`inline-block mr-1`} />
                                            Sold out
                                        </span>
                                    </div>
                                </div>
                                <div className={`text-center w-36 rounded-md overflow-hidden bg-gray-300  items-center justify-center flex`}>
                                    <div>
                                        <img src={`./assets/images/veve/tiles/featured/becky-cloonan_batman.jpg`} width={`100%`} className={`h-48 block`} />
                                        <span className="block text-xs py-1 px-2 bg-gray-100 text-black text-left rounded-md">#86 Becky Cloonan...</span>
                                        <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-left float-left">Rare</span>
                                        <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-right float-right">
                                            <img src={`./assets/images/veve/icons/gem.png`} width={`13px`} className={`inline-block mr-1`} />
                                            14.99
                                        </span>
                                    </div>
                                </div>
                                <div className={`text-center w-36 rounded-md overflow-hidden bg-gray-300  items-center justify-center flex`}>
                                    <div>
                                        <img src={`./assets/images/veve/tiles/featured/darwyn-cooke_batman.jpg`} width={`100%`} className={`h-48 block`} />
                                        <span className="block text-xs py-1 px-2 bg-gray-100 text-black text-left rounded-md">#42 Darwyn Cooke Ba...</span>
                                        <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-left float-left">Common</span>
                                        <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-right float-right">
                                            <img src={`./assets/images/veve/icons/gem.png`} width={`13px`} className={`inline-block mr-1`} />
                                            14.99
                                        </span>
                                    </div>
                                </div>
                                <div className={`text-center w-36 rounded-md overflow-hidden bg-gray-300  items-center justify-center flex`}>
                                    <div>
                                        <img src={`./assets/images/veve/tiles/featured/todd-mcfarlane_batman.jpg`} width={`100%`} className={`h-48 block`} />
                                        <span className="block text-xs py-1 px-2 bg-gray-100 text-black text-left rounded-md">#100 Todd McFarlane...</span>
                                        <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-left float-left">Common</span>
                                        <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-right float-right">
                                            <img src={`./assets/images/veve/icons/gem.png`} width={`13px`} className={`inline-block mr-1`} />
                                            Sold out
                                        </span>
                                    </div>
                                </div>
                                <div className={`text-center w-36 rounded-md overflow-hidden bg-gray-300  items-center justify-center flex`}>
                                    <div>
                                        <img src={`./assets/images/veve/tiles/featured/eduardo-risso_batman.jpg`} width={`100%`} className={`h-48 block`} />
                                        <span className="block text-xs py-1 px-2 bg-gray-100 text-black text-left rounded-md">#86 Eduardo Risso...</span>
                                        <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-left float-left">Ultra Rare</span>
                                        <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-right float-right">
                                            <img src={`./assets/images/veve/icons/gem.png`} width={`13px`} className={`inline-block mr-1`} />
                                            Sold out
                                        </span>
                                    </div>
                                </div>
                                <div className={`text-center w-36 bg-gray-300 rounded-md bg-black items-center justify-center flex mr-2`}>
                                    <div>
                                        <img src={`./assets/images/veve/icons/viewall.png`} width={`40`} className={`block mx-auto mb-3`}/>
                                        <span className="block">View all</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollContainer>

                        <span className={`block text-sm text-gray-400 border-b border-gray-500 relative mt-7 mb-3`}><span className={`absolute -bottom-1 veve-light-grey-bg pr-1`}>Brands</span></span>

                        <ScrollContainer>
                            <div className="grid grid-cols-5 gap-2 w-max mb-2">
                                <div className={`text-center w-36 rounded-md overflow-hidden bg-gray-300  items-center justify-center flex`}>
                                    <div>
                                        <img src={`./assets/images/veve/tiles/brands/universal.jpg`} width={`100%`} className={`h-40 block`} />
                                    </div>
                                </div>

                                <div className={`text-center w-36 rounded-md overflow-hidden bg-gray-300  items-center justify-center flex`}>
                                    <div>
                                        <img src={`./assets/images/veve/tiles/brands/ghostbusters.jpg`} width={`100%`} className={`h-40 block`} />
                                    </div>
                                </div>

                                <div className={`text-center w-36 rounded-md overflow-hidden bg-gray-300  items-center justify-center flex`}>
                                    <div>
                                        <img src={`./assets/images/veve/tiles/brands/tsuburaya.jpg`} width={`100%`} className={`h-40 block`} />
                                    </div>
                                </div>

                                <div className={`text-center w-36 rounded-md overflow-hidden bg-gray-300  items-center justify-center flex`}>
                                    <div>
                                        <img src={`./assets/images/veve/tiles/brands/dc-direct.jpg`} width={`100%`} className={`h-40 block`} />
                                    </div>
                                </div>

                                <button onClick={e => setDeviceScreen('brands')} className={`text-center w-36 bg-gray-300 rounded-md bg-black items-center justify-center flex mr-2`}>
                                    <div>
                                        <img src={`./assets/images/veve/icons/viewall.png`} width={`40`} className={`block mx-auto mb-3`}/>
                                        <span className="block">View all</span>
                                    </div>
                                </button>


                            </div>
                        </ScrollContainer>

                        <span className={`block text-sm text-gray-400 border-b border-gray-500 relative mt-7 mb-3`}><span className={`absolute -bottom-1 veve-light-grey-bg pr-1`}>Popular</span></span>

                        <ScrollContainer>
                            <div className="grid grid-cols-6 gap-2 w-max mb-2">
                                <div className={`text-center w-36 rounded-md overflow-hidden bg-gray-300  items-center justify-center flex`}>
                                    <div>
                                        <img src={`./assets/images/veve/tiles/popular/ultraman-riseof.jpg`} width={`100%`} className={`h-48 block`} />
                                        <span className="block text-xs py-1 px-2 bg-gray-100 text-black text-left rounded-md">#1 The Rise of Ultram...</span>
                                        <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-left float-left">Common</span>
                                        <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-right float-right">
                                            <img src={`./assets/images/veve/icons/gem.png`} width={`13px`} className={`inline-block mr-1`} />
                                            Sold out
                                        </span>
                                    </div>
                                </div>
                                <div className={`text-center w-36 rounded-md overflow-hidden bg-gray-300  items-center justify-center flex`}>
                                    <div>
                                        <img src={`./assets/images/veve/tiles/popular/ultraman-riseof-al.jpg`} width={`100%`} className={`h-48 block`} />
                                        <span className="block text-xs py-1 px-2 bg-gray-100 text-black text-left rounded-md">#1 The Rise of Ultram...</span>
                                        <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-left float-left">Rare</span>
                                        <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-right float-right">
                                            <img src={`./assets/images/veve/icons/gem.png`} width={`13px`} className={`inline-block mr-1`} />
                                            14.99
                                        </span>
                                    </div>
                                </div>
                                <div className={`text-center w-36 rounded-md overflow-hidden bg-gray-300  items-center justify-center flex`}>
                                    <div>
                                        <img src={`./assets/images/veve/tiles/featured/darwyn-cooke_batman.jpg`} width={`100%`} className={`h-48 block`} />
                                        <span className="block text-xs py-1 px-2 bg-gray-100 text-black text-left rounded-md">#42 Darwyn Cooke Ba...</span>
                                        <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-left float-left">Common</span>
                                        <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-right float-right">
                                            <img src={`./assets/images/veve/icons/gem.png`} width={`13px`} className={`inline-block mr-1`} />
                                            14.99
                                        </span>
                                    </div>
                                </div>
                                <div className={`text-center w-36 rounded-md overflow-hidden bg-gray-300  items-center justify-center flex`}>
                                    <div>
                                        <img src={`./assets/images/veve/tiles/featured/todd-mcfarlane_batman.jpg`} width={`100%`} className={`h-48 block`} />
                                        <span className="block text-xs py-1 px-2 bg-gray-100 text-black text-left rounded-md">#100 Todd McFarlane...</span>
                                        <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-left float-left">Common</span>
                                        <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-right float-right">
                                            <img src={`./assets/images/veve/icons/gem.png`} width={`13px`} className={`inline-block mr-1`} />
                                            Sold out
                                        </span>
                                    </div>
                                </div>
                                <div className={`text-center w-36 rounded-md overflow-hidden bg-gray-300  items-center justify-center flex`}>
                                    <div>
                                        <img src={`./assets/images/veve/tiles/featured/eduardo-risso_batman.jpg`} width={`100%`} className={`h-48 block`} />
                                        <span className="block text-xs py-1 px-2 bg-gray-100 text-black text-left rounded-md">#86 Eduardo Risso...</span>
                                        <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-left float-left">Ultra Rare</span>
                                        <span className="inline-block text-xxs py-1 px-2 bg-gray-300 text-black text-right float-right">
                                            <img src={`./assets/images/veve/icons/gem.png`} width={`13px`} className={`inline-block mr-1`} />
                                            Sold out
                                        </span>
                                    </div>
                                </div>
                                <div className={`text-center w-36 bg-gray-300 rounded-md bg-black items-center justify-center flex mr-2`}>
                                    <div>
                                        <img src={`./assets/images/veve/icons/viewall.png`} width={`40`} className={`block mx-auto mb-3`}/>
                                        <span className="block">View all</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollContainer>

                    </div>
                </>
            </div>
        )
    }

    const collectionScreen = () => {
        return(
            <div className={`device__screen--collection relative h-full`}>

               {/*Insert Video hEre*/}

                <div className="collection-controls absolute bottom-1 w-full px-2">
                    <div className="grid grid-cols-12 text-center">
                        <div className={`col-span-3`}>
                            <div className={`controller h-20 w-20 bg-white rounded-full border-2 border-black mx-auto`}>
                                <span className={`h-8 w-8 rounded-full block mx-auto`}></span>
                            </div>
                        </div>
                        <div className={`col-span-6`}>
                            <div className="grid grid-cols-3 ar-options">
                                <div className={`ar-icon`}>AR</div>
                                <div className={`camera-icon`}><img src={`./assets/images/veve/icons/camera.png`} /></div>
                                <div className={`plus-icon`}>+</div>
                            </div>
                        </div>
                        <div className={`col-span-3`}>
                            <div className={`controller h-20 w-20 bg-white rounded-full border-2 border-black mx-auto`}>
                                <span className={`h-8 w-8 rounded-full block mx-auto`}></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const feedScreen = () => {
        return(
            <>
                <div className={`device__screen--feed`}>
                    <div className={`pt-2 pl-2`}>
                        <ScrollContainer>
                            <div className="grid grid-cols-6 gap-2 w-max mb-2 feed-tags">
                                <button className={`text-center text-xs px-2 py-1 rounded-full text-gray-400 items-center justify-center flex`}>Tsuburaya</button>
                                <button className={`text-center text-xs px-2 py-1 rounded-full text-gray-400 items-center justify-center flex`}>Ultraman Anime</button>
                                <button className={`text-center text-xs px-2 py-1 rounded-full text-gray-400 items-center justify-center flex`}>OMI</button>
                                <button className={`text-center text-xs px-2 py-1 rounded-full text-gray-400 items-center justify-center flex`}>DC Direct</button>
                                <button className={`text-center text-xs px-2 py-1 rounded-full text-gray-400 items-center justify-center flex`}>tokidoki</button>
                                <button className={`text-center text-xs px-2 py-1 rounded-full text-gray-400 items-center justify-center flex mr-2`}>Ultraman</button>
                            </div>
                        </ScrollContainer>

                        <div className="feed-post overflow-hidden mr-2 mb-3">
                            <div className="feed-post__header text-xs p-2">
                                <span className="feed-post__avatar rounded-full inline-block mr-2 overflow-hidden h-6 w-6 bg-black">
                                    <img src={`./assets/images/omi.jpg`} alt="OMI The Clown" />
                                </span>
                                <span className={`feed-post__author`}>OMItheClown</span> <span className="feed-post__counter rounded-full inline-block h-4 w-4 text-xxs text-white text-center">5</span>
                            </div>
                            <div className="feed-post__image">
                                <img src={`./assets/images/veve/tiles/feed/harley.jpg`} alt="Harley Quinn" className={`w-full`}/>
                            </div>
                            <span className="block text-xs py-2 px-3 bg-gray-100 text-black text-left">
                                Harley Quinn
                                <span className="float-right">Ultra Rare #153</span>
                            </span>
                            <div className="feed-post__comment p-3 text-xs">
                                <strong>OMI The Clown</strong> Check my new digital collectible.
                                <br/><br/>
                                I'm thinking about selling it, anyone interested?
                            </div>
                            <span className="border-t border-gray-400 feed-post__footer block text-xs py-2 px-3 text-black text-left rounded-b-lg text-gray-500">
                                <img src={`./assets/images/veve/icons/heart.png`} width={`10`} className={`inline-block`} /> 7700
                                <img src={`./assets/images/veve/icons/comments.png`} width={`10`} className={`inline-block ml-2`} /> 491
                                <span className="float-right text-xxs">a few seconds ago</span>
                            </span>
                        </div>

                        <div className="feed-post overflow-hidden mr-2 mb-3">
                            <div className="feed-post__header text-xs p-2">
                                <span className="feed-post__avatar rounded-full inline-block mr-2 overflow-hidden h-6 w-6 bg-black">
                                    <img src={`./assets/images/omi.jpg`} alt="OMI The Clown" />
                                </span>
                                <span className={`feed-post__author`}>OMItheClown</span> <span className="feed-post__counter rounded-full inline-block h-4 w-4 text-xxs text-white text-center">5</span>
                            </div>
                            <div className="feed-post__image">
                                <img src={`./assets/images/veve/tiles/feed/delorean.jpg`} alt="Back To The Future" className={`w-full`}/>
                            </div>
                            <span className="block text-xs py-2 px-3 bg-gray-100 text-black text-left">
                                1:6 DeLorean Time Machine - Interactive
                                <span className="float-right">Common</span>
                            </span>
                            <div className="feed-post__comment p-3 text-xs">
                                <strong>OMI The Clown</strong> Check my new digital collectible.
                                <br/><br/>
                                I'm thinking about selling it, anyone interested?
                            </div>
                            <span className="border-t border-gray-400 feed-post__footer block text-xs py-2 px-3 text-black text-left rounded-b-lg text-gray-500">
                                <img src={`./assets/images/veve/icons/heart.png`} width={`10`} className={`inline-block`} /> 2266
                                <img src={`./assets/images/veve/icons/comments.png`} width={`10`} className={`inline-block ml-2`} /> 273
                                <span className="float-right text-xxs">a few seconds ago</span>
                            </span>
                        </div>

                        <div className="feed-post overflow-hidden mr-2 mb-3">
                            <div className="feed-post__header text-xs p-2">
                                <span className="feed-post__avatar rounded-full inline-block mr-2 overflow-hidden h-6 w-6 bg-black">
                                    <img src={`./assets/images/omi.jpg`} alt="OMI The Clown" />
                                </span>
                                <span className={`feed-post__author`}>OMItheClown</span> <span className="feed-post__counter rounded-full inline-block h-4 w-4 text-xxs text-white text-center">5</span>
                            </div>
                            <div className="feed-post__image">
                                <img src={`./assets/images/veve/tiles/feed/yeti.jpg`} alt="Yeti" className={`w-full`}/>
                            </div>
                            <span className="block text-xs py-2 px-3 bg-gray-100 text-black text-left">
                                Yeti
                                <span className="float-right">Common</span>
                            </span>
                            <div className="feed-post__comment p-3 text-xs">
                                <strong>OMI The Clown</strong> Just caught myself a Yeti.
                                <br/><br/>
                                Low mint, fair price.
                            </div>
                            <span className="border-t border-gray-400 feed-post__footer block text-xs py-2 px-3 text-black text-left rounded-b-lg text-gray-500">
                                <img src={`./assets/images/veve/icons/heart.png`} width={`10`} className={`inline-block`} /> 7700
                                <img src={`./assets/images/veve/icons/comments.png`} width={`10`} className={`inline-block ml-2`} /> 491
                                <span className="float-right text-xxs">4 minutes ago</span>
                            </span>
                        </div>

                    </div>
                </div>
            </>
        )
    }

    const marketScreen = () => {
        return(
            <>
                Market screen
            </>
        )
    }

    const profileScreen = () => {
        return(
            <>
                Profile
            </>
        )
    }

    const getScreen = (deviceScreen) => {
        switch (deviceScreen){
            case 'store':
                return storeScreen()
            break
            case 'collection':
                return collectionScreen()
            break
            case 'feed':
                return feedScreen()
            break
            case 'market':
                return marketScreen()
            break
            case 'profile':
                return profileScreen()
            break
            case 'brands':
                return <ListBrandsScreen getClickData={getClickData} />
            break
            case 'brand':
                return <BrandScreen setDeviceScreen={setDeviceScreen} slug={slug} />
            break
            default:
                return(
                    <>
                        Default
                    </>
                )
        }
    }
    return(
        <article>
            <div className="device">
                {phoneHeader()}
                <div className="">
                    <ScrollContainer className="device__content" horizontal={false}>
                        {getScreen(deviceScreen)}
                    </ScrollContainer>
                </div>
                {phoneFooter()}
            </div>
            <span className={`text-sm text-center block text-white`}>*You can interact with the above emulation.</span>
        </article>
    )
}

export default PhoneApplication