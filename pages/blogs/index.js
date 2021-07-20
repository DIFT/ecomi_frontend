import Head from "next/head"
import Link from "next/link"
import { withRouter } from 'next/router'
import Default from "../../templates/Default"
import { useState } from 'react'
import { listBlogsWithCategoriesAndTags } from "../../actions/blog"
import renderHTML from 'react-render-html'
import moment from "moment";
import NewsCard from "../../components/Blog/NewsCard"
import { API, DOMAIN, APP_NAME } from '../../config'

const Blogs = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogsOffset, router }) => {

    const head = () => (
        <Head>
            <title>Lab | {APP_NAME}</title>

            <meta name={"description"} content={"Experiments with code"} />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property={"og:title"} content={`Lab | ${APP_NAME}`} />
            <meta property={"og:description"} content={"Experiments with code"} />
            <meta property={"og:type"} content="website" />
            <meta property={"og:url"} content={`${DOMAIN}${router.pathname}`} />
            <meta property={"og:site_name"} content={`${APP_NAME}`} />

            {/*<meta property={"og:image"} content={`${APP_NAME}`} /> TODO: Add images and app id*/}
            {/*<meta property={"og:image:secure_url"} content={`${APP_NAME}`} />*/}
            {/*<meta property={"og:image:type"} content={`image/jpg`} />*/}
            {/*<meta property={"fb:app_id"} content={`${APP_NAME}`}/>*/}
        </Head>
    )

    const [limit, setLimit] = useState(blogsLimit)
    const [offset, setOffset] = useState(blogsOffset)
    const [size, setSize] = useState(totalBlogs)
    const [loadedBlogs, setLoadedBlogs] = useState([])

    const loadMore = () => {
        let toOffset = offset + limit
        listBlogsWithCategoriesAndTags(toOffset, limit)
            .then(data => {
                if (data.error){
                    console.log('Error: ', data.error)
                } else {
                    setLoadedBlogs([...loadedBlogs, ...data.blogs])
                    setSize(data.size)
                    setOffset(toOffset)
                }
            })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (<button onClick={loadMore}>Load more</button>)
        )
    }

    const showAllBlogs = () => {
        return blogs.map((blog, index) => (
            <NewsCard key={index} blog={blog} />
        ))
    }

    const showAllCategories = () => {
        return categories.map((category, index) => (
            <Link href={`/categories/${category.slug}`} key={index}>
                <a>{category.name}</a>
            </Link>
        ))
    }

    const showAllTags = () => {
        return tags.map((tag, index) => (
            <Link href={`/categories/${tag.slug}`} key={index}>
                <a>{tag.name}</a>
            </Link>
        ))
    }

    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, index) => (
            <article key={index}>
                <NewsCard blog={blog} />
            </article>
        ))
    }

    return (
        <>
            {head()}
            <Default>
                <h2>Categories</h2>
                {showAllCategories()}
                <hr/>
                <h2>Tags</h2>
                {showAllTags()}
                <hr/>
                Show all blogs
                {showAllBlogs()}
                {showLoadedBlogs()}
                {loadMoreButton()}
                <hr/>
            </Default>
        </>
    )
}

Blogs.getInitialProps = () => {
    let offset = 0
    let limit = 10
    return listBlogsWithCategoriesAndTags(offset, limit)
        .then(data => {
            if (data.error){
                console.log(data.error)
            } else {
                return {
                    blogs: data.blogs,
                    categories: data.categories,
                    tags: data.tags,
                    totalBlogs: data.size,
                    blogsLimit: limit,
                    blogsOffset: offset
                }
            }
        })
        .catch((e) => console.log(e))
}

export default withRouter(Blogs)