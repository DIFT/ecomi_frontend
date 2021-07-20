import { useState, useEffect } from 'react'
import Slider from "react-slick"
import {list} from "../actions/team/member"
import {API} from "../config";
import Link from "next/link"
import dynamic from "next/dynamic";

const LinkIcon = dynamic(() => import('../components/LordIcon').then((mod) => mod.LinkIcon), {
    ssr: false
});


const MeetTheTeam = () => {

    const [team, setTeam] = useState([])

    useEffect(() => {
        loadTeamMembers()
    },[])

    const loadTeamMembers = () => {
        list()
            .then((data) => {
                if (data.error){
                    console.log('Error loading members: ', data.error)
                } else {
                    setTeam(data)
                }
            })
    }

    const settings = {
        className: "center z-50",
        centerMode: true,
        infinite: true,
        slidesToShow: 7,
        focusOnSelect: true,
        speed: 500
    };

    return(
        <>
            <section className="relative z-10 text-white text-center">
                <h2 className="text-3xl mb-3 leading-none font-medium tracking-tight mb-8">Team members.</h2>
                <p>ECOMI has composed itself with an all star team with a rich and vetted reputation of successful businesses.</p>

                <Slider {...settings}>
                    {team && team.map((member, index) => (
                        <div key={index} className={`relative meet-the-team__member`}>
                            <figure className={`${member.vip ? 'vip' : ''}`}>
                                {member.vip ? <span className={`absolute right-2 top-2 inline-block px-1 text-xxs font-medium rounded border bg-yellow-400 border-yellow-800 text-yellow-900`}>VIP</span> : null}
                                <img src={`${API}/team/photo/${member.slug}`} alt={`${member.title}`} />
                            </figure>
                            <div className="ninja mt-3">
                                <h4 className={`text-pink-600 font-medium`}>
                                    <Link href={`/team/${member.slug}`}><a>
                                        <LinkIcon /> {member.name}
                                    </a></Link></h4>
                                <strong className="text-xs">{member.title}</strong>
                            </div>
                        </div>
                    ))}
                </Slider>
            </section>
        </>
    )
}

export default MeetTheTeam