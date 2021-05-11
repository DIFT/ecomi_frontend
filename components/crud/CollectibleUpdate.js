import { useState, useEffect } from 'react'
import Router from "next/router"
import dynamic from "next/dynamic"
import { withRouter } from "next/router"
import { getCookie, isAuth } from "../../actions/auth"
import { getBrands } from "../../actions/brand"
import { getLicenses } from "../../actions/license"
import { singleCollectible, updateCollectible } from "../../actions/collectible"
import { QuillFormats, QuillModules } from "../../helpers/quill"
import { API } from "../../config"

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})

const CollectibleUpdate = ({ router }) => {

    const [body, setBody] = useState('')

    const [brands, setBrands] = useState([])
    const [licenses, setLicenses] = useState([])

    const [checkedBrand, setCheckedBrand] = useState([])
    const [checkedLicense, setCheckedLicense] = useState([])

    const [values, setValues] = useState({
        title: '',
        veveImage: '',
        eiImage: '',
        dropDate: '',
        listPrice: '',
        rarity: '',
        editions: '',
        editionType: '',
        series: '',
        error: '',
        success: '',
        formData: '',
        body: ''
    })

    // const { title, error, success, formData } = values

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
    } = values

    const token = getCookie('token')

    useEffect(() => {
        setValues({...values, formData: new FormData()})
        initCollectible()
        initBrands()
        initLicenses()
    },[router])

    const initCollectible = () => {
        if (router.query.slug){
            singleCollectible(router.query.slug)
                .then(data => {
                    if (data.error){
                        console.log('Error getting collectible')
                    } else {
                        setValues({
                            ...values,
                            title: data.title,
                            veveImage: data.veveImage,
                            eiImage: data.eiImage,
                            dropDate: data.dropDate,
                            listPrice: data.listPrice,
                            rarity: data.rarity,
                            editions: data.editions,
                            editionType: data.editionType,
                            series: data.series,
                        })
                        setBody(data.body)
                        setBrandsArray(data.brand)
                        setLicensesArray(data.license)

                    }
                })
        }
    }

    const setBrandsArray = collectibleBrands => {
        let ca = []
        collectibleBrands.map((brand, index) => {
            ca.push(brand._id)
        })
        setCheckedBrand(ca)
    }

    const setLicensesArray = collectibleLicenses => {
        let ta = []
        collectibleLicenses.map((licenses, index) => {
            ta.push(licenses._id)
        })
        setCheckedLicense(ta)
    }

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

    const findOutBrand = (brandId) => {
        const result = checkedBrand.indexOf(brandId)
        return result !== -1;
    }

    const findOutLicense = (licenseId) => {
        const result = checkedLicense.indexOf(licenseId)
        return result !== -1;
    }

    const showBrands = () => {
        return(
            brands && brands.map((brand, index) => (
                <li key={index}>
                    <input type="checkbox" onChange={handleBrandToggle(brand._id)} checked={findOutBrand(brand._id)} />
                    <label>{brand.name}</label>
                </li>
            ))
        )
    }

    const handleBrandToggle = (brand) => () => {
        setValues({...values, error: ''})
        const clickedBrand = checkedBrand.indexOf(brand)
        const all = [...checkedBrand]

        if (clickedBrand === -1){
            all.push(brand)
        } else {
            all.splice(clickedBrand, 1)
        }
        setCheckedBrand(all)
        formData.set('brand', all)
    }

    const handleLicenseToggle = (license) => () => {
        setValues({...values, error: ''})
        const clickedLicense = checkedLicense.indexOf(license)
        const all = [...checkedLicense]

        if (clickedLicense === -1){
            all.push(license)
        } else {
            all.splice(clickedLicense, 1)
        }
        setCheckedLicense(all)
        formData.set('license', all)
    }

    const showLicenses = () => {
        return(
            licenses && licenses.map((license, index) => (
                <li key={index}>
                    <input type="checkbox" onChange={handleLicenseToggle(license._id)} checked={findOutLicense(license._id)} />
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

    const handleBody = (e) => {
        setBody(e)
        formData.set('body', e)
    }

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value, formData, error: '' })
    }

    const editCollectible = (e) => {
        e.preventDefault()
        updateCollectible(formData, token, router.query.slug)
            .then(data => {
                if (data.error){
                    setValues({...values, error: data.error})
                } else {
                    setValues({...values, success: `Collectible ${data.title} has been updated.`})
                }
            })
    }

    const updateCollectibleForm = () => {
        return (
            <form onSubmit={editCollectible}>

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
                <button type={"submit"}>Update</button>
            </form>
        )
    }

    return(
        <>
            {showError()}
            {showSuccess()}
            {updateCollectibleForm()}

            <hr/>

            <h5>Brands</h5>
            {showBrands()}

            <hr/>

            <h5>Licenses</h5>
            {showLicenses()}

            <hr/>
        </>
    )
}

export default withRouter(CollectibleUpdate)