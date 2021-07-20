import {useState} from 'react'
import Header from "../components/ui/Header"
import Footer from "../components/ui/Footer/Footer"
import dynamic from "next/dynamic"
import AdminMenu from "../components/Admin/AdminMenu";

const FireFly = dynamic(
    () => import("../components/ui/Firefly"),
    { ssr: false }
);

const AdminTemplate = ({ children }) => {
    const [controlOverflow, setControlOverflow] = useState(false)
    return(
        <div className={controlOverflow ? 'overflow-hidden h-screen' : ''}>
            <Header setControlOverflow={setControlOverflow} />
            <main className={`overflow-x-hidden pt-14`}>
                <span className={`ecomi__blue--radial-bg h-full fixed`}></span>
                <FireFly />
                <div className="grid grid-cols-7 gap-10">

                    <aside className={`bg-gray-900 border-r border-black bg-opacity-80 text-white p-3 min-h-screen `}>
                        <AdminMenu />
                    </aside>

                    <div className={`col-span-6 text-white mt-10 px-10`}>
                        {children}
                    </div>
                </div>
            </main>
            <Footer classes={`text-white bg-gray-900 py-20 border-t border-black mt-0`}/>
        </div>
    )
}

export default AdminTemplate;