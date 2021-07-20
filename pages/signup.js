import Default from "../templates/Default";
import Link from "next/link";
import SignupComponent from "../components/Auth/SignupComponent";

const Signup = () => (
    <Default>
        <h2>Signup page</h2>
        <SignupComponent />
    </Default>
)

export default Signup