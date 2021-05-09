import { useEffect, useState } from 'react'
import { isAuth, signup } from "../../actions/auth";
import Router from "next/router";

const SignupComponent = () => {

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
            <form onSubmit={handleSubmit}>
                <input value={name} type="text" placeholder={"Your name"} onChange={handleChange('name')} />
                <input value={email} type="email" placeholder={"Your email"} onChange={handleChange('email')} />
                <input value={password} type="password" placeholder={"Your password"} onChange={handleChange('password')} />

                <button type="submit">Signup</button>
            </form>
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