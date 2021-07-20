import AdminTemplate from "../../../templates/AdminTemplate";
import Admin from "../../../components/Auth/Admin";
import BlogUpdate from "../../../components/crud/BlogUpdate"
import Link from "next/link"

const Blog = () => (
    <AdminTemplate>
        <Admin>
            <h2>Update blog</h2>
            <BlogUpdate />
        </Admin>
    </AdminTemplate>
)

export default Blog