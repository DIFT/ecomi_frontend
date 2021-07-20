import moment from "moment"
import dynamic from "next/dynamic"
import Modal from "../modals/Modal"
import { useState } from "react"

// Icons
const ThumbIcon = dynamic(() => import('../../components/LordIcon').then((mod) => mod.ThumbIcon), {
    ssr: false
});

const AddCommentIcon = dynamic(() => import('../../components/LordIcon').then((mod) => mod.AddCommentIcon), {
    ssr: false
});

const CommunityPost = ({ post }) => {

    const [modalState, setModalState] = useState(false)
    const [showLikes, setShowLikes] = useState(false)

    const handleLike = (e) => {
        e.preventDefault()
    }

    return(
        <li className={`mb-10 p-5 rounded-md shadow border border-gray-700`} style={{ background: '#1E263C' }}>
            <header>
                <img src={post.user.photo ? post.user.photo : ''} alt=""/>
                <span className="block text-white font-medium">{post.user.name}</span>
                <span className="block text-sm mb-3">{moment(post.date).fromNow()}</span>
            </header>
            <div className="text-white">
                {post.body}
            </div>
            <footer>
                {console.log('Post is: ', post)}
                {post.likes.length > 0 ? <button onClick={e => {
                    setModalState(true)
                    setShowLikes(true)
                }} className={`inline-block mt-2`}>
                    <ThumbIcon size={'20px'} classes={`bg-blue-500 rounded-full mr-2 p-px`} palette={`#ffffff`} />
                    {post.likes.length}
                </button> : null}
                <div className="flex border-t border-b border-gray-700 mt-3">
                    <button className={`flex-grow font-medium p-2`} onClick={e => handleLike(e)}><ThumbIcon size={'30px'} /> Like</button>
                    <button className={`flex-grow font-medium p-2`}><AddCommentIcon size={'30px'} /> Comment</button>
                </div>
            </footer>

            <Modal modalState={modalState} setModalState={setModalState}>
                {post && post.likes.map((like) => {
                    return <>{like.user}</>
                })}
            </Modal>
        </li>
    )
}

export default CommunityPost