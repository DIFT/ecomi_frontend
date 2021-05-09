import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/auth';
import { create, getTags, removeTag } from '../../actions/tag';

const Tag = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        tags: [],
        removed: false,
        reload: false
    });

    const { name, error, success, tags, removed, reload } = values;
    const token = getCookie('token');

    useEffect(() => {
        loadTags();
    }, [reload]);

    const loadTags = () => {
        getTags().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, tags: data });
            }
        });
    };

    const showTags = () => {
        return tags.map((t, i) => {
            return (
                <button
                    onClick={() => deleteConfirm(t.slug)}
                    title="Single click to delete"
                    key={i}
                >
                    {t.name}
                </button>
            );
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete this tag?');
        if (answer) {
            deleteTag(slug);
        }
    };

    const deleteTag = slug => {
        // console.log('delete', slug);
        removeTag(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, error: false, success: false, name: '', removed: !removed, reload: !reload });
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
            return <p>Tag is created</p>;
        }
    };

    const showError = () => {
        if (error) {
            return <p>Tag already exist</p>;
        }
    };

    const showRemoved = () => {
        if (removed) {
            return <p>Tag is removed</p>;
        }
    };

    const newTagFom = () => (
        <form onSubmit={clickSubmit}>
                <label>Name</label>
                <input type="text" onChange={handleChange} value={name} required />
                <button type="submit">
                    Create
                </button>
        </form>
    );

    return (
        <>
            {showSuccess()}
            {showError()}
            {showRemoved()}
            {newTagFom()}
            {showTags()}
        </>

    );

};



export default Tag;
      