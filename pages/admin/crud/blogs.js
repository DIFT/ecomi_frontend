import AdminTemplate from "../../../templates/AdminTemplate";
import Admin from "../../../components/Auth/Admin";
import BlogRead from "../../../components/crud/BlogRead"
import Link from "next/link"

const Blog = () => (
    <AdminTemplate>
        <Admin>
            <h2>Manage blogs</h2>
            <BlogRead />
        </Admin>
    </AdminTemplate>
)

export default Blog