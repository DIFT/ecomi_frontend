import Head from "next/head"
import Default from "../../templates/Default"

import { singleLicense } from "../../actions/license"
import {APP_NAME} from "../../config";

const License = ({ license, collectibles, query }) => {

    const head = () => (
        <Head>
            <title>{license.name} | { APP_NAME }</title>
        </Head>
    )

    return (
        <>
            {head()}
            <Default>
                <main>
                    <h1>{license.name}</h1>
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
                                {collectible.brand}
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

License.getInitialProps = ({ query }) => {
    return singleLicense(query.slug)
        .then(data => {
            if (data.error){
                console.log('Error: ', data.error)
            } else {
                return{
                    license: data.license,
                    collectibles: data.collectibles,
                    query
                }
            }
        })
}

export default License