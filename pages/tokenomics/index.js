import Default from "../../templates/Default"
import { API } from "../../config";
import Link from "next/link"
import { useEffect, useState } from 'react'
import { getBrands } from "../../actions/brand"
import { getLicenses } from "../../actions/license";

const Tokenomics = () => {

    useEffect(() => {
    },[])

    return(
        <Default>
            <>
                <div className="container text-white">
                    <h1 className={`text-5xl sm:text-6xl lg:text-6xl leading-none font-medium tracking-tight text-white mb-8 sm:mb-10`}>Tokenomics</h1>

                    <p className={`text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11 text-gray-400`}>The tokenomics on this project have been described as both genuine brilliance, and innate madness.</p>
                    <p className={`text-lg mb-8`}>
                        The underlying economy of VEVE is the OMI Token. The token is needed for two reasons.
                        Firstly, the sale and purchase of digital collectibles and secondly, access to extra features and
                        benefits within the app, such as the ’Master Collector Program’.
                    </p>

                    <p className={`text-lg mb-8`}>
                        When a purchase is made using OMI tokens, the tokens involved in the transaction are exchanged
                        for the digital collectible and then expire. After a successful purchase the invalid OMI tokens are
                        sent to an inaccessible smart contract where they reside permanently.
                    </p>

                </div>
            </>
        </Default>
    )
}

export default Tokenomics