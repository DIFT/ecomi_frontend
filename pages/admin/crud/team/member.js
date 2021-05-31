import Default from "../../../../templates/Default";
import Admin from "../../../../components/auth/Admin";
import CreateTeamMember from "../../../../components/crud/team/CreateTeamMember"
import Link from "next/link"

const TeamMember = () => (
    <Default>
        <Admin>
            <h2>Create a new team member</h2>
            <CreateTeamMember />
        </Admin>
    </Default>
)

export default TeamMember