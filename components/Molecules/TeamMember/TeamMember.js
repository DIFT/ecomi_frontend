import { API } from "../../../config"
import Link from "next/link"

import dynamic from "next/dynamic"

const LinkIcon = dynamic(() => import('../../Misc/LordIcon').then((mod) => mod.LinkIcon), {
    ssr: false
});

const TeamMember = ({ member }) => {
    return(
        <div className={`relative px-5 team-members__slider${member.vip ? '--vip' : ''}`}>
            <figure>
                <img src={`${API}/team/photo/${member.slug}`} alt={`${member.title}`} className={`rounded-3xl`} />
            </figure>
            <figcaption className={`my-3`}>
                <h5 className={`text-pink-500 font-bold text-lg`}>
                    {/*<Link href={`/team/${member.slug}`}><a>*/}
                    {/*    <LinkIcon /> {member.name}*/}
                    {/*</a></Link>*/}
                    {member.name}
                </h5>
                <small className="block text-xs uppercase font-semibold tracking-wide text-gray-300">{member.title}</small>
            </figcaption>
        </div>
    )
}

export default TeamMember