import Default from "../../../templates/Default";
import Admin from "../../../components/auth/Admin";
import CreateBlog from "../../../components/crud/BlogCreate"
import Link from "next/link"

const Blog = () => (
    <Default>
        <Admin>
            <h2>Create a new blog</h2>
            <CreateBlog />
        </Admin>
    </Default>
)

export default Blog