import Default from "../../../templates/Default";
import Admin from "../../../components/Auth/Admin";
// import BrandUpdate from "../../../components/brands/BrandsUpdate"
import Link from "next/link"

const Brand = () => (
    <Default>
        <Admin>
            <a href={`/admin/crud/collectibles`}>Back</a>
            <h2>Update Brand</h2>
            {/*<BrandUpdate />*/}
        </Admin>
    </Default>
)

export default Brand