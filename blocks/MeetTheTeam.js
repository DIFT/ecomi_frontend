import Slider from "react-slick";


const MeetTheTeam = () => {

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
                    <div>
                        <img src="./assets/images/ecomi/team/dan-crothers.jpg" alt="1"/>
                    </div>
                    <div>
                        <img src="./assets/images/ecomi/team/david-yu.jpg" alt="1"/>
                        <div className="ninja mt-3">
                            <h4>David Yu</h4>
                            <strong className={`text-xs`}>CEO</strong>
                        </div>
                    </div>
                    <div>
                        <img src="./assets/images/ecomi/team/alfred-kahn.jpg" alt="1"/>
                        <div className="ninja mt-3">
                            <h4>Alfred Kahn</h4>
                            <strong className={`text-xs`}>Head of Licensing</strong>
                        </div>
                    </div>
                    <div>
                        <img src="./assets/images/ecomi/team/david-younts.jpg" alt="1"/>
                    </div>
                    <div>
                        <img src="./assets/images/ecomi/team/rhys-skellern.jpg" alt="1"/>
                    </div>
                    <div>
                        <img src="./assets/images/ecomi/team/mikel-duffy.jpg" alt="1"/>
                    </div>
                    <div>
                        <img src="./assets/images/ecomi/team/natalie-godoy.jpg" alt="1"/>
                    </div>
                    <div>
                        <img src="./assets/images/ecomi/team/trevor-dietz.jpg" alt="1"/>
                    </div>
                    <div>
                        <img src="./assets/images/ecomi/team/dan-crothers.jpg" alt="1"/>
                    </div>
                    <div>
                        <img src="./assets/images/ecomi/team/dan-crothers.jpg" alt="1"/>
                    </div>
                </Slider>
            </section>
        </>
    )
}

export default MeetTheTeam