import fetch from 'isomorphic-fetch'
import { API } from "../../config"
import queryString from 'query-string'

export const createTeamMember = (member, token) => {
    return fetch(`${API}/team`, {
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

export const singleTeamMember = slug => {
    return fetch(`${API}/team/${slug}`, {
        method: "GET",
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}

export const list = () => {
    return fetch(`${API}/team`, {
        method: "GET",
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}

export const removeTeamMember = (slug, token) => {
    return fetch(`${API}/team/${slug}`, {
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

export const updateTeamMember = (member, token, slug) => {
    return fetch(`${API}/team/${slug}`, {
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