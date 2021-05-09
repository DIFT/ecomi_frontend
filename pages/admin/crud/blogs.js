import Default from "../../../templates/Default";
import Admin from "../../../components/auth/Admin";
import BlogRead from "../../../components/crud/BlogRead"
import Link from "next/link"

const Blog = () => (
    <Default>
        <Admin>
            <h2>Manage blogs</h2>
            <BlogRead />
        </Admin>
    </Default>
)

export default Blog