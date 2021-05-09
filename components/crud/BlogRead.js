import Link from 'next/link'
import { useState, useEffect } from 'react'
import Router from "next/router"
import moment from "moment"
import { getCookie, isAuth } from "../../actions/auth"
import { getCategories } from "../../actions/category"
import { getTags } from "../../actions/tag"
import { list, removeBlog } from "../../actions/blog"

const BlogRead = () => {

    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState('')
    const token = getCookie('token')

    useEffect(() => {
        loadBlogs()
    },[])

    const loadBlogs = () => {
        list()
            .then((data) => {
                if (data.error){
                    console.log('Error loading blogs: ', data.error)
                } else {
                    setBlogs(data)
                }
            })
    }

    const deleteBlog = (slug) => {
        removeBlog(slug, token)
            .then(data => {
                if (data.error){
                    console.log('Error deleting blog: ', data.error)
                } else {
                    setMessage(data.message)
                    loadBlogs()
                }
            })
    }

    const deleteConfirm = (slug) => {
        let answer = window.confirm('Are you sure you want to delete this?')
        if (answer){
            deleteBlog(slug)
        }
    }

    const showUpdateButton = (blog) => {
        if(isAuth() && isAuth().role === 0){
            return (
                <a href={`/user/crud/${blog.slug}`}>Update</a>
            )
        } else if (isAuth() && isAuth().role === 1){
            return(
                <a href={`/admin/crud/${blog.slug}`}>Update</a>
            )
        }
    }

    const showAllBlogs = () => {
        return blogs.map((blog, index) => {
            return (
                <li key={index}>
                    <h3>{blog.title}</h3>
                    <small>Written by {blog.author.name} | Published {moment(blog.updatedAt).fromNow()}</small>
                    <button onClick={() => deleteConfirm(blog.slug)}>Delete</button>
                    {showUpdateButton(blog)}
                </li>
            )
        })
    }

    return(
        <>
            <h5>Update/Delete blogs</h5>
            {message && <div>{message}</div>}
            <ul>{showAllBlogs()}</ul>
        </>
    )
}

export default BlogRead