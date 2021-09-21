import { useState, useEffect } from 'react'
import {signin, authenticate, isAuth} from "../../actions/auth"
import Router from "next/router"
import Image from "next/image"
import { useTranslation } from 'react-i18next'

const SigninComponent = ({ setUserExists }) => {

    const { t } = useTranslation();

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
                            Router.push('/admin/dashboard')
                        } else {
                            Router.push('/user/vault/valuation')
                        }
                    })
                }
            })
    }

    const handleChange = name => (e) => {
        setValues({...values, error: false, [name]: e.target.value })
    }

    const showLoading = () => loading ? <div>{t(`signIn.loading`)}...</div> : null
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
                    <h4 className="mx-0 mt-0 mb-1 text-2xl">{t(`signIn.signIn`)}</h4>
                    <p className="mb-5 text-sm text-gray-300">
                        {t(`signIn.welcome`)}
                    </p>

                </div>

                <form onSubmit={handleSubmit} className={`mt-5`}>
                    <input value={email} type="email" placeholder={"Email"} onChange={handleChange('email')} className={`w-full block rounded-3xl py-5 px-3 m-0 w-full h-5 text-white bg-gray-800 border border-gray-700 shadow-none mb-3`} />
                    <input value={password} type="password" placeholder={"Password"} onChange={handleChange('password')} className={`w-full block rounded-3xl py-5 px-3 m-0 w-full h-5 text-white bg-gray-800 border border-gray-700 shadow-none mb-3`} />
                    {/*<ul className={`flex mb-5`}>*/}
                    {/*    <li className={`flex-1 rounded text-center p-2 text-sm bg-blue-600 mr-2`}>Facebook</li>*/}
                    {/*    <li className={`flex-1 rounded text-center p-2 text-sm bg-blue-400 mr-2`}>Twitter</li>*/}
                    {/*    <li className={`flex-1 rounded text-center p-2 text-sm bg-red-500`}>Google</li>*/}
                    {/*</ul>*/}
                    {/*<button className={`text-pink-500 block mb-5 text-right text-sm float-right`} onClick={e => {*/}
                    {/*    e.preventDefault()*/}
                    {/*    setUserExists(false)*/}
                    {/*}}>Don't have an account? Signup</button>*/}
                    {/*<br/>*/}
                    <div className="flex justify-center w-full">
                        <button type="submit" className={`text-center border border-white text-white font-base py-2 px-4 rounded-full font-semibold text-sm`}>{t(`signIn.login`)}</button>
                    </div>
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