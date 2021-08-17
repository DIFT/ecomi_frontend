import fetch from 'isomorphic-fetch'
import { API } from "../../config"

export const getCollectibles = (offset, limit) => {
    const data = {
        limit,
        offset
    }
    return fetch(`${API}/collectibles`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}

export const singleCollectible = slug => {
    return fetch(`${API}/collectible/${slug}`, {
        method: "GET",
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}