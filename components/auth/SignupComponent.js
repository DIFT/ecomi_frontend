import { useEffect, useState } from 'react'
import { isAuth, signup } from "../../actions/auth";
import Link from "next/link"
import Router from "next/router";
import Image from "next/image";

const SignupComponent = ({setUserExists}) => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })

    const { name, email, password, error, loading, message, showForm } = values

    useEffect(() => {
        isAuth() && Router.push('/')
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setValues({...values, loading: true, error: false})
        const user = { name, email, password }

        signup(user)
            .then(data => {
              if (data.error){
                  setValues({
                      ...values,
                      error: data.error
                  })
              } else {
                  setValues({
                      ...values,
                      name: '',
                      email: '',
                      password: '',
                      error: '',
                      loading: false,
                      message: data.message,
                      showForm: false
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


    const signupForm = () => {
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
                    <h4 className="mx-0 mt-0 mb-1 text-4xl">Sign Up</h4>
                    <p className="mb-5 text-gray-300">
                        This site is free to use but please be respectful to all other members of this site.
                    </p>

                </div>

                <form onSubmit={handleSubmit}>
                    <ul className={`flex mb-5`}>
                        <li className={`flex-1 rounded text-center p-2 text-sm bg-blue-600 mr-2`}>Facebook</li>
                        <li className={`flex-1 rounded text-center p-2 text-sm bg-blue-400 mr-2`}>Twitter</li>
                        <li className={`flex-1 rounded text-center p-2 text-sm bg-red-500`}>Google</li>
                    </ul>
                    <input value={name} type="text" placeholder={"VEVE Username"} onChange={handleChange('name')} className={`w-full block rounded py-5 px-3 m-0 w-full h-5 text-white bg-transparent border border-gray-700 shadow-none mb-3`} />
                    <input value={email} type="email" placeholder={"Email"} onChange={handleChange('email')} className={`w-full block rounded py-5 px-3 m-0 w-full h-5 text-white bg-transparent border border-gray-700 shadow-none mb-3`} />
                    <input value={password} type="password" placeholder={"Password"} onChange={handleChange('password')} className={`w-full block rounded py-5 px-3 m-0 w-full h-5 text-white bg-transparent border border-gray-700 shadow-none mb-5`} />
                    <button className={`text-yellow-500 block mb-5 text-right text-sm float-right`} onClick={e => {
                        e.preventDefault()
                        setUserExists(true)
                    }}>Already have an account? Login</button>
                    <button type="submit" className={`w-full rounded block font-medium text-center p-2 bg-yellow-500 text-black`}>Signup</button>
                </form>
            </>
        )
    }
    return(
        <>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signupForm()}
        </>
    )
}

export default SignupComponent