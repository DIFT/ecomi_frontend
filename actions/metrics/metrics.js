import fetch from 'isomorphic-fetch'
import { API } from "../../config"
import queryString from 'query-string'

export const getStoreTotalRevenue = slug => {
    return fetch(`${API}/metrics/revenue/total`, {
        method: "GET",
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}

export const getStoreHistoricalRevenue = () => {
    return fetch(`${API}/metrics/revenue`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}

export const getVeveMetrics = () => {
    return fetch(`${API}/metrics/veve`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}

export const getHeatMapData = () => {
    return fetch(`${API}/metrics/burns/heatmap`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}

export const getCurrentBurnTotal = () => {
    return fetch(`${API}/metrics/burns/total`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}

//
export const getUserGrowthData = () => {
    return fetch(`${API}/metrics/user/growth`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}

export const getAllBurnData = () => {
    return fetch(`${API}/metrics/burns`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}

export const getBrandRevenueData = () => {
    return fetch(`${API}/metrics/brands`,{
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}

export const getLicensorRevenueData = () => {
    return fetch(`${API}/metrics/licensor`,{
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}

export const getCollectibleRevenueData = () => {
    return fetch(`${API}/metrics/collectibles`,{
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}

export const list = (offset, limit) => {
    const data = {
        limit,
        offset
    }
    return fetch(`${API}/collectibles`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}

export const getMarketData = () => {
    return fetch(`${API}/metrics/marketplace`, {
        method: "GET",
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}


export const getMarketComicData = () => {
    return fetch(`${API}/metrics/marketplace/comics`, {
        method: "GET",
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}

export const getMarketHistoricData = (collectibleId) => {
    return fetch(`${API}/metrics/marketplace/history/${collectibleId}`, {
        method: "GET",
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log('Error is: ', err))
}