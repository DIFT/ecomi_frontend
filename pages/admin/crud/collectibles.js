import AdminTemplate from "../../../templates/AdminTemplate";
import Admin from "../../../components/auth/Admin";
import CollectibleRead from "../../../components/crud/CollectibleRead"
import Link from "next/link"

const Collectible = () => (
    <AdminTemplate>
        <Admin>
            <h2>Manage Collectible</h2>
            <CollectibleRead />
        </Admin>
    </AdminTemplate>
)

export default Collectible