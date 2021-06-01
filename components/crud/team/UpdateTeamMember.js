import { useState, useEffect } from 'react'
import Router from "next/router"
import dynamic from "next/dynamic"
import { withRouter } from "next/router"
import { getCookie, isAuth } from "../../../actions/auth"
import { singleTeamMember, updateTeamMember } from "../../../actions/team/member"
import { QuillFormats, QuillModules } from "../../../helpers/quill"
import { API } from "../../../config"

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})

const UpdateTeamMember = ({ router }) => {

    const [body, setBody] = useState('')

    const [values, setValues] = useState({
        name: '',
        title: '',
        error: '',
        success: '',
        formData: '',
        body: ''
    })

    const { name, title, error, success, formData } = values
    const token = getCookie('token')

    useEffect(() => {
        setValues({...values, formData: new FormData()})
        initMember()
    },[router])

    const initMember = () => {
        if (router.query.slug){
            singleTeamMember(router.query.slug)
                .then(data => {
                    if (data.error){
                        console.log('Error getting blog')
                    } else {
                        setValues({...values, name: data.name, title: data.title })
                        setBody(data.body)
                    }
                })
        }
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

    const editTeamMember = (e) => {
        e.preventDefault()
        updateTeamMember(formData, token, router.query.slug)
            .then(data => {
                if (data.error){
                    setValues({...values, error: data.error})
                } else {
                    setValues({...values, success: `Team member ${data.name} has been updated.`})
                }
            })
    }

    const updateTeamMemberForm = () => {
        return (
            <form onSubmit={editTeamMember}>

                <label>Name</label>
                <input type="text" value={name} onChange={handleChange('name')} />

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
            {updateTeamMemberForm()}

            <hr/>

            <h5>Featured image</h5>
            {body && <img src={`${API}/team/photo/${router.query.slug}`} alt={title} />}
            <small>Max size: 1mb</small>
            <label>
                Replace featured image
                <input type="file" accept="image/*" onChange={handleChange('photo')} hidden />
            </label>
        </>
    )
}

export default withRouter(UpdateTeamMember)