import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/auth';
import { create, getCategories, removeCategory } from '../../actions/category';

const Category = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        categories: [],
        removed: false,
        reload: false
    });

    const { name, error, success, categories, removed, reload } = values;
    const token = getCookie('token');

    useEffect(() => {
        loadCategories();
    }, [success]);

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, categories: data });
            }
        });
    };

    const showCategories = () => {
        return categories.map((c, i) => {
            return (
                <button
                    onClick={() => deleteConfirm(c.slug)}
                    title="Click to delete"
                    key={i}
                >
                    {c.name}
                </button>
            );
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete this category?');
        if (answer) {
            deleteCategory(slug);
        }
    };

    const deleteCategory = slug => {
        // console.log('delete', slug);
        removeCategory(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, error: false, success: false, name: '', removed: !removed});
            }
        });
    };

    const clickSubmit = e => {
        e.preventDefault();
        // console.log('create category', name);
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
            return <p className="text-success">Category is created</p>;
        }
    };

    const showError = () => {
        if (error) {
            return <p className="text-danger">Category already exist</p>;
        }
    };

    const showRemoved = () => {
        if (removed) {
            return <p className="text-danger">Category is removed</p>;
        }
    };

    // const mouseMoveHandler = e => {
    //     setValues({ ...values, error: false, success: false, removed: '' });
    // };

    const newCategoryForm = () => (
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

            {newCategoryForm()}
            <hr/>
            {showCategories()}
        </>
    );
};

export default Category;