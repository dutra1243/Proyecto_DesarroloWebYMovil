// post.tsx
import { PostHeader } from './postHeader/PostHeader';
import { PostFooter } from './postFooter/PostFooter';
import { PostDTO } from '../../models/post';
import './Post.css';
import React, { useState } from 'react';

export const Post = (props: PostDTO) => {
    const [comments, setComments] = useState(props.comments || []);

    const handleAddComment = (newComment: string) => {
        setComments([...comments, newComment]); 
    };

    return (
        <>
            <div className='post'>
                <PostHeader user={props.user} createdAt={props.createdAt} />
                <img src={props.imageUrl} alt="post" />
                <PostFooter
                    username={props.user.username}
                    caption={props.caption}
                    likes={props.likes}
                    comments={comments}
                    onAddComment={handleAddComment} 
                />
            </div>
        </>
    );
};
