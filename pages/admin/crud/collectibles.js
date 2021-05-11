import Default from "../../../templates/Default";
import Admin from "../../../components/auth/Admin";
import CollectibleRead from "../../../components/crud/CollectibleRead"
import Link from "next/link"

const Collectible = () => (
    <Default>
        <Admin>
            <h2>Manage Collectible</h2>
            <CollectibleRead />
        </Admin>
    </Default>
)

export default Collectible