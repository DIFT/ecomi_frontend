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
        <div className={controlOverflow ? 'overflow-hidden h-screen relative' : 'relative overflow-x-hidden'}>
            {/*TODO: Remove under construction when complete*/}
            <span className={`uppercase absolute text-xs top-14 -right-12 text-black font-black bg-yellow-400 py-1 px-10 transform rotate-45`}>Under construction</span>
            <Header setControlOverflow={setControlOverflow} />
            <main className={`pt-40`}>
                <span className="radial-bg"></span>
                <FireFly />
                {children}
            </main>
        </div>
    )
}

export default Default;