import fetch from 'isomorphic-fetch'
import { API } from "../../config"

export const create = (brand, token) => {
    return fetch(`${API}/brand`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(brand)
    })
        .then(response => {
            return response.json()
        })
        .catch( err => console.log(err))
}

export const getBrands = () => {
    return fetch(`${API}/brands`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch( err => console.log(err))
}

export const singleBrand = (slug) => {
    return fetch(`${API}/brand/${slug}`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch( err => console.log(err))
}

export const removeBrand = (slug, token) => {
    return fetch(`${API}/brand/${slug}`, {
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