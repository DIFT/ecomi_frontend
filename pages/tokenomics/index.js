import Default from "../../templates/Default"
import Link from "next/link"
import { useEffect, useState } from 'react'
import dynamic from "next/dynamic"
import ReactTooltip from "react-tooltip"
import { getCurrentBurnTotal } from "../../actions/metrics/metrics"

const UserGrowthChart = dynamic(() => import('../../components/metrics/charts/UserGrowthChart'), {
    ssr: false
})

const BurnHeatMap = dynamic(() => import('../../components/metrics/charts/BurnHeatMap'), {
    ssr: false
})

const BurnRateChart = dynamic(() => import('../../components/metrics/charts/BurnRateChart'), {
    ssr: false
})

// Icons
const QuestionIcon = dynamic(() => import('../../components/LordIcon').then((mod) => mod.QuestionIcon), {
    ssr: false
});

const Tokenomics = () => {

    useEffect(() => {
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
                    <h1 className={`text-3xl sm:text-3xl lg:text-3xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>What is OMI?</h1>
                    <p>
                        OMI is a deflationary
                        <span className={`cursor-pointer`} data-tip={`Definition: The total supply of the token will decrease every time a transfer happens that meets a predefined criteria.`} data-html={true} data-event='click focus'>
                                       <QuestionIcon animation={'click'} size={'30px'} type={'solid'} />
                                </span>
                        cryptocurrency token that forms the underlying economy of the VEVE application. It is currently available to buy from the following exchanges:
                    </p>
                    <ul className={`flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 text-center`}>
                        <li className={`inline-block`}>
                            <Link href={`https://ascendex.com/`} ><a className={`bg-gray-900 block p-2 h-full rounded-lg border-2 border-gray-700`} target={'_blank'}><img src={`./assets/images/exchanges/ascendex.png`} width={`100`} /></a></Link>
                        </li>
                        <li className={`inline-block`}>
                            <Link href={`https://bitforex.com/`} ><a className={`w-full sm:w-auto flex-none bg-gray-50 text-gray-400 hover:text-gray-900 font-mono leading-6 py-3 sm:px-3 border border-gray-200 rounded-xl flex items-center justify-center space-x-2 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200`} target={'_blank'}><img src={`./assets/images/exchanges/bitforex.svg`} width={`100`} /></a></Link>
                        </li>
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
                        <h2 className={`text-3xl sm:text-3xl lg:text-3xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>Token breakdown</h2>

                        <div className="flex items-center align-items mb-5">
                            <span className={`inline-block uppercase text-sm font-medium text-gray-400 mr-5`}>Legend</span>
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

                        <p>ECOMI minted 750 billion OMI tokens, which can immediately put uneducated investors off who are unwilling to dive into the tokenomics and the deflationary nature of the token. However, bare with us a second...</p>

                        <div className="my-20 text-center">
                                <span className={`text-5xl font-bold mr-5 inline-block`}>
                                    750bn
                                    <span className={`block text-sm uppercase font-medium text-gray-300`}>OMI Tokens</span>
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
                            <span className="block uppercase text-sm font-medium text-gray-400 mb-2">Important</span>
                            <p>Firstly, you'll notice the first stack of chips are red, this is because during the execution of smart contracts a user error was made which <strong>accidently locked up 97 billion OMI tokens for thousands of years</strong>
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
                                , effectively taking them out of circulation. Secondly, in a recent community AMA the communications manager <Link href={`/team/rhys-skellern`} target={"_blank"}><a className={`text-pink-600`}>Rhys Skellern</a></Link> alluded to the possibility of an additional large burn
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
                                during the migration to <a href={"https://medium.com/ecomi/veve-moves-to-ethereum-via-immutable-x-d69bfbd736d6"} target={"_blank"} className={`text-pink-600`}>ImmutableX</a>.
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

                    <p className={` mb-8 sm:mb-10`}>The remaining 653 billion tokens are divded up as follows:</p>

                    <div className="grid grid-cols-6 gap-2 gap-y-20 ">
                        <div className={`col-span-2`}>
                            <div>
                                    <span className={`text-5xl font-bold mr-5 inline-block`}>
                                        300bn
                                        <span className={`block text-sm uppercase font-medium text-gray-300`}>OMI Tokens</span>
                                    </span>
                            </div>
                            <div className="flex space-x-3 align-center items-center">
                                {displayCoins(10)}
                                {displayCoins(10)}
                                {displayCoins(10)}
                            </div>
                            <span className={`block text-sm text-gray-300`}>To be used in the in app reserve for liquidity.</span>
                        </div>

                        <div>
                            <div>
                                    <span className={`text-5xl font-bold mr-5 inline-block`}>
                                        40bn
                                        <span className={`block text-sm uppercase font-medium text-gray-300`}>OMI Tokens</span>
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
                            <span className={`block text-sm text-gray-300`}>Vault wallet for liquidity.</span>
                        </div>

                        <div>
                            <div>
                                    <span className={`text-5xl font-bold mr-5 inline-block`}>
                                        75bn
                                        <span className={`block text-sm uppercase font-medium text-gray-300`}>OMI Tokens</span>
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
                            <span className={`block text-sm text-gray-300`}>Founders tokens.</span>
                        </div>

                        <div>
                            <div>
                                    <span className={`text-5xl font-bold mr-5 inline-block`}>
                                        17bn
                                        <span className={`block text-sm uppercase font-medium text-gray-300`}>OMI Tokens</span>
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
                            <span className={`block text-sm text-gray-300`}>Developers tokens.</span>
                        </div>

                        <div>
                            <div>
                                    <span className={`text-5xl font-bold mr-5 inline-block`}>
                                        83bn
                                        <span className={`block text-sm uppercase font-medium text-gray-300`}>OMI Tokens</span>
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
                            <span className={`block text-sm text-gray-300`}>Business development.</span>
                        </div>

                        <div>
                            <div>
                                    <span className={`text-5xl font-bold mr-5 inline-block`}>
                                        110bn
                                        <span className={`block text-sm uppercase font-medium text-gray-300`}>OMI Tokens</span>
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
                            <span className={`block text-sm text-gray-300`}>ICO (Initial Coin Offering).</span>
                        </div>

                        <div>
                            <div>
                                    <span className={`text-5xl font-bold mr-5 inline-block`}>
                                        27bn
                                        <span className={`block text-sm uppercase font-medium text-gray-300`}>OMI Tokens</span>
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
                            <span className={`block text-sm text-gray-300`}>Remaining from ICO.</span>
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
                        <h3 className={`text-4xl sm:text-4xl lg:text-4xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>A deflationary token</h3>
                        <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11 text-gray-300`}>The OMI token is deflationary in nature which means an inevitable higher price per token, and a better return on your investment, as the supply of the tokens become more scarce. 97 billion tokens were already burnt by error, and additional burns are constantly being triggered by in app events.</p>

                        <div className="my-10">
                            <span className={`text-6xl text-green-400 font-medium block`}>{currentBurnTotal}</span>
                            <span className={`block text-sm mt-2 text-gray-300`}>OMI tokens have been burnt since the VEVE app launched in January 2021</span>
                        </div>
                    </div>

                    <h3 className={`text-3xl sm:text-3xl lg:text-3xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>Burn rates</h3>
                    <span className={`block uppercase text-sm font-medium text-gray-400 mb-2`}>Important</span>
                    <div className="space-y-6">
                        <p>Burn rates do not directly effect the price of the OMI token, however a 'buy back' does occur from the exchange as a result of the burnt tokens which does effect the price.</p>
                        <p>The VEVE app has already burnt a massive {currentBurnTotal} tokens since Jan 2021 with only a few drops since it was launched as a beta to the public. To date the app remains in beta, and during this beta testing phase mass marketing has not yet started, collectible drops have not been consistent, and drop dates have often been pushed back to prioritise on bugs, security, improvements and other features. Yet despite all of this user growth has exceeded expectations and burn rates remain on an upward trend.</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-20 my-20 container">
                    <BurnRateChart />
                    <BurnHeatMap />
                    <UserGrowthChart />
                </div>

            </section>
        )
    }

    return(
        <Default>
            <>
                <div className="relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto text-white">
                    <header className="space-y-6 mb-20 text-lg border-b pb-20">
                        <h1 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>Tokenomics</h1>

                        <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11 text-gray-400`}>The tokenomics on this project have been described as both genuine brilliance, and innate madness.</p>
                        <p className={`text-lg mb-8 font-medium text-gray-300`}>
                            <span className={`block uppercase text-sm font-medium text-gray-400 mb-2`}>Important</span>
                            For a more complex and accurate break down of the tokenomics please check <a href={`https://drive.google.com/file/d/1UNE-EvjuMIaWJUfvF3qQiTe0OKLFAJXV/view`} target={"_blank"} className={`text-blue-500`}>the official whitepaper</a>. Although every effort has been made to make this information as accurate as possible using easy to understand methods, there may be some errors. Your own research into the official whitepaper is highly encouraged.
                        </p>
                    </header>
                </div>

                {whatIsOmi()}
                {tokenBreakdown()}
                {deflationaryToken()}

            </>
            <ReactTooltip clickable={true} />
        </Default>
    )
}

export default Tokenomics