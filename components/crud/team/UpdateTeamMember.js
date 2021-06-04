import { useState, useEffect } from 'react'
import Router from "next/router"
import dynamic from "next/dynamic"
import { withRouter } from "next/router"
import { getCookie, isAuth } from "../../../actions/auth"
import { singleTeamMember, updateTeamMember } from "../../../actions/team/member"
import { QuillFormats, QuillModules } from "../../../helpers/quill"
import { API } from "../../../config"

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})

const WikiEditor = dynamic(() => import('../../../components/ui/WikiEditor'), {ssr: false})

const UpdateTeamMember = ({ router }) => {

    const [body, setBody] = useState('')

    const [values, setValues] = useState({
        name: '',
        title: '',
        vip: false,
        error: '',
        success: '',
        formData: '',
        workExperience: [],
        body: ''
    })

    const [experience, setExperience] = useState({
        company: '',
        expTitle: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const [toDateDisabled, toggleDisabled] = useState(false)

    const { company, expTitle, location, from, to, current, description } = experience;

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

    const handleExpChange = e => {
        setExperience({...experience, [e.target.name]: e.target.value})
    }

    const editTeamMember = (e) => {
        e.preventDefault()
        formData.set('experience', values.workExperience)
        updateTeamMember(formData, token, router.query.slug)
            .then(data => {
                if (data.error){
                    setValues({...values, error: data.error})
                } else {
                    setValues({...values, success: `Team member ${data.name} has been updated.`})
                }
            })
    }

    const pushExperience = (e) => {
        e.preventDefault()
        values.workExperience.push(experience)
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
                    {/*<WikiEditor value={body} handleBody={handleBody} />*/}

                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder={"Write something awesome."}
                        onChange={handleBody}
                    />
                </div>

                <div className="border p-5">
                    <h3 className={`text-2xl mt-5 mb-3`}>Experience</h3>

                    <label className={`text-xs font-medium text-gray-300 uppercase mb-2 block`}>Job Title</label>
                    <input type="text" value={expTitle} name={"expTitle"} className={`block rounded py-5 px-3 m-0  h-5 text-white bg-transparent border border-gray-700 shadow-none mb-5 w-72`} onChange={e => handleExpChange(e)} />

                    <label className={`text-xs font-medium text-gray-300 uppercase mb-2 block`}>Company</label>
                    <input type="text" value={company} name="company" className={`block rounded py-5 px-3 m-0  h-5 text-white bg-transparent border border-gray-700 shadow-none mb-5 w-72`} onChange={e => handleExpChange(e)} />

                    <label className={`text-xs font-medium text-gray-300 uppercase mb-2 block`}>Location</label>
                    <input type="text" value={location} name="location" className={`block rounded py-5 px-3 m-0  h-5 text-white bg-transparent border border-gray-700 shadow-none mb-5 w-72`} onChange={e => handleExpChange(e)} />

                    <label className={`text-xs font-medium text-gray-300 uppercase mb-2 block`}>From</label>
                    <input type="date" value={from} name="from" className={`block rounded py-5 px-3 m-0  h-5 text-white bg-transparent border border-gray-700 shadow-none mb-5 w-72`} onChange={e => handleExpChange(e)} />

                    <label className={`text-xs font-medium text-gray-300 uppercase mb-2 block`}>To</label>
                    <input type="date" value={to} name="to" className={`block rounded py-5 px-3 m-0  h-5 text-white bg-transparent border border-gray-700 shadow-none mb-5 w-72`} onChange={e => handleExpChange(e)} disabled={toDateDisabled ? 'disabled' : ''} />

                    <label className={`text-xs font-medium text-gray-300 uppercase mb-2 block`}>Current</label>
                    <input type="checkbox" value={current} name={current} checked={current} className={`w-auto rounded py-5 px-3 m-0  text-white bg-transparent border border-gray-700 shadow-none mb-5 w-72`} onChange={e => {
                        setExperience({...experience, current: !current})
                        toggleDisabled(!toDateDisabled)
                        handleExpChange(e)
                    }} /> {' '}Current Job

                    <br/>

                    <label className={`text-xs font-medium text-gray-300 uppercase mb-2 block`}>Description</label>
                    <textarea
                        name='description'
                        placeholder='Job Description'
                        value='description'
                        className={`w-full`}
                        onChange={e => handleExpChange(e)}></textarea>

                    <button className={`uppercase bg-yellow-500 font-bold text-xs px-3 py-2 text-black rounded mr-3 mb-3 inline-block mt-2`} onClick={e => pushExperience(e)}>Push Experience</button>
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
                        <div className={`border border-gray-700 p-10 rounded-md`} style={{ background: '#1E263C' }}>

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