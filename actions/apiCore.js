import fetch from 'isomorphic-fetch'
import { API } from "../config"

export const getFilteredProducts = (offset, limit, filters = {}) => {
    const data = {
        limit, offset, filters
    };
    return fetch(`${API}/collectibles/by/search/`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log('Error', err);
        })
};