import Default from "../../templates/Default";
import Admin from "../../components/auth/Admin";
import Link from "next/link"

const AdminIndex = () => (
    <Default>
        <Admin>
            <h2>Admin Dashboard</h2>
            <ul>
                <li>
                    <Link href={`/admin/crud/category-tag`}>Create Category</Link>
                </li>
                <li>
                    <Link href={`/admin/crud/category-tag`}>Create Tag</Link>
                </li>
                <li>
                    <a href={`/admin/crud/blog`}>Create Blog</a>
                </li>
                <li>
                    <a href={`/admin/crud/blogs`}>Update/Delete Blog</a>
                </li>
            </ul>
        </Admin>
    </Default>
)

export default AdminIndex