import fetch from 'isomorphic-fetch'
import { API } from "../../config"

export const getMarketData = () => {
    return fetch(`${API}/metrics/marketplace`, {
        method: "GET",
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}