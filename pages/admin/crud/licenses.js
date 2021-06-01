import AdminTemplate from "../../../templates/AdminTemplate";
import Admin from "../../../components/auth/Admin";
import License from "../../../components/crud/License";

const Licenses = () => (
    <AdminTemplate>
        <Admin>
            <h2>Manage Licenses</h2>
            <License />
        </Admin>
    </AdminTemplate>
)

export default Licenses