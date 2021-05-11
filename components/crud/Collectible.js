import { useState, useEffect } from 'react'
import Router from "next/router"
import dynamic from "next/dynamic"
import { withRouter } from "next/router"
import { getCookie, isAuth } from "../../actions/auth"
import { getBrands } from "../../actions/brand";
import { getLicenses } from "../../actions/license";
import { createCollectible } from "../../actions/collectible"
import { QuillFormats, QuillModules } from "../../helpers/quill";

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})

const CreateCollectible = ({ router }) => {

    const collectibleFromLS = () => {
        if (typeof window === 'undefined'){
            return false
        }

        if (localStorage.getItem('collectible')){
            return JSON.parse(localStorage.getItem('collectible'))
        } else {
            return false
        }
    }

    const [body, setBody] = useState(collectibleFromLS())
    const [values, setValues] = useState({
        error: '',
        success: '',
        formData: '',
        title: '',
        veveImage: '',
        eiImage: '',
        dropDate: '',
        listPrice: '',
        rarity: '',
        editions: '',
        editionType: '',
        series: '',
        hidePublishButton: false
    })

    const [brands, setBrands] = useState([])
    const [licenses, setLicenses] = useState([])

    const [checkedBrand, setCheckedBrand] = useState([])
    const [checkedLicense, setCheckedLicense] = useState([])

    useEffect(() => {
        setValues({ ...values, formData: new FormData() })
        initBrands()
        initLicenses()
    },[router])

    const {
        error,
        success,
        formData,
        title,
        veveImage,
        eiImage,
        dropDate,
        listPrice,
        rarity,
        editions,
        editionType,
        series,
        hidePublishButton
    } = values

    const token = getCookie('token')

    const initBrands = () => {
        getBrands()
            .then(data => {
                if (data.error){
                    setValues({...values, error: data.error})
                } else {
                    setBrands(data)
                }
            })
    }

    const initLicenses = () => {
        getLicenses()
            .then(data => {
                if (data.error){
                    setValues({...values, error: data.error})
                } else {
                    setLicenses(data)
                }
            })
    }

    const handleChange = name => e => {
        const value = e.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value, formData, error: '' })
    }

    const handleBody = e => {
        setBody(e)
        formData.set('body', e)
        if (typeof window !== 'undefined'){
            localStorage.setItem('collectible', JSON.stringify(e))
        }
    }

    const publishCollectible = (e) => {
        e.preventDefault()
        createCollectible(formData, token)
            .then(data => {
                if (data.error){
                    setValues({...values, error: data.error})
                } else {
                    setValues({...values, title: '', error: '', success: `A new collectible titled "${data.title}" was created.`})
                    setBody('')
                    setCheckedBrand([])
                    setCheckedLicense([])
                }
            })
    }

    const createCollectibleForm = () => {
        return (
            <form onSubmit={publishCollectible}>
                <label className={`block mt-3 text-lg`}>Title</label>
                <input type="text" className={`border`} value={title} onChange={handleChange('title')} />

                <label className={`block mt-3 text-lg`}>VEVE Image</label>
                <input type="text" className={`border`} value={veveImage} onChange={handleChange('veveImage')} />

                <label className={`block mt-3 text-lg`}>EI Image</label>
                <input type="text" className={`border`} value={eiImage} onChange={handleChange('eiImage')} />

                <label className={`block mt-3 text-lg`}>Drop date</label>
                <input type="date" className={`border`} value={dropDate} onChange={handleChange('dropDate')} />

                <label className={`block mt-3 text-lg`}>List Price</label>
                <input type="text" className={`border`} value={listPrice} onChange={handleChange('listPrice')} />

                <label className={`block mt-3 text-lg`}>Rarity</label>
                <input type="text" className={`border`} value={rarity} onChange={handleChange('rarity')} />

                <label className={`block mt-3 text-lg`}>Editions</label>
                <input type="text" className={`border`} value={editions} onChange={handleChange('editions')} />

                <label className={`block mt-3 text-lg`}>Editon Type</label>
                <input type="text" className={`border`} value={editionType} onChange={handleChange('editionType')} />

                <label className={`block mt-3 text-lg`}>Series</label>
                <input type="text" className={`border`} value={series} onChange={handleChange('series')} />

                <div className="quill">
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder={"Write something awesome."}
                        onChange={handleBody}
                    />
                </div>
                <button type={"submit"} className={`border block p-3 bg-blue-200`}>Publish</button>
            </form>
        )
    }

    const handleCategoryToggle = (category) => () => {
        setValues({...values, error: ''})
        const clickedCategory = checkedBrand.indexOf(category)
        const all = [...checkedBrand]

        if (clickedCategory === -1){
            all.push(category)
        } else {
            all.splice(clickedCategory, 1)
        }
        setCheckedBrand(all)
        formData.set('brand', all)
    }

    const handleTagToggle = (tag) => () => {
        setValues({...values, error: ''})
        const clickedTag = checkedLicense.indexOf(tag)
        const all = [...checkedLicense]

        if (clickedTag === -1){
            all.push(tag)
        } else {
            all.splice(clickedTag, 1)
        }
        setCheckedLicense(all)
        formData.set('license', all)
    }

    const showBrands = () => {
        return(
            brands && brands.map((brand, index) => (
                <li key={index}>
                    <input type="checkbox" onChange={handleCategoryToggle(brand._id)} />
                    <label>{brand.name}</label>
                </li>
            ))
        )
    }

    const showLicenses = () => {
        return(
            licenses && licenses.map((license, index) => (
                <li key={index}>
                    <input type="checkbox" onChange={handleTagToggle(license._id)} />
                    <label>{license.name}</label>
                </li>
            ))
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
            {createCollectibleForm()}

            <hr/>

            <h5>Brands</h5>
            <ul>{showBrands()}</ul>

            <hr/>

            <h5>Licenses</h5>
            <ul>{showLicenses()}</ul>
        </>
    )
}

export default withRouter(CreateCollectible)