import Default from "../../templates/Default"
import { API } from "../../config";
import Link from "next/link"
import { useEffect, useState } from 'react'
import dynamic from "next/dynamic"
import moment from "moment";
import { getPosts } from '../../actions/social/social'
import CommunityPost from "../../components/Community/CommunityPost"

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
                            <CommunityPost key={post._id} post={post} />
                        ))}
                    </ul>
                </div>
            </div>
        </Default>
    )
}

export default Community