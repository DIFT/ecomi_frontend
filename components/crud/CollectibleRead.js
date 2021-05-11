import Link from 'next/link'
import { useState, useEffect } from 'react'
import Router from "next/router"
import moment from "moment"
import { getCookie, isAuth } from "../../actions/auth"
import { getCategories } from "../../actions/category"
import { getTags } from "../../actions/tag"
import { list, removeCollectible } from "../../actions/collectible"

const CollectibleRead = () => {

    const [collectibles, setCollectibles] = useState([])
    const [message, setMessage] = useState('')
    const token = getCookie('token')

    useEffect(() => {
        loadCollectibles()
    },[])

    const loadCollectibles = () => {
        list()
            .then((data) => {
                if (data.error){
                    console.log('Error loading collectibles: ', data.error)
                } else {
                    setCollectibles(data)
                }
            })
    }

    const deleteCollectible = (slug) => {
        removeCollectible(slug, token)
            .then(data => {
                if (data.error){
                    console.log('Error deleting collectible: ', data.error)
                } else {
                    setMessage(data.message)
                    loadCollectibles()
                }
            })
    }

    const deleteConfirm = (slug) => {
        let answer = window.confirm('Are you sure you want to delete this?')
        if (answer){
            deleteCollectible(slug)
        }
    }

    const showUpdateButton = (collectible) => {
        if(isAuth() && isAuth().role === 0){
            return (
                <a href={`/user/collectibles/${collectible.slug}`}>Update</a>
            )
        } else if (isAuth() && isAuth().role === 1){
            return(
                <a href={`/admin/collectibles/${collectible.slug}`}>Update</a>
            )
        }
    }

    const showAllCollectibles = () => {
        return collectibles.map((collectible, index) => {
            return (
                <li key={index}>
                    <h3>{collectible.title}</h3>
                    <small>Published {moment(collectible.updatedAt).fromNow()}</small>
                    <button onClick={() => deleteConfirm(collectible.slug)}>Delete</button>
                    {showUpdateButton(collectible)}
                </li>
            )
        })
    }

    return(
        <>
            <h5>Update/Delete collectibles</h5>
            {message && <div>{message}</div>}
            <ul>{showAllCollectibles()}</ul>
        </>
    )
}

export default CollectibleRead