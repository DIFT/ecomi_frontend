import fetch from 'isomorphic-fetch'
import { API } from "../../config";

export const getNewArrivals = (props) => {
    console.log('Offset is from newArrivals: ', props)
    return fetch(`${API}/collectibles`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({props})
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}