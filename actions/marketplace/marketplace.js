import fetch from 'isomorphic-fetch'
import { API } from "../../config";

export const getMarketPlaceListings = (props) => {

    return fetch(`${API}/ecomi/marketplace`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            offset: props
        })
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const readMarketplaceListing = (slug) => {
    return fetch(`${API}/ecomi/marketplace/listing/${slug}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}