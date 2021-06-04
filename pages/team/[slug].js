import Head from "next/head"
import Default from "../../templates/Default"
import parse from 'html-react-parser';
import { singleTeamMember } from "../../actions/team/member"
import {API, APP_NAME} from "../../config";
import moment from "moment";
import MeetTheTeam from "../../blocks/MeetTheTeam";

const TeamMember = ({ member, query }) => {

    console.log('member is: ', member)

    const head = () => (
        <Head>
            <title>{member.name} | { APP_NAME }</title>
        </Head>
    )

    return (
        <>
            {head()}
            <Default>
                <main>
                    <div className="container">
                        <img src={`${API}/team/photo/${member.slug}`} alt={member.name} className={`mx-auto rounded-full mb-5`} width={`300`}/>

                        <div className="text-center text-white">
                            <h1 className={`text-5xl`}>{member.name}</h1>
                            <span className={`uppercase block mt-3 mb-5 font-bold text-gray-300`}>{member.title}</span>
                        </div>

                        Written by {member.author.name} | Last updated {moment(member.updatedAt).fromNow()}


                        <article className={`text-white mt-10 mb-20`}>
                            {parse(member.body, {
                                replace: ({ attribs, children }) => {
                                    console.log('attribs are: ', attribs)
                                    console.log('children are: ', children)
                                }
                            })}
                        </article>
                    </div>

                    <MeetTheTeam />
                </main>
            </Default>

        </>
    )
}

TeamMember.getInitialProps = ({ query }) => {
    return singleTeamMember(query.slug)
        .then(data => {
            if (data.error){
                console.log('Error: ', data.error)
            } else {
                return{
                    member: data,
                    query,
                }
            }
        })
        .catch(e => console.log('Error getting initial props', e))
}

export default TeamMember