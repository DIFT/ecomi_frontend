import {useState} from 'react'
import dynamic from "next/dynamic"
import Header from "../Organisms/Header/Header"

const FireFly = dynamic(
    () => import("../Misc/Firefly"),
    { ssr: false }
);

const Default = ({ children }) => {
    const [controlOverflow, setControlOverflow] = useState(false)
    return(
        <div className={controlOverflow ? 'overflow-hidden h-screen' : ''}>
            <Header setControlOverflow={setControlOverflow} />
            <main className={`pt-40`}>
                <span className={`ecomi__blue--radial-bg h-full fixed`}></span>
                <FireFly />
                {children}
            </main>
        </div>
    )
}

export default Default;