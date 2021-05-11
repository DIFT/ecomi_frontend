import Default from "../../../templates/Default";
import Admin from "../../../components/auth/Admin";
import Collectible from "../../../components/crud/Collectible";

const CollectibleCreate = () => (
    <Default>
        <Admin>
            <h2>Manage Collectible</h2>
            <Collectible />
        </Admin>
    </Default>
)

export default CollectibleCreate