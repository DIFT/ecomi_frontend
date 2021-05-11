import fetch from 'isomorphic-fetch'
import { API } from "../config"
import queryString from 'query-string'

export const createCollectible = (collectible, token) => {
    return fetch(`${API}/collectible`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: collectible
    })
        .then(response => {
            return response.json()
        })
        .catch( err => console.log('Error is: ', err))
}

export const listCollectiblesWithCategoriesAndTags = (offset, limit) => {
    const data = {
        limit,
        offset
    }
    return fetch(`${API}/collectibles-categories-tags`, {
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
        .catch( err => console.log('Error is: ', err))
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

export const listRelated = (collectible) => {
    return fetch(`${API}/collectibles/related`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(collectible)
    })
        .then(response => {
            return response.json()
        })
        .catch( err => console.log('Error is: ', err))
}

export const list = () => {
    return fetch(`${API}/collectibles`, {
        method: "GET",
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}

export const removeCollectible = (slug, token) => {
    return fetch(`${API}/collectible/${slug}`, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json()
        })
        .catch( err => console.log('Error is: ', err))
}

export const updateCollectible = (collectible, token, slug) => {
    return fetch(`${API}/collectible/${slug}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: collectible
    })
        .then(response => {
            return response.json()
        })
        .catch( err => console.log('Error is: ', err))
}

export const listSearch = (params) => {
    let query = queryString.stringify(params)
    return fetch(`${API}/collectibles/search?${query}`, {
        method: "GET",
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}