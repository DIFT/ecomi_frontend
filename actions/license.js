import fetch from 'isomorphic-fetch'
import { API } from "../config"

export const create = (license, token) => {
    return fetch(`${API}/license`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(license)
    })
        .then(response => {
            return response.json()
        })
        .catch( err => console.log(err))
}

export const getLicenses = () => {
    return fetch(`${API}/licenses`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch( err => console.log(err))
}

export const singleLicense = (slug) => {
    return fetch(`${API}/license/${slug}`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch( err => console.log(err))
}

export const removeLicense = (slug, token) => {
    return fetch(`${API}/license/${slug}`, {
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