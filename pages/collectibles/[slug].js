import Head from "next/head"
import Default from "../../templates/Default"

import { singleCollectible } from "../../actions/collectibles/collectible"
import {APP_NAME} from "../../config";

const Collectible = ({ collectible, query }) => {

    const head = () => (
        <Head>
            <title>{collectible.name} | { APP_NAME }</title>
        </Head>
    )

    return (
        <>
            {head()}
            <Default>
                <main className={`text-white`}>
                    <h1>{collectible.name}</h1>
                    <br/>
                    {collectible.dropDate}
                    <br/>
                    {collectible.brand.name}
                    <br/>
                    {collectible.description}
                    <br/>
                    <img src={collectible.image.url} alt={collectible.name} />
                    <br/>
                    {collectible.storePrice}
                    <br/>
                    {collectible.rarity}
                    <br/>
                    {collectible.totalIssued}
                    <br/>
                    {collectible.totalAvailable}
                    <br/>
                    {collectible.editionType}
                    <br/>
                    {collectible.updatedAt}
                    <br/>
                    {collectible.revenue.potential}
                    <br/>
                    {collectible.revenue.realised}
                </main>
            </Default>

        </>
    )
}

Collectible.getInitialProps = ({ query }) => {
    return singleCollectible(query.slug)
        .then(data => {
            if (data.error){
                console.log('Error: ', data.error)
            } else {
                return{
                    collectible: data,
                    query
                }
            }
        })
}

export default Collectible