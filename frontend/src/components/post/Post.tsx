import { PostHeader } from './postHeader/PostHeader';
import { PostFooter } from './postFooter/PostFooter';
import { PostDTO } from '../../models/post';
import './Post.css'

export const Post = (props: PostDTO) => {



    return (
        <>
            <div className='post' >
                <PostHeader user={props.user} createdAt={props.createdAt} />
                <img src={props.imageUrl} alt="post" />
                <PostFooter username={props.user.username} caption={props.caption} likes={props.likes} comments={props.comments} />
            </div>
        </>
    )
}
