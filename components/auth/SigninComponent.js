import { useState, useEffect } from 'react'
import {signin, authenticate, isAuth} from "../../actions/auth";
import Router from "next/router";

const SigninComponent = () => {

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
            <form onSubmit={handleSubmit}>
                <input value={email} type="email" placeholder={"Your email"} onChange={handleChange('email')} />
                <input value={password} type="password" placeholder={"Your password"} onChange={handleChange('password')} />

                <button type="submit">Signin</button>
            </form>
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