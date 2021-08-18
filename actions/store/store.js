import fetch from 'isomorphic-fetch'
import { API } from "../../config";

export const getNewArrivals = (offset, limit) => {
    const data = {
        limit,
        offset
    }
    return fetch(`${API}/collectibles`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}