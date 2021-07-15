import AdminTemplate from "../../../../templates/AdminTemplate";
import Admin from "../../../../components/Auth/Admin";
import ReadCollectibles from "../../../../components/crud/collectibles/ReadCollectibles"
import Link from "next/link"

const Collectibles = () => (
    <AdminTemplate>
        <Admin>
            <h2 className={`text-3xl mb-5`}>Manage collectibles</h2>
            <ReadCollectibles />
        </Admin>
    </AdminTemplate>
)

export default Collectibles