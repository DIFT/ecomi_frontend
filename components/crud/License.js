import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/auth';
import { create, getLicenses, removeLicense } from '../../actions/license';
import { getBrands } from "../../actions/brand";

const License = ({ router }) => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        formData: '',
        license: [],
        removed: false,
        reload: false
    });

    const [brands, setBrands] = useState([])
    const [checkedBrand, setCheckedBrand] = useState([])

    const { name, error, success, formData, license, removed, reload } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() })
        initBrands()
        loadLicenses();
    },[router])

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

    const showBrands = () => {
        return(
            brands && brands.map((brand, index) => (
                <li key={index}>
                    <input type="checkbox" onChange={handleBrandToggle(brand._id)} />
                    <label>{brand.name}</label>
                </li>
            ))
        )
    }

    const loadLicenses = () => {
        getLicenses().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, license: data });
            }
        });
    };


    const showLicenses = () => {
        return license.map((c, i) => {
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
        let answer = window.confirm('Are you sure you want to delete this license?');
        if (answer) {
            deleteLicense(slug);
        }
    };

    const deleteLicense = slug => {
        // console.log('delete', slug);
        removeLicense(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, error: false, success: false, name: '', removed: !removed});
            }
        });
    };

    const clickSubmit = e => {
        e.preventDefault();
        // console.log('create license', name);
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
            return <p className="text-success">License is created</p>;
        }
    };

    const showError = () => {
        if (error) {
            return <p className="text-danger">License already exist</p>;
        }
    };

    const showRemoved = () => {
        if (removed) {
            return <p className="text-danger">License is removed</p>;
        }
    };

    // const mouseMoveHandler = e => {
    //     setValues({ ...values, error: false, success: false, removed: '' });
    // };

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

    const newLicenseForm = () => (
        <form onSubmit={clickSubmit}>
            <label>Name</label>
            <input type="text" onChange={handleChange} value={name} required />
            <div>
                <button type="submit">
                    Create
                </button>
            </div>
        </form>
    );

    return (
        <>
            {showSuccess()}
            {showError()}
            {showRemoved()}

            {newLicenseForm()}

            <h5 className={`text-lg font-bold mt-5`}>Brands</h5>
            <ul>{showBrands()}</ul>

            <hr/>
            <h5 className={`text-lg font-bold mt-5`}>Existing licenses</h5>
            <ul>{showLicenses()}</ul>
        </>
    );
};

export default License;