import { useState, useEffect } from 'react'
import Slider from "react-slick"
import {list} from "../actions/team/member"
import {API} from "../config";


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
        className: "center",
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
                        <div key={index}>
                            <img src={`${API}/team/photo/${member.slug}`} alt={`${member.title}`} />
                            <div className="ninja mt-3">
                                <h4>{member.name}</h4>
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