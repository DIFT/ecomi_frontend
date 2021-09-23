import Default from "../../components/Templates/Default"
import Link from "next/link"
import { useEffect, useState } from 'react'
import dynamic from "next/dynamic"
import ReactTooltip from "react-tooltip"
import { getCurrentBurnTotal } from "../../actions/metrics/metrics"
import { useTranslation } from 'react-i18next'

// const UserGrowthChart = dynamic(() => import('../../components/metrics/charts/UserGrowthChart'), {
//     ssr: false
// })
//
// const BurnHeatMap = dynamic(() => import('../../components/metrics/charts/BurnHeatMap'), {
//     ssr: false
// })
//
// const BurnRateChart = dynamic(() => import('../../components/metrics/charts/BurnRateChart'), {
//     ssr: false
// })

// Icons
const QuestionIcon = dynamic(() => import('../../components/Misc/LordIcon').then((mod) => mod.QuestionIcon), {
    ssr: false
});

const Tokenomics = () => {

    const { t } = useTranslation();

    const [exchanges, setExchanges] = useState([])


    const getExchanges = () => {
        const exchangeList = [
            {"id": 1, "title": "BitForex", "url": "https://bitforex.com"},
            {"id": 2, "title": "AscendEx", "url": "https://ascendex.com"},
            {"id": 3, "title": "Gate.io", "url": "https://gate.io"},
        ]
        setExchanges(exchangeList)
    }


    useEffect(() => {
        getExchanges() // TODO: Hook this up with back end
    },[])

    const displayCoins = (numberOfCoins) => {
        return (
            <div className={"coin-stack"}>
                {[...Array(numberOfCoins).keys()].map(el => (
                    <div key={el} className={"coin"} />
                ))}
            </div>
        )
    }

    const whatIsOmi = () => {
        return (
            <div className="relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto text-white">
                <section className="space-y-6 mb-20 text-lg" >
                    <h1 className={`text-3xl sm:text-3xl lg:text-3xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>{t(`tokenomics.title`)}</h1>
                    <p>
                        {t(`tokenomics.description`)}
                        <span className={`cursor-pointer`} data-tip={`Definition: The total supply of the token will decrease every time a transfer happens that meets a predefined criteria.`} data-html={true} data-event='click focus'>
                                       <QuestionIcon animation={'click'} size={'30px'} type={'solid'} />
                                </span>
                        {t(`tokenomics.description1`)}
                    </p>
                    <ul className={`my-5`}>
                        {exchanges && exchanges.map(exchange => <li key={exchange.id} className={`inline-block mr-3`}>
                            <a href={exchange.url} target={"_blank"} className="bg-pink-500 hover:bg-pink-700 text-white font-base py-2 px-4 rounded-full font-semibold text-sm">{exchange.title}</a>
                        </li>)}
                    </ul>
                </section>
            </div>

        )
    }

    const tokenBreakdown = () => {
        return (
            <div className="relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto text-white">
                <section className={`text-lg mb-20`}>
                    <div>
                        <h2 className={`text-3xl sm:text-3xl lg:text-3xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>t{(`tokenomics.breakdown`)}</h2>

                        <div className="flex items-center align-items mb-5">
                            <span className={`inline-block uppercase text-sm font-medium text-gray-400 mr-5`}>t{(`tokenomics.legend`)}</span>
                            <ul>
                                <li className={`inline-block`}>
                                    <div className="flex align-items items-center">
                                        <span className="coin legend"></span> <span className={`ml-2 font-medium uppercase text-sm`}>10bn</span>
                                    </div>
                                </li>
                                <li className={`inline-block ml-5`}>
                                    <div className="flex align-items items-center">
                                        <span className="coin legend five-b"></span> <span className={`ml-2 font-medium uppercase text-sm`}>5bn</span>
                                    </div>
                                </li>
                                <li className={`inline-block ml-5`}>
                                    <div className="flex align-items items-center">
                                        <span className="coin legend one-b"></span> <span className={`ml-2 font-medium uppercase text-sm`}>1bn</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <p>{t(`tokenomics.mintedTokens`)}</p>

                        <div className="my-20 text-center">
                                <span className={`text-5xl font-bold mr-5 inline-block`}>
                                    750bn
                                    <span className={`block text-sm uppercase font-medium text-gray-300`}>{t(`tokenomics.OMITokens`)}</span>
                                </span>
                            <div>
                                <div className="coin-stack opacity-50">
                                    <span className="coin error"></span>
                                    <span className="coin error"></span>
                                    <span className="coin error"></span>
                                    <span className="coin error"></span>
                                    <span className="coin error"></span>
                                    <span className="coin error"></span>
                                    <span className="coin error"></span>
                                    <span className="coin error"></span>
                                    <span className="coin error"></span>
                                    <span className="coin five-b error"></span>
                                    <span className="coin one-b error"></span>
                                    <span className="coin one-b error"></span>
                                </div>
                                {displayCoins(10)}
                                {displayCoins(10)}
                                {displayCoins(10)}
                                {displayCoins(10)}
                                {displayCoins(10)}
                                {displayCoins(10)}
                                <div className="coin-stack">
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin one-b"></span>
                                    <span className="coin one-b"></span>
                                    <span className="coin one-b"></span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6 text-lg">
                            <span className="block uppercase text-sm font-medium text-gray-400 mb-2">{t(`tokenomics.important`)}</span>
                            <p>{t(`tokenomics.important1`)} <strong>{t(`tokenomics.important2`)}</strong>
                                <span className={`cursor-pointer`} data-tip={`Verified: <a href="https://youtu.be/cKcLiwhpYFg?t=1207" target="_blank">March Community update</a>`} data-html={true} data-event='click focus'>
                                    <lord-icon
                                        animation="click"
                                        palette="#34D399"
                                        size={'30px'}
                                        params="30"
                                        className={`inline`}
                                        src={`./assets/icons/24-approved-checked/24-approved-checked-solid.json`}>
                                    </lord-icon>
                                </span>
                                {t(`tokenomics.important3`)}
                                <span className={`cursor-pointer`} data-tip={`
                                    <audio controls>
                                      <source src="/assets/sounds/rhys_token-burn.mp3" type="audio/mpeg">
                                      Your browser does not support the audio element.
                                    </audio>`} data-html={true} data-event='click focus'>
                                        <lord-icon
                                            animation="click"
                                            palette="#34D399"
                                            size={'30px'}
                                            params="30"
                                            className={`inline`}
                                            src={`./assets/icons/24-approved-checked/24-approved-checked-solid.json`}>
                                        </lord-icon>
                                </span>
                                {t(`tokenomics.important4`)} <a href={"https://medium.com/ecomi/veve-moves-to-ethereum-via-immutable-x-d69bfbd736d6"} target={"_blank"} className={`text-pink-500 font-semibold`}>{t(`tokenomics.important5`)}</a>. {t(`tokenomics.important6`)}
                                <span className={`cursor-pointer`} data-tip={`ImmutableX: <a href="https://medium.com/ecomi/veve-moves-to-ethereum-via-immutable-x-d69bfbd736d6" target="_blank">March Community update</a>`} data-html={true} data-event='click focus'>
                                    <lord-icon
                                        animation="click"
                                        palette="#34D399"
                                        size={'30px'}
                                        params="30"
                                        className={`inline`}
                                        src={`./assets/icons/24-approved-checked/24-approved-checked-solid.json`}>
                                    </lord-icon>
                                </span>
                            </p>
                        </div>

                    </div>
                </section>
                <section className={`text-lg mb-20`}>

                    <p className={` mb-8 sm:mb-10`}>{t(`tokenomics.remaining`)}</p>

                    <div className="grid grid-cols-6 gap-2 gap-y-20 ">
                        <div className={`col-span-2`}>
                            <div>
                                    <span className={`text-5xl font-bold mr-5 inline-block`}>
                                        300bn
                                        <span className={`block text-sm uppercase font-medium text-gray-300`}>{t(`tokenomics.remaining1`)}</span>
                                    </span>
                            </div>
                            <div className="flex space-x-3 align-center items-center">
                                {displayCoins(10)}
                                {displayCoins(10)}
                                {displayCoins(10)}
                            </div>
                            <span className={`block text-sm text-gray-300`}>{t(`tokenomics.remaining2`)}</span>
                        </div>

                        <div>
                            <div>
                                    <span className={`text-5xl font-bold mr-5 inline-block`}>
                                        40bn
                                        <span className={`block text-sm uppercase font-medium text-gray-300`}>{t(`tokenomics.remaining1`)}</span>
                                    </span>
                            </div>
                            <div className="flex space-x-3 align-center items-center">
                                <div className="coin-stack">
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                </div>
                            </div>
                            <span className={`block text-sm text-gray-300`}>{t(`tokenomics.remaining3`)}</span>
                        </div>

                        <div>
                            <div>
                                    <span className={`text-5xl font-bold mr-5 inline-block`}>
                                        75bn
                                        <span className={`block text-sm uppercase font-medium text-gray-300`}>{t(`tokenomics.remaining1`)}</span>
                                    </span>
                            </div>
                            <div className="flex space-x-3 align-center items-center">
                                <div className="coin-stack">
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin five-b"></span>
                                </div>
                            </div>
                            <span className={`block text-sm text-gray-300`}>{t(`tokenomics.remaining4`)}</span>
                        </div>

                        <div>
                            <div>
                                    <span className={`text-5xl font-bold mr-5 inline-block`}>
                                        17bn
                                        <span className={`block text-sm uppercase font-medium text-gray-300`}>{t(`tokenomics.remaining1`)}</span>
                                    </span>
                            </div>
                            <div className="flex space-x-3 align-center items-center">
                                <div className="coin-stack">
                                    <span className="coin"></span>
                                    <span className="coin five-b"></span>
                                    <span className="coin one-b"></span>
                                    <span className="coin one-b"></span>
                                </div>
                            </div>
                            <span className={`block text-sm text-gray-300`}>{t(`tokenomics.remaining5`)}</span>
                        </div>

                        <div>
                            <div>
                                    <span className={`text-5xl font-bold mr-5 inline-block`}>
                                        83bn
                                        <span className={`block text-sm uppercase font-medium text-gray-300`}>{t(`tokenomics.remaining1`)}</span>
                                    </span>
                            </div>
                            <div className="flex space-x-3 align-center items-center">
                                <div className="coin-stack">
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin one-b"></span>
                                    <span className="coin one-b"></span>
                                    <span className="coin one-b"></span>
                                </div>
                            </div>
                            <span className={`block text-sm text-gray-300`}>{t(`tokenomics.remaining6`)}</span>
                        </div>

                        <div>
                            <div>
                                    <span className={`text-5xl font-bold mr-5 inline-block`}>
                                        110bn
                                        <span className={`block text-sm uppercase font-medium text-gray-300`}>{t(`tokenomics.remaining1`)}</span>
                                    </span>
                            </div>
                            <div className="flex space-x-3 align-center items-center">
                                <div className="coin-stack">
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                </div>
                            </div>
                            <span className={`block text-sm text-gray-300`}>{t(`tokenomics.remaining7`)}</span>
                        </div>

                        <div>
                            <div>
                                    <span className={`text-5xl font-bold mr-5 inline-block`}>
                                        27bn
                                        <span className={`block text-sm uppercase font-medium text-gray-300`}>{t(`tokenomics.remaining1`)}</span>
                                    </span>
                            </div>
                            <div className="flex space-x-3 align-center items-center">
                                <div className="coin-stack">
                                    <span className="coin"></span>
                                    <span className="coin"></span>
                                    <span className="coin five-b"></span>
                                    <span className="coin one-b"></span>
                                    <span className="coin one-b"></span>
                                </div>
                            </div>
                            <span className={`block text-sm text-gray-300`}>{t(`tokenomics.remaining8`)}</span>
                        </div>

                    </div>

                </section>
            </div>
        )
    }

    const deflationaryToken = () => {
        const [currentBurnTotal, setCurrentBurnTotal] = useState('0')

        useEffect(() => {
            getCurrentBurnTotal()
                .then(data => {
                    setCurrentBurnTotal(data[0].burnWalletBalance.toLocaleString())
                })
                .catch(e => console.log('Error getting current burn total', e))
        }, [])

        return(
            <section className={`text-lg mb-20`}>
                <div className="relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto text-white">
                    <div className="text-center">
                        <h3 className={`text-4xl sm:text-4xl lg:text-4xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>{t(`tokenomics.deflationary`)}</h3>
                        <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11 text-gray-300`}>{t(`tokenomics.deflationary1`)}</p>

                        <div className="my-10">
                            <span className={`text-6xl text-green-400 font-medium block`}>{currentBurnTotal}</span>
                            <span className={`block text-sm mt-2 text-gray-300`}>{t(`tokenomics.deflationary2`)}</span>
                        </div>
                    </div>

                    <h3 className={`text-3xl sm:text-3xl lg:text-3xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>{t(`tokenomics.burningRate`)}</h3>
                    <span className={`block uppercase text-sm font-medium text-gray-400 mb-2`}>{t(`tokenomics.burningRate1`)}</span>
                    <div className="space-y-6">
                        <p>{t(`tokenomics.burningRate2`)}</p>
                        <p>{t(`tokenomics.burningRate3`)} {currentBurnTotal} {t(`tokenomics.burningRate4`)}</p>
                    </div>
                </div>

                {/*<div className="grid grid-cols-2 gap-20 my-20 container">*/}
                {/*    <BurnRateChart />*/}
                {/*    <BurnHeatMap />*/}
                {/*    <UserGrowthChart />*/}
                {/*</div>*/}

            </section>
        )
    }

    return(
        <Default>
            <>
                <div className="relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto text-white">
                    <header className="space-y-6 mb-20 text-lg border-b pb-20">
                        <h1 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>{t(`tokenomics.tokenomics`)}</h1>

                        <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11 text-gray-400`}>{t(`tokenomics.tokenomics1`)}</p>
                        <p className={`text-lg mb-8 font-medium text-gray-300`}>
                            <span className={`block uppercase text-sm font-medium text-gray-400 mb-2`}>{t(`tokenomics.tokenomics2`)}</span>
                            {t(`tokenomics.tokenomics3`)} <a href={`https://drive.google.com/file/d/1UNE-EvjuMIaWJUfvF3qQiTe0OKLFAJXV/view`} target={"_blank"} className={`text-pink-500`}>{t(`tokenomics.tokenomics4`)}</a>. {t(`tokenomics.tokenomics5`)}
                        </p>
                    </header>
                </div>

                {whatIsOmi()}
                {tokenBreakdown()}
                {deflationaryToken()}

                <h3 className="text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10 text-center">
                    {t(`tokenomics.pageNotBuilt`)}
                </h3>

            </>
            <ReactTooltip clickable={true} />
        </Default>
    )
}

export default Tokenomics