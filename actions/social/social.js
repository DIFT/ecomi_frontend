import fetch from 'isomorphic-fetch'
import { API } from "../../config"
import queryString from 'query-string'

export const getPosts = () => {
    return fetch(`${API}/posts`, {
        method: "GET",
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}