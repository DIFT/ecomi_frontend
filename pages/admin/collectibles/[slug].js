import Default from "../../../templates/Default";
import Admin from "../../../components/auth/Admin";
import CollectibleUpdate from "../../../components/crud/CollectibleUpdate"
import Link from "next/link"

const Collectible = () => (
    <Default>
        <Admin>
            <a href={`/admin/crud/collectibles`}>Back</a>
            <h2>Update blog</h2>
            <CollectibleUpdate />
        </Admin>
    </Default>
)

export default Collectible