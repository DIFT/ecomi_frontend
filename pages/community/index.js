import Default from "../../templates/Default"
import { API } from "../../config";
import Link from "next/link"
import { useEffect, useState } from 'react'
import dynamic from "next/dynamic";
import moment from "moment";
import { getPosts } from '../../actions/social/social'

// Icons
const ThumbIcon = dynamic(() => import('../../components/LordIcon').then((mod) => mod.ThumbIcon), {
    ssr: false
});

const AddCommentIcon = dynamic(() => import('../../components/LordIcon').then((mod) => mod.AddCommentIcon), {
    ssr: false
});

const Community = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        initPosts()
    },[])

    const initPosts = () => {
        getPosts()
            .then(data => {
                setPosts(data)
            })
            .catch(e => console.log('Error getting posts.'))
    }

    return(
        <Default>
            <div className={`flex justify-center px-8`}>
                <div className="w-1/2 max-w-screen-md text-gray-300">
                    <ul>
                        {posts && posts.map((post) => (
                            <li className={`mb-5 p-5 rounded-md shadow border border-gray-700`} style={{ background: '#1E263C' }}>
                                <header>
                                    <img src={post.user.photo} alt=""/>
                                    <span className="block text-white font-medium">{post.user.name}</span>
                                    <span className="block text-sm mb-3">{moment(post.date).fromNow()}</span>
                                </header>
                                <div className="text-white">
                                    {post.body}
                                </div>
                                <footer>
                                    <div className="flex border-t border-b border-gray-700 mt-3">
                                        <button className={`flex-grow font-medium p-2`}><ThumbIcon size={'30px'} /> Like</button>
                                        <button className={`flex-grow font-medium p-2`}><AddCommentIcon size={'30px'} /> Comment</button>
                                    </div>
                                </footer>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Default>
    )
}

export default Community