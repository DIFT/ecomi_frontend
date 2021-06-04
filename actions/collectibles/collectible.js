import fetch from 'isomorphic-fetch'
import { API } from "../../config"
import queryString from 'query-string'

export const createCollectible = (member, token) => {
    return fetch(`${API}/collectible`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: member
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

export const list = (offset, limit) => {
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

export const updateCollectible = (member, token, slug) => {
    return fetch(`${API}/collectible/${slug}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: member
    })
        .then(response => {
            return response.json()
        })
        .catch( err => console.log('Error is: ', err))
}