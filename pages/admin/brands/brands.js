import Default from "../../../templates/Default";
import Admin from "../../../components/Auth/Admin";
import BrandRead from "../../../components/crud/BrandRead"
import Link from "next/link"

const Brand = () => (
    <Default>
        <Admin>
            <h2>Manage Brand</h2>
            <BrandRead />
        </Admin>
    </Default>
)

export default Brand