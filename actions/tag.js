import fetch from 'isomorphic-fetch'
import { API } from "../config"

export const create = (tag, token) => {
    return fetch(`${API}/tag`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(tag)
    })
        .then(response => {
            return response.json()
        })
        .catch( err => console.log(err))
}

export const getTags = () => {
    return fetch(`${API}/tags`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch( err => console.log(err))
}

export const singleTag = (tag) => {
    return fetch(`${API}/tag/${tag}`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch( err => console.log(err))
}

export const removeTag = (tag, token) => {
    return fetch(`${API}/tag/${tag}`, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json()
        })
        .catch( err => console.log(err))
}