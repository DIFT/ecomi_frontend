import Default from "../../../templates/Default";
import Admin from "../../../components/auth/Admin";
import BlogUpdate from "../../../components/crud/BlogUpdate"
import Link from "next/link"

const Blog = () => (
    <Default>
        <Admin>
            <h2>Update blog</h2>
            <BlogUpdate />
        </Admin>
    </Default>
)

export default Blog