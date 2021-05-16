import fetch from 'isomorphic-fetch'
import { API } from "../../config";

export const getNewArrivals = (props) => {
    return fetch(`${API}/ecomi/store/new-arrivals`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
        //     offset: props
        // })
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}