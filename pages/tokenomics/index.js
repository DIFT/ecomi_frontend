import Default from "../../templates/Default"
import { API } from "../../config";
import Link from "next/link"
import { useEffect, useState } from 'react'
import { getBrands } from "../../actions/brand"
import { getLicenses } from "../../actions/license";
import dynamic from "next/dynamic";
import ReactTooltip from "react-tooltip";

// Icons
const QuestionIcon = dynamic(() => import('../../components/LordIcon').then((mod) => mod.QuestionIcon), {
    ssr: false
});

const Tokenomics = () => {

    useEffect(() => {
    },[])

    return(
        <Default>
            <>
                <div className="container text-white">

                    <header className="space-y-6 mb-20 text-lg border-b pb-20">
                        <h1 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>Tokenomics</h1>

                        <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11 text-gray-400`}>The tokenomics on this project have been described as both genuine brilliance, and innate madness.</p>
                        <p className={`text-lg mb-8 font-medium text-gray-300`}>
                            <span className={`block uppercase text-sm font-medium text-gray-400 mb-2`}>Important</span>
                            For a more complex and accurate break down of the tokenomics please check <a href={`https://drive.google.com/file/d/1UNE-EvjuMIaWJUfvF3qQiTe0OKLFAJXV/view`} target={"_blank"} className={`text-blue-500`}>the official whitepaper</a>. Although every effort has been made to make this information as accurate as possible using easy to understand methods, there may be some errors. Your own research into the official whitepaper is highly encouraged.
                        </p>
                    </header>


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

                    <section className={`text-lg`}>

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
                                            <span className="coin legend half-b"></span> <span className={`ml-2 font-medium uppercase text-sm`}>5bn</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <p>ECOMI minted 750 billion OMI tokens, which can immediately put uneducated investors off who are unwilling to dive into the tokenomics and the deflationary nature of the token. However, bare with us a second...</p>

                            <div className="flex justify-center items-center align-center">
                                <div>
                                <span className={`text-5xl font-bold mr-5 inline-block my-20`}>
                                    750bn
                                    <span className={`block text-sm uppercase font-medium`}>OMI Tokens</span>
                                </span>
                                </div>
                                <div className="flex align-center items-center">
                                    <div className="coin-stack opacity-70">
                                        <span className="coin error"></span>
                                        <span className="coin error"></span>
                                        <span className="coin error"></span>
                                        <span className="coin error"></span>
                                        <span className="coin error"></span>
                                        <span className="coin error"></span>
                                        <span className="coin error"></span>
                                        <span className="coin error"></span>
                                        <span className="coin error"></span>
                                        <span className="coin half-b error"></span>
                                    </div>
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
                                    <div className="coin-stack">
                                        <span className="coin"></span>
                                        <span className="coin"></span>
                                        <span className="coin"></span>
                                        <span className="coin"></span>
                                        <span className="coin"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6 text-lg">
                                <span className="block uppercase text-sm font-medium text-gray-400 mb-2">Important</span>
                                <p>You'll notice the first ten chips are red, this is because during the execution of smart contracts a user error was made which <strong>accidently locked up 97 billion OMI tokens for thousands of years</strong>
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
                                    , effectively taking them out of circulation.</p>


                            </div>

                        </div>
                    </section>

                </div>
            </>
            <ReactTooltip clickable={true} />
        </Default>
    )
}

export default Tokenomics