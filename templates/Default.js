import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import dynamic from "next/dynamic";

const FireFly = dynamic(
    () => import("../components/ui/Firefly"),
    { ssr: false }
);

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