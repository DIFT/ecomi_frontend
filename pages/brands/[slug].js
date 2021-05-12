import Head from "next/head"
import Default from "../../templates/Default"

import { singleBrand } from "../../actions/brand"
import {APP_NAME} from "../../config";

const Brand = ({ brand, collectibles, query }) => {

    const head = () => (
        <Head>
            <title>{brand.name} | { APP_NAME }</title>
        </Head>
    )

    return (
        <>
            {head()}
            <Default>
                <main>
                    <h1>{brand.name}</h1>
                    <ul>
                        {console.log('collectibles: ', collectibles)}
                        {collectibles && collectibles.map((collectible, index) => (
                            <li key={index} className={`border m-3 px-3 inline-block`}>
                                {collectible.title}
                                <br/>
                                {collectible.veveImage}
                                <br/>
                                {collectible.eiImage}
                                <br/>
                                {collectible.dropDate}
                                <br/>
                                {collectible.listPrice}
                                <br/>
                                {collectible.rarity}
                                <br/>
                                {collectible.editions}
                                <br/>
                                {collectible.editionType}
                                <br/>
                                {collectible.license}
                                <br/>
                                {collectible.series}
                                <br/>
                                {collectible.body}
                            </li>
                        ))}
                        {collectibles && collectibles < 1 ? 'NOTHING TO SHOW' : null}
                    </ul>
                </main>
            </Default>

        </>
    )
}

Brand.getInitialProps = ({ query }) => {
    return singleBrand(query.slug)
        .then(data => {
            if (data.error){
                console.log('Error: ', data.error)
            } else {
                return{
                    brand: data.brand,
                    collectibles: data.collectibles,
                    query
                }
            }
        })
}

export default Brand