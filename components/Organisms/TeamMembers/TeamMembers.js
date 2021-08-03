import { useState, useEffect } from 'react'
import Slider from "react-slick"
import {list} from "../../../actions/team/member"
import TeamMember from "../../Molecules/TeamMember/TeamMember";
const TeamMembers = () => {

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
        className: "center z-50 my-10 team-members__slider",
        centerMode: true,
        infinite: false,
        slidesToShow: 7,
        focusOnSelect: true,
        speed: 500,
        swipeToSlide: true,
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return(
        <section className={`text-white text-center mb-10 overflow-hidden`}>
            <h4 className={`text-2xl mb-3`}>Team members</h4>
            <small className={`block text-base text-gray-300`}>ECOMI has composed itself with an all star team with a rich and vetted reputation of successful businesses.</small>
            <Slider {...settings}>
                {team && team.map((member => <TeamMember member={member} />))}
            </Slider>
        </section>
    )
}

export default TeamMembers