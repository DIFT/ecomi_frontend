import Default from "../../../templates/Default";
import Admin from "../../../components/auth/Admin";
import License from "../../../components/crud/License";

const Licenses = () => (
    <Default>
        <Admin>
            <h2>Manage Licenses</h2>
            <License />
        </Admin>
    </Default>
)

export default Licenses