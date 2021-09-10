import {useState} from 'react'
import dynamic from "next/dynamic"
import Header from "../Organisms/Header/Header"
import Footer from "../Organisms/Footer/Footer";

const FireFly = dynamic(
    () => import("../Misc/Firefly"),
    { ssr: false }
);

const Default = ({ children }) => {

    const [controlOverflow, setControlOverflow] = useState(false)

    return(
        <div className={controlOverflow ? 'overflow-hidden h-screen relative' : 'relative overflow-x-hidden'}>
            {/*TODO: Remove under construction when complete*/}
            <Header setControlOverflow={setControlOverflow} />
            <main className={`pt-16`}>
                <span className="radial-bg"></span>
                <div className={`${controlOverflow ? 'blur-sm filter' : null}`}>
                    {children}
                    <FireFly />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Default;