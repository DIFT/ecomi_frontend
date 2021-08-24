import { useState, useEffect } from 'react'
import {signin, authenticate, isAuth} from "../../actions/auth"
import Router from "next/router"
import Image from "next/image"

const SigninComponent = ({ setUserExists }) => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })

    const { email, password, error, loading, message, showForm } = values

    useEffect(() => {
        isAuth() && Router.push('/')
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setValues({...values, loading: true, error: false})
        const user = { email, password }

        signin(user)
            .then(data => {
                if (data.error){
                    setValues({
                        ...values,
                        error: data.error
                    })
                } else {
                    authenticate(data, () => {
                        if (isAuth() && isAuth().role === 1){
                            Router.push('/admin')
                        } else {
                            Router.push('/user')
                        }
                    })
                }
            })
    }

    const handleChange = name => (e) => {
        setValues({...values, error: false, [name]: e.target.value })
    }

    const showLoading = () => loading ? <div>Loading...</div> : null
    const showError = () => error ? <div>{error}</div> : null
    const showMessage = () => message ? <div>{message}</div> : null


    const signinForm = () => {
        return(
            <>
                <div className="text-center mb-5">
                    <Image
                        src={`/assets/images/ecomi-art.png`}
                        alt="Ecomi Investors logo"
                        width={200}
                        height={163}
                    />
                </div>

                <div className="text-center text-white">
                    <h4 className="mx-0 mt-0 mb-1 text-4xl">Sign in</h4>
                    <p className="m-0 text-gray-300">
                        Alright you're free to sign up, but you'll need to prove yourself to become a
                        boss.
                    </p>

                </div>

                <form onSubmit={handleSubmit} className={`mt-5`}>
                    <input value={email} type="email" placeholder={"Email"} onChange={handleChange('email')} className={`w-full block rounded py-5 px-3 m-0 w-full h-5 text-white bg-transparent border border-gray-700 shadow-none mb-3`} />
                    <input value={password} type="password" placeholder={"Password"} onChange={handleChange('password')} className={`w-full block rounded py-5 px-3 m-0 w-full h-5 text-white bg-transparent border border-gray-700 shadow-none mb-5`} />
                    <ul className={`flex mb-5`}>
                        <li className={`flex-1 rounded text-center p-2 text-sm bg-blue-600 mr-2`}>Facebook</li>
                        <li className={`flex-1 rounded text-center p-2 text-sm bg-blue-400 mr-2`}>Twitter</li>
                        <li className={`flex-1 rounded text-center p-2 text-sm bg-red-500`}>Google</li>
                    </ul>
                    <a className={`text-yellow-500 block mb-5 text-right text-sm float-right`} onClick={e => {
                        e.preventDefault()
                        setUserExists(false)
                    }}>Don't have an account? Signup</a>
                    <button type="submit" className={`w-full rounded block font-medium text-center p-2 bg-yellow-500 text-black`}>Login</button>
                </form>
            </>
        )
    }
    return(
        <>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}
        </>
    )
}

export default SigninComponent