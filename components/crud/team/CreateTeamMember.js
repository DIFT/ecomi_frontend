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

                <label className={`text-xs font-medium text-gray-300 uppercase mb-2 block`}>Name</label>
                <input type="text" value={name} onChange={handleChange('name')} className={`block rounded py-5 px-3 m-0  h-5 text-white bg-transparent border border-gray-700 shadow-none mb-5 w-72`} />

                <label className={`text-xs font-medium text-gray-300 uppercase mb-2 block`}>Job title</label>
                <input type="text" value={title} onChange={handleChange('title')} className={` block rounded py-5 px-3 m-0 h-5 text-white bg-transparent border border-gray-700 shadow-none mb-5 w-72`} />

                <h5>Featured image</h5>
                <small className={`block mt-2`}>Max size: 1mb</small>
                <label className={`uppercase bg-yellow-500 font-bold text-xs px-3 py-2 rounded mr-3 mb-3 inline-block mt-2 cursor-pointer`}>
                    Upload featured image
                    <input type="file" accept="image/*" onChange={handleChange('photo')} hidden />
                </label>

                <div className="quill">
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder={"Write something awesome."}
                        onChange={handleBody}
                    />
                </div>



                <button type={"submit"} className={`uppercase bg-pink-600 font-bold text-xs px-3 py-2 rounded mr-3 mb-3 inline-block mt-2`}>Publish</button>
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
            <div className="flex flex-col">
                <div className="py-2 align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden">

                        <div className={`border border-gray-700 p-10 rounded-md bg-opacity-80 bg-gray-900`}>

                            {showError()}
                            {showSuccess()}
                            {createTeamMemberForm()}

                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}

export default withRouter(CreateTeamMember)