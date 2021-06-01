import AdminTemplate from "../../../templates/AdminTemplate";
import Admin from "../../../components/auth/Admin";
import Collectible from "../../../components/crud/Collectible";

const CollectibleCreate = () => (
    <AdminTemplate>
        <Admin>
            <h2>Manage Collectible</h2>
            <Collectible />
        </Admin>
    </AdminTemplate>
)

export default CollectibleCreate