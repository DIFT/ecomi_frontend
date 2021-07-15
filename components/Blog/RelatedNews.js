import Link from "next/link";
import moment from "moment";
import { API } from "../../config"

const RelatedNews = ({ blog }) => {

    return(
            <article>
                <header>
                    <img src={`${API}/blog/photo/${blog.slug}`} alt={`${blog.title}`} />
                    <Link href={`/blogs/${blog.slug}`}>
                        <a><h2>{blog.title}</h2></a>
                    </Link>
                </header>
                {/*/!*<section>{renderHTML(blog.introtext)}</section>*!/ TODO: Setup introtext field, route, controller*/}
                <section>Written by {blog.author.name} | Published {moment(blog.updatedAt).fromNow()}</section>
                <section>Categories: | Tags: </section>
            </article>
    )
}

export default RelatedNews