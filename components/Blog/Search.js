import Link from "next/link";
import { API } from "../../config"
import { useState, useEffect} from 'react'
import { listSearch } from "../../actions/blog"

const Search = () => {

    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    })

    const { search, results, searched, message} = values

    const searchSubmit = (e) => {
        e.preventDefault()
        listSearch({search})
            .then(data => {
                setValues({
                    ...values,
                    results: data,
                    searched: true,
                    message: `${data.length} blogs found`
                })
            })
    }

    const handleChange = (e) => {
        setValues({...values, search: e.target.value, searched: false, results: []})
    }

    const searchedBlogs = (results = []) => {
        return (
            <>
                {message && <small>{message}</small>}
                {results.map((blog, index) => (
                    <li key={index}>
                        <Link href={`/blogs/${blog.slug}`}>
                            <a>{blog.title}</a>
                        </Link>
                    </li>
                ))}
            </>
        )
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <input type="text" placeholder={"Search..."} onChange={handleChange} />
            <button type={"submit"}>Search</button>
        </form>
    )

    return(
        <>
            <h1>Search form</h1>
            {searchForm()}
            {searched && <>{searchedBlogs(results)}</>}
        </>
    )
}

export default Search