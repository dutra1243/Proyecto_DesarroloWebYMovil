import { PostHeader } from './postHeader/PostHeader';
import { PostFooter } from './postFooter/PostFooter';
import { PostDTO } from '../../models/post';

export const Post = (props: PostDTO) => {
    return (
        <>
            <PostHeader />
            <img src="https://via.placeholder.com/150" alt="post" />
            <PostFooter />
        </>
    )
}
