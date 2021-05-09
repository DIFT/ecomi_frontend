import { useState, useEffect } from 'react'
import Router from "next/router"
import dynamic from "next/dynamic"
import { withRouter } from "next/router"
import { getCookie, isAuth } from "../../actions/auth"
import { getCategories } from "../../actions/category"
import { getTags } from "../../actions/tag"
import { createBlog } from "../../actions/blog"
import { QuillFormats, QuillModules } from "../../helpers/quill";

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})

const CreateBlog = ({ router }) => {

    const blogFromLS = () => {
        if (typeof window === 'undefined'){
            return false
        }

        if (localStorage.getItem('blog')){
            return JSON.parse(localStorage.getItem('blog'))
        } else {
            return false
        }
    }

    const [body, setBody] = useState(blogFromLS())
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false
    })

    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])

    const [checkedCategory, setCheckedCategory] = useState([])
    const [checkedTag, setCheckedTag] = useState([])

    useEffect(() => {
        setValues({ ...values, formData: new FormData() })
        initCategories()
        initTags()
    },[router])

    const { error, sizeError, success, formData, title, hidePublishButton } = values
    const token = getCookie('token')

    const initCategories = () => {
        getCategories()
            .then(data => {
                if (data.error){
                    setValues({...values, error: data.error})
                } else {
                    setCategories(data)
                }
            })
    }

    const initTags = () => {
        getTags()
            .then(data => {
                if (data.error){
                    setValues({...values, error: data.error})
                } else {
                    setTags(data)
                }
            })
    }

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value, formData, error: '' })
    }

    const handleBody = e => {
        setBody(e)
        formData.set('body', e)
        if (typeof window !== 'undefined'){
            localStorage.setItem('blog', JSON.stringify(e))
        }
    }

    const publishBlog = (e) => {
        e.preventDefault()
        createBlog(formData, token)
            .then(data => {
                if (data.error){
                    setValues({...values, error: data.error})
                } else {
                    setValues({...values, title: '', error: '', success: `A new blog titled "${data.title}" was created.`})
                    setBody('')
                    setCheckedCategory([])
                    setCheckedTag([])
                }
            })
    }

    const createBlogForm = () => {
        return (
            <form onSubmit={publishBlog}>
                <label>Title</label>
                <input type="text" value={title} onChange={handleChange('title')} />
                <div className="quill">
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder={"Write something awesome."}
                        onChange={handleBody}
                    />
                </div>
                <button type={"submit"}>Publish</button>
            </form>
        )
    }

    const handleCategoryToggle = (category) => () => {
        setValues({...values, error: ''})
        const clickedCategory = checkedCategory.indexOf(category)
        const all = [...checkedCategory]

        if (clickedCategory === -1){
            all.push(category)
        } else {
            all.splice(clickedCategory, 1)
        }
        setCheckedCategory(all)
        formData.set('categories', all)
    }

    const handleTagToggle = (tag) => () => {
        setValues({...values, error: ''})
        const clickedTag = checkedTag.indexOf(tag)
        const all = [...checkedTag]

        if (clickedTag === -1){
            all.push(tag)
        } else {
            all.splice(clickedTag, 1)
        }
        setCheckedTag(all)
        formData.set('tags', all)
    }

    const showCategories = () => {
        return(
            categories && categories.map((category, index) => (
                <li key={index}>
                    <input type="checkbox" onChange={handleCategoryToggle(category._id)} />
                    <label>{category.name}</label>
                </li>
            ))
        )
    }

    const showTags = () => {
        return(
            tags && tags.map((tag, index) => (
                <li key={index}>
                    <input type="checkbox" onChange={handleTagToggle(tag._id)} />
                    <label>{tag.name}</label>
                </li>
            ))
        )
    }

    const showError = () => (
        <div className={`alert`} style={{ display: error ? 'block' : 'none'}}>{error}</div>
    )

    const showSuccess = () => (
        <div className={`alert`} style={{ display: success ? 'block' : 'none'}}>{success}</div>
    )

    return(
        <>
            {showError()}
            {showSuccess()}
            {createBlogForm()}

            <hr/>

            <h5>Categories</h5>
            <ul>{showCategories()}</ul>

            <hr/>

            <h5>Tags</h5>
            <ul>{showTags()}</ul>

            <hr/>

            <h5>Featured image</h5>
            <small>Max size: 1mb</small>
            <label>
                Upload featured image
                <input type="file" accept="image/*" onChange={handleChange('photo')} hidden />
            </label>
        </>
    )
}

export default withRouter(CreateBlog)