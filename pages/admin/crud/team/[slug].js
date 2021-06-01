import AdminTemplate from "../../../../templates/AdminTemplate";
import Admin from "../../../../components/auth/Admin";
import UpdateTeamMember from "../../../../components/crud/team/UpdateTeamMember"
import Link from "next/link"

const Member = () => (
    <AdminTemplate>
        <Admin>
            <h2>Update Member</h2>
            <UpdateTeamMember />
        </Admin>
    </AdminTemplate>
)

export default Member