import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import FireFly from "../components/ui/Firefly";

const Default = ({ children }) => {
    return(
        <>
            <Header />
            <main className={`overflow-x-hidden pt-40`}>
                <span className={`ecomi__blue--radial-bg h-full fixed`}></span>
                <FireFly />
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Default;