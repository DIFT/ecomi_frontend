import AdminTemplate from "../../../../templates/AdminTemplate";
import Admin from "../../../../components/Auth/Admin";
import UpdateTeamMember from "../../../../components/crud/team/UpdateTeamMember"
import Link from "next/link"

const Member = () => (
    <AdminTemplate>
        <Admin>
            <Link href={`/admin/crud/team/members`}><a className={`text-xs font-medium text-gray-300 uppercase mb-2 block`}>Back</a></Link>
            <h2 className={`text-3xl mb-5`}>Update Member</h2>
            <UpdateTeamMember />
        </Admin>
    </AdminTemplate>
)

export default Member