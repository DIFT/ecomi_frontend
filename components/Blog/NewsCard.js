import Link from "next/link";
import moment from "moment";
import { API } from "../../config"

const NewsCard = ({ blog }) => {

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

    return(
        <>
            <article>
                        <header>
                            <img src={`${API}/blog/photo/${blog.slug}`} alt={`${blog.title}`} />
                            <Link href={`/blogs/${blog.slug}`}>
                                <a><h2>{blog.title}</h2></a>
                            </Link>
                        </header>
                        {/*/!*<section>{renderHTML(blog.introtext)}</section>*!/ TODO: Setup introtext field, route, controller*/}
                        <section>Written by {blog.author.name} | Published {moment(blog.updatedAt).fromNow()}</section>
                        <section>
                            {showBlogCategories(blog)}
                            {showBlogTags(blog)}
                        </section>
                        <section>Categories: | Tags: </section>
            </article>

        </>
    )
}

export default NewsCard