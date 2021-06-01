import AdminTemplate from "../../templates/AdminTemplate";
import Admin from "../../components/auth/Admin";
import Link from "next/link"

const AdminIndex = () => (
    <AdminTemplate>
        <Admin>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <h5 className={`text-lg font-bold`}>Manage blogs</h5>
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

                </div>
                <div>
                    <h5 className={`text-lg font-bold`}>Manage Ecomi Team</h5>
                    <ul>
                        <li>
                            <a href={`/admin/crud/team/member`}>Create Team Member</a>
                        </li>
                        <li>
                            <a href={`/admin/crud/team/members`}>Update/Delete Team Member</a>
                        </li>
                    </ul>
                </div>
            </div>

        </Admin>
    </AdminTemplate>
)

export default AdminIndex