import AdminTemplate from "../../../../templates/AdminTemplate";
import Admin from "../../../../components/auth/Admin";
import CreateTeamMember from "../../../../components/crud/team/CreateTeamMember"
import Link from "next/link"

const TeamMember = () => (
    <AdminTemplate>
        <Admin>
            <h2>Create a new team member</h2>
            <CreateTeamMember />
        </Admin>
    </AdminTemplate>
)

export default TeamMember