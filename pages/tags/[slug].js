import Head from "next/head"
import Default from "../../templates/Default"
import { singleTag } from "../../actions/tag"
import { DOMAIN, APP_NAME } from '../../config'
import NewsCard from "../../components/Blog/NewsCard"

const Tag = ({ tag, blogs, query }) => {

    const head = () => (
        <Head>
            <title>{tag.name} | {APP_NAME}</title>

            <meta name={"description"} content={`${tag.name}`} />
            <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
            <meta property={"og:title"} content={`${tag.name} | ${APP_NAME}`} />
            <meta property={"og:description"} content={`${tag.name}`} />
            <meta property={"og:type"} content="website" />
            <meta property={"og:url"} content={`${DOMAIN}/categories/${query.slug}`} />
            <meta property={"og:site_name"} content={`${APP_NAME}`} />

            {/*<meta property={"og:image"} content={`${APP_NAME}/blog/photo/${blog.slug}`} /> TODO: Add images and app id maybe static (public/assets/images/)*/}
            {/*<meta property={"og:image:secure_url"} content={`${APP_NAME}/blog/photo/${blog.slug}`} />*/}
            {/*<meta property={"og:image:type"} content={`image/jpg`} />*/}
            {/*<meta property={"fb:app_id"} content={`${APP_NAME}`}/>*/}
        </Head>
    )

    return(
        <>
            {head()}
            <Default>
                <main>
                    <h1>{tag.name}</h1>
                    {blogs.map((blog, index) => (
                        <NewsCard key={index} blog={blog} />
                    ))}
                </main>
            </Default>
        </>
    )
}

Tag.getInitialProps = ({ query }) => {
    return singleTag(query.slug)
        .then(data => {
            if (data.error){
                console.log('Error: ', data.error)
            } else {
                return {
                    tag: data.tag,
                    blogs: data.blogs,
                    query
                }
            }
        })
}

export default Tag