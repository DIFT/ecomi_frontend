import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";

const Default = ({ children }) => {
    return(
        <>
            <Header/>
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Default;