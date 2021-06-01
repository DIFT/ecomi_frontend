import { useState, useEffect } from 'react'
import Link from "next/link"

const AdminMenu = () => {

    const [activeAccordion, setActiveAccordion] = useState('');
    const [menu, setMenu] = useState([])

    const toggleAccordion = (e, id) => {
        e.preventDefault()
        if (activeAccordion === id){
            setActiveAccordion('')
        } else {
            setActiveAccordion(id)
        }
    }

    return(
        <nav>
            <ul>
                <li><Link href={`/admin`}><a>Dashboard</a></Link></li>
                <li>
                    <button onClick={e => toggleAccordion(e, 'ecomi')}>ECOMI</button>
                    <span className={`${activeAccordion === 'ecomi' ? 'show' : 'hidden'}`}>
                        <ul>
                            <li><Link href={`/admin/crud/team/members`}><a>Manage staff</a></Link></li>
                        </ul>
                    </span>
                </li>
            </ul>
        </nav>
    )
}

export default AdminMenu