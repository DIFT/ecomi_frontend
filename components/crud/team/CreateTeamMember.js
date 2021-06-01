import { useState, useEffect } from 'react'
import Router from "next/router"
import dynamic from "next/dynamic"
import { withRouter } from "next/router"
import { getCookie, isAuth } from "../../../actions/auth"
import { createTeamMember } from "../../../actions/team/member"
import { QuillFormats, QuillModules } from "../../../helpers/quill";

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})

const CreateTeamMember = ({ router }) => {

    const teamMemberFromLS = () => {
        if (typeof window === 'undefined'){
            return false
        }

        if (localStorage.getItem('member')){
            return JSON.parse(localStorage.getItem('member'))
        } else {
            return false
        }
    }

    const [body, setBody] = useState(teamMemberFromLS())
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        name: '',
        hidePublishButton: false
    })


    useEffect(() => {
        setValues({ ...values, formData: new FormData() })
    },[router])

    const { error, sizeError, success, formData, title, name, hidePublishButton } = values
    const token = getCookie('token')

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value, formData, error: '' })
    }

    const handleBody = e => {
        setBody(e)
        formData.set('body', e)
        if (typeof window !== 'undefined'){
            localStorage.setItem('member', JSON.stringify(e))
        }
    }

    const publishTeamMember = (e) => {
        e.preventDefault()
        createTeamMember(formData, token)
            .then(data => {
                console.log('data return is' ,data)
                if (data.error){
                    setValues({...values, error: data.error})
                } else {
                    setValues({...values, name: '', title: '', error: '', success: `A new member called "${data.name}" was created.`})
                    setBody('')
                }
            })
            .catch(err => console.log('Error creating team member: ', err))
    }

    const createTeamMemberForm = () => {
        return (
            <form onSubmit={publishTeamMember}>

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

                <button type={"submit"}>Publish</button>
            </form>
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
            {createTeamMemberForm()}

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

export default withRouter(CreateTeamMember)