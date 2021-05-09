import { useState, useEffect } from 'react'
import Router from "next/router"
import dynamic from "next/dynamic"
import { withRouter } from "next/router"
import { getCookie, isAuth } from "../../actions/auth"
import { getCategories } from "../../actions/category"
import { getTags } from "../../actions/tag"
import { singleBlog, updateBlog } from "../../actions/blog"
import { QuillFormats, QuillModules } from "../../helpers/quill"
import { API } from "../../config"

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})

const BlogUpdate = ({ router }) => {

    const [body, setBody] = useState('')

    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])

    const [checkedCategory, setCheckedCategory] = useState([])
    const [checkedTag, setCheckedTag] = useState([])

    const [values, setValues] = useState({
        title: '',
        error: '',
        success: '',
        formData: '',
        body: ''
    })

    const { title, error, success, formData } = values
    const token = getCookie('token')

    useEffect(() => {
        setValues({...values, formData: new FormData()})
        initBlog()
        initCategories()
        initTags()
    },[router])

    const initBlog = () => {
        if (router.query.slug){
            singleBlog(router.query.slug)
                .then(data => {
                    if (data.error){
                        console.log('Error getting blog')
                    } else {
                        setValues({...values, title: data.title})
                        setBody(data.body)
                        setCategoriesArray(data.categories)
                        setTagsArray(data.tags)

                    }
                })
        }
    }

    const setCategoriesArray = blogCategories => {
        let ca = []
        blogCategories.map((category, index) => {
            ca.push(category._id)
        })
        setCheckedCategory(ca)
    }

    const setTagsArray = blogTags => {
        let ta = []
        blogTags.map((tags, index) => {
            ta.push(tags._id)
        })
        setCheckedTag(ta)
    }

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

    const findOutCategory = (categoryId) => {
        const result = checkedCategory.indexOf(categoryId)
        return result !== -1;
    }

    const findOutTag = (tagId) => {
        const result = checkedTag.indexOf(tagId)
        return result !== -1;
    }

    const showCategories = () => {
        return(
            categories && categories.map((category, index) => (
                <li key={index}>
                    <input type="checkbox" onChange={handleCategoryToggle(category._id)} checked={findOutCategory(category._id)} />
                    <label>{category.name}</label>
                </li>
            ))
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

    const showTags = () => {
        return(
            tags && tags.map((tag, index) => (
                <li key={index}>
                    <input type="checkbox" onChange={handleTagToggle(tag._id)} checked={findOutTag(tag._id)} />
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

    const handleBody = (e) => {
        setBody(e)
        formData.set('body', e)
    }

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value, formData, error: '' })
    }

    const editBlog = (e) => {
        e.preventDefault()
        updateBlog(formData, token, router.query.slug)
            .then(data => {
                if (data.error){
                    setValues({...values, error: data.error})
                } else {
                    setValues({...values, success: `Blog ${data.title} has been updated.`})
                }
            })
    }

    const updateBlogForm = () => {
        return (
            <form onSubmit={editBlog}>
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
                <button type={"submit"}>Update</button>
            </form>
        )
    }

    return(
        <>
            {showError()}
            {showSuccess()}
            {updateBlogForm()}

            <hr/>

            <h5>Categories</h5>
            {showCategories()}

            <hr/>

            <h5>Tags</h5>
            {showTags()}

            <hr/>

            <h5>Featured image</h5>
            {body && <img src={`${API}/blog/photo/${router.query.slug}`} alt={title} />}
            <small>Max size: 1mb</small>
            <label>
                Replace featured image
                <input type="file" accept="image/*" onChange={handleChange('photo')} hidden />
            </label>
        </>
    )
}

export default withRouter(BlogUpdate)