import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/auth';
import { create, getBrands, removeBrand } from '../../actions/brand';
import { getLicenses } from "../../actions/license";

const Brand = ({ router }) => {

    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        formData: new FormData(),
        brands: [],
        removed: false,
        reload: false
    });

    const [licenses, setLicenses] = useState([])
    const [checkedLicense, setCheckedLicense] = useState([])

    useEffect(() => {
        setValues({ ...values, formData: new FormData() })
        initLicenses()
        loadBrands();
    },[router])

    const { name, error, success, formData, brands, removed, reload } = values;
    const token = getCookie('token');

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

    const showLicenses = () => {
        return(
            licenses && licenses.map((license, index) => (
                <li key={index}>
                    <input type="checkbox" onChange={handleLicenseToggle(license._id)} />
                    <label>{license.name}</label>
                </li>
            ))
        )
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

    const loadBrands = () => {
        getBrands().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, brands: data });
            }
        });
    };

    const showBrands = () => {
        return brands.map((c, i) => {
            return (
                <li>
                    <button
                        onClick={() => deleteConfirm(c.slug)}
                        title="Click to delete"
                        key={i}
                    >
                        {c.name}
                    </button>
                </li>
            );
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete this brand?');
        if (answer) {
            deleteBrand(slug);
        }
    };

    const deleteBrand = slug => {
        // console.log('delete', slug);
        removeBrand(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, error: false, success: false, name: '', removed: !removed});
            }
        });
    };

    const clickSubmit = e => {
        e.preventDefault();
        // console.log('create brand', name);
        create({ name }, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({ ...values, error: false, success: true, name: '', removed: false, reload: !reload });
            }
        });
    };

    const handleChange = e => {
        setValues({ ...values, name: e.target.value, error: false, success: false, removed: '' });
    };

    const showSuccess = () => {
        if (success) {
            return <p className="text-success">Brand is created</p>;
        }
    };

    const showError = () => {
        if (error) {
            return <p className="text-danger">Brand already exist</p>;
        }
    };

    const showRemoved = () => {
        if (removed) {
            return <p className="text-danger">Brand is removed</p>;
        }
    };

    // const mouseMoveHandler = e => {
    //     setValues({ ...values, error: false, success: false, removed: '' });
    // };

    const newBrandForm = () => (
        <form onSubmit={clickSubmit}>
            <label>Name</label>
            <input type="text" onChange={handleChange} value={name} required />
            <div>
                <button type="submit">
                    Create Brand
                </button>
            </div>
        </form>
    );

    return (
        <>
            {showSuccess()}
            {showError()}
            {showRemoved()}

            {newBrandForm()}

            <h5 className={`text-lg font-bold mt-5`}>Licenses</h5>
            <ul>{showLicenses()}</ul>

            <hr/>
            <h5 className={`text-lg font-bold mt-5`}>Existing Brands</h5>
            <ul>
                {showBrands()}
            </ul>
        </>
    );
};

export default Brand;