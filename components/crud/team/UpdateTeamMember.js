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
        vip: false,
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
                        setValues({...values, name: data.name, title: data.title, vip: data.vip })
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

                <label className={`text-xs font-medium text-gray-300 uppercase mb-2 block`}>Name</label>
                <input type="text" value={name} className={`block rounded py-5 px-3 m-0  h-5 text-white bg-transparent border border-gray-700 shadow-none mb-5 w-72`} onChange={handleChange('name')} />

                <label className={`text-xs font-medium text-gray-300 uppercase mb-2 block`}>Title</label>
                <input type="text" value={title} className={`block rounded py-5 px-3 m-0  h-5 text-white bg-transparent border border-gray-700 shadow-none mb-5 w-72`} onChange={handleChange('title')} />

                {body && <img src={`${API}/team/photo/${router.query.slug}`} alt={title} width={`200`} />}
                <small className={`block mt-2`}>Max size: 1mb</small>
                <label className={`uppercase bg-yellow-500 font-bold text-xs px-3 py-2 rounded mr-3 mb-3 inline-block mt-2 cursor-pointer`}>
                    Replace featured image
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
                <button type={"submit"} className={`uppercase bg-pink-600 font-bold text-xs px-3 py-2 rounded mr-3 mb-3 inline-block mt-2`}>Update</button>
            </form>
        )
    }

    return(
        <>
            <div className="flex flex-col">
                <div className="py-2 align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden">
                        <div className={`border border-gray-700 p-10 rounded-md bg-opacity-80 bg-gray-900`}>

                            {showError()}
                            {showSuccess()}
                            {updateTeamMemberForm()}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(UpdateTeamMember)