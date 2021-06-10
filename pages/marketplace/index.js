import Default from "../../templates/Default"
import LatestListings from "../../blocks/ecomi/marketplace/LatestListings";
import EndingSoonest from "../../blocks/ecomi/marketplace/EndingSoonest";

const Marketplace = () => {

    return (
        <>
            <Default>
                <LatestListings />
                <EndingSoonest />
            </Default>
        </>
    )
}

export default Marketplace