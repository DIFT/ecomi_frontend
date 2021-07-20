import {useState} from 'react'
import Header from "../components/ui/Header"
import Footer from "../components/ui/Footer/Footer"
import dynamic from "next/dynamic"

const FireFly = dynamic(
    () => import("../components/ui/Firefly"),
    { ssr: false }
);

const Default = ({ children }) => {
    const [controlOverflow, setControlOverflow] = useState(false)
    return(
        <div className={controlOverflow ? 'overflow-hidden h-screen' : ''}>
            <Header setControlOverflow={setControlOverflow} />
            <main className={`overflow-x-hidden pt-40`}>
                <span className={`ecomi__blue--radial-bg h-full fixed`}></span>
                <FireFly />
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Default;