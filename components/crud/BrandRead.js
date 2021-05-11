import Link from 'next/link'
import { useState, useEffect } from 'react'
import Router from "next/router"
import moment from "moment"
import { getCookie, isAuth } from "../../actions/auth"
import { getBrands, removeBrand } from "../../actions/brand"

const BrandRead = () => {

    const [brands, setBrands] = useState([])
    const [message, setMessage] = useState('')
    const token = getCookie('token')

    useEffect(() => {
        loadBrands()
    },[])

    const loadBrands = () => {
        getBrands()
            .then((data) => {
                if (data.error){
                    console.log('Error loading brands: ', data.error)
                } else {
                    setBrands(data)
                }
            })
    }

    const deleteBrand = (slug) => {
        removeBrand(slug, token)
            .then(data => {
                if (data.error){
                    console.log('Error deleting brand: ', data.error)
                } else {
                    setMessage(data.message)
                    loadBrands()
                }
            })
    }

    const deleteConfirm = (slug) => {
        let answer = window.confirm('Are you sure you want to delete this?')
        if (answer){
            deleteBrand(slug)
        }
    }

    const showUpdateButton = (brand) => {
        if(isAuth() && isAuth().role === 0){
            return (
                <a href={`/user/brands/${brand.slug}`}>Update</a>
            )
        } else if (isAuth() && isAuth().role === 1){
            return(
                <a href={`/admin/brands/${brand.slug}`}>Update</a>
            )
        }
    }

    const showAllBrands = () => {
        return brands.map((brand, index) => {
            return (
                <li key={index}>
                    <h3>{brand.title}</h3>
                    <small>Published {moment(brand.updatedAt).fromNow()}</small>
                    <button onClick={() => deleteConfirm(brand.slug)}>Delete</button>
                    {showUpdateButton(brand)}
                </li>
            )
        })
    }

    return(
        <>
            <h5>Update/Delete brands</h5>
            {message && <div>{message}</div>}
            <ul>{showAllBrands()}</ul>
        </>
    )
}

export default BrandRead