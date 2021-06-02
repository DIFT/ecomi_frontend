import AdminTemplate from "../../../../templates/AdminTemplate";
import Admin from "../../../../components/auth/Admin";
import ReadTeamMembers from "../../../../components/crud/team/ReadTeamMembers"
import Link from "next/link"

const Blog = () => (
    <AdminTemplate>
        <Admin>
            <h2 className={`text-3xl mb-5`}>Manage team members</h2>
            <ReadTeamMembers />
        </Admin>
    </AdminTemplate>
)

export default Blog