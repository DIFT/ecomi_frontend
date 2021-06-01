import AdminTemplate from "../../../templates/AdminTemplate";
import Admin from "../../../components/auth/Admin";
import CreateBlog from "../../../components/crud/BlogCreate"
import Link from "next/link"

const Blog = () => (
    <AdminTemplate>
        <Admin>
            <h2>Create a new blog</h2>
            <CreateBlog />
        </Admin>
    </AdminTemplate>
)

export default Blog