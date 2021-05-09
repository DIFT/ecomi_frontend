import Head from "next/head"
import Link from "next/link"
import moment from "moment";
import Default from "../../templates/Default"
import { useState, useEffect } from 'react'
import { singleBlog, listRelated } from "../../actions/blog"
import { API, DOMAIN, APP_NAME } from '../../config'
import renderHTML from 'react-render-html'
import RelatedNews from "../../components/blog/RelatedNews"
import parse from 'html-react-parser';

const SingleBlog = ({ blog, query }) => {

    const head = () => (
        <Head>
            <title>{blog.title} | {APP_NAME}</title>

            <meta name={"description"} content={blog.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property={"og:title"} content={`${blog.title} | ${APP_NAME}`} />
            <meta property={"og:description"} content={blog.mdesc} />
            <meta property={"og:type"} content="website" />
            <meta property={"og:url"} content={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property={"og:site_name"} content={`${APP_NAME}`} />

            {/*<meta property={"og:image"} content={`${APP_NAME}/blog/photo/${blog.slug}`} /> TODO: Add images and app id*/}
            {/*<meta property={"og:image:secure_url"} content={`${APP_NAME}/blog/photo/${blog.slug}`} />*/}
            {/*<meta property={"og:image:type"} content={`image/jpg`} />*/}
            {/*<meta property={"fb:app_id"} content={`${APP_NAME}`}/>*/}
        </Head>
    )

    useEffect(() => {
       loadRelated()
    },[])

    const [related, setRelated] = useState([])
    const loadRelated = () => {
        listRelated({blog})
            .then(data => {
                if (data.error){
                    console.log(data.error)
                } else {
                    setRelated(data)
                }
            })
    }

    const showBlogCategories = blog => {
        return blog.categories.map((category, index) => (
            <Link key={index} href={`/categories/${category.slug}`}>
                <a>{category.name}</a>
            </Link>
        ))
    }

    const showBlogTags = blog => {
        return blog.tags.map((tag, index) => (
            <Link key={index} href={`/tags/${tag.slug}`}>
                <a>{tag.name}</a>
            </Link>
        ))
    }

    const showRelatedBlogs = () => {
        return related.map((blog,index) => (
            <li key={index}>
                <article>
                    <RelatedNews blog={blog} />
                </article>
            </li>
        ))
    }

    return(
        <>
            {head()}
            <Default>
                <main>
                    <article>
                        <header>
                            <h1>{blog.title}</h1>
                            <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} />
                            Written by {blog.author.name} | Published {moment(blog.updatedAt).fromNow()}
                            {showBlogCategories(blog)}
                            {showBlogTags(blog)}
                        </header>
                        <section>
                            {/*{parse(blog.body, {*/}
                            {/*    replace: ({ attribs, children }) => {*/}
                            {/*        if (attribs && attribs.class === 'ql-syntax'){*/}
                            {/*            return <SyntaxHighlighter language="html" style={docco} showLineNumbers children={children[0].data} />*/}
                            {/*        }*/}
                            {/*    }*/}
                            {/*})}*/}
                        </section>
                    </article>
                </main>
                <h5>Recommended</h5>
                {showRelatedBlogs()}

            </Default>
        </>
    )
}

SingleBlog.getInitialProps = ({query}) => {
    return singleBlog(query.slug)
        .then(data => {
            if (data.error){
                console.log(data.error)
            } else {
                return {blog: data, query}
            }
        })
}

export default SingleBlog