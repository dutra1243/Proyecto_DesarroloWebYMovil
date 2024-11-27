import { PostHeader } from './postHeader/PostHeader';
import { PostFooter } from './postFooter/PostFooter';
import { PostDTO } from '../../models/post/PostDTO';
import './Post.css';
import React, { useState } from 'react';

export const Post = (props: PostDTO) => {

    const [comments, setComments] = useState(props.comments || []);

    const [likes, setLikes] = useState(props.likes || []);

    const handleAddLike = (newLikeID: string[]) => {
        setLikes(newLikeID);
    };

    const handleAddComment = (newComment: string) => {
        setComments([...comments, newComment]);
    };

    return (
        <>
            <div className='post'>
                <PostHeader user={props.user} createdAt={props.createdAt} />
                <img src={props.imageUrl} alt="post" />
                <PostFooter
                    _id={props._id}
                    username={props.user.username}
                    caption={props.caption}
                    likes={props.likes}
                    comments={comments}
                    onAddComment={handleAddComment}
                    onAddLike={handleAddLike}
                />
            </div>
        </>
    );
};
