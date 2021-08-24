import Link from "next/link"
import dynamic from 'next/dynamic';

const LinkIcon = dynamic(() => import('/components/Misc/LordIcon').then((mod) => mod.LinkIcon), {
    ssr: false
});

const AlertCentre = () => {
    return(
        <div className={`absolute bg-gray-800 border border-gray-700 w-96 mt-2 right-0 rounded-md shadow`}>
            <header className={`p-5`}>
                <span className={`text-lg block text-white`}>Notifications</span>
            </header>
            <div>
                <nav className={`text-gray-300 text-sm px-3 border-b border-gray-700`}>
                    <ul>
                        <li className={`inline-block`}><button className={`p-2 pb-3 text-gray-400 font-medium`}>Activities</button></li>
                        <li className={`inline-block`}><button className={`p-2 pb-3 border-b-2 font-medium border-yellow-500 text-white`}>Marketplace</button></li>
                    </ul>
                </nav>
                <h6 className={`block text-white px-5 py-3 border-b border-gray-700 bg-gray-700`}>New</h6>
                <ul>
                    <li className={`py-4 px-5 border-b border-gray-700 text-gray-300 relative text-sm`}>
                        <Link href={`/`}><a><strong className={`text-pink-600`}>Twilight Mothman</strong></a></Link> was listed for under <strong>$12.99</strong>
                        <div className="block">
                            <span className={`inline-block text-xs text-gray-300`}>13 minutes ago</span>
                            <span className={`inline-block text-xs text-pink-600 ml-2`}>Disable</span>
                            <span className={`inline-block text-xs text-pink-600 ml-2`}>Edit</span>
                        </div>
                    </li>
                </ul>
                <h6 className={`block text-white px-5 py-3 border-b border-gray-700 bg-gray-700`}>Missed</h6>
                <ul>
                    <li className={`py-4 px-5 border-b border-gray-700 text-gray-300 relative text-sm`}>
                        <Link href={`/`}><a><strong className={`text-pink-600`}>#79 Jim Lee Nightwing</strong></a></Link> was listed for under <strong>$12.99</strong>
                        <div className="block">
                            <span className={`inline-block text-xs text-gray-300`}>13 minutes ago</span>
                            <span className={`inline-block text-xs text-pink-600 ml-2`}>Disable</span>
                            <span className={`inline-block text-xs text-pink-600 ml-2`}>Edit</span>
                        </div>
                    </li>
                    <li className={`py-4 px-5 border-b border-gray-700 text-gray-300 relative text-sm`}>
                        <Link href={`/`}><a><strong className={`text-pink-600`}>#97 Joe Madureira Batman</strong></a></Link> was listed for under <strong>$12.99</strong>
                        <div className="block">
                            <span className={`inline-block text-xs text-gray-300`}>13 minutes ago</span>
                            <span className={`inline-block text-xs text-pink-600 ml-2`}>Disable</span>
                            <span className={`inline-block text-xs text-pink-600 ml-2`}>Edit</span>
                        </div>
                    </li>
                </ul>
            </div>
            <footer className={`p-5 flex justify-between items-center text-white border-t border-gray-700`}>
                <div><Link href={`/`}><a className={`text-pink-600 text-sm`}>
                    <LinkIcon /> Settings
                </a></Link></div>
                <div><button className={`w-full rounded block font-medium text-center p-2 bg-yellow-500 text-black`}>Clear all</button></div>
            </footer>
        </div>
    )
}

export default AlertCentre