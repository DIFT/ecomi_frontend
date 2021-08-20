import fetch from 'isomorphic-fetch'
import { API } from "../../config"

export const getComics = (offset, limit) => {
    const data = {
        limit,
        offset
    }
    return fetch(`${API}/comics`, {
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

export const singleComic = slug => {
    return fetch(`${API}/comic/${slug}`, {
        method: "GET",
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}