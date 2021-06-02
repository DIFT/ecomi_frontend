import AdminTemplate from "../../../../templates/AdminTemplate";
import Admin from "../../../../components/auth/Admin";
import CreateTeamMember from "../../../../components/crud/team/CreateTeamMember"
import Link from "next/link"

const TeamMember = () => (
    <AdminTemplate>
        <Admin>
            <Link href={`/admin/crud/team/members`}><a className={`text-xs font-medium text-gray-300 uppercase mb-2 block`}>Back</a></Link>
            <h2 className={`text-3xl mb-5`}>Add team member</h2>
            <CreateTeamMember />
        </Admin>
    </AdminTemplate>
)

export default TeamMember