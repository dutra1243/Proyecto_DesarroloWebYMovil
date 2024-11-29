import { PostHeader } from './postHeader/PostHeader';
import { PostFooter } from './postFooter/PostFooter';
import { PostDTO } from '../../models/post/PostDTO';
import './Post.css';
import React, { useState } from 'react';
import { baseUrlNotApi } from '../../common/constants';

export const Post = (props: PostDTO) => {
    const [comments, setComments] = useState(props.comments || []);

    const [likes, setLikes] = useState(props.likes || []);

    const handleAddLike = (newLikeID: string[]) => {
        setLikes(newLikeID);
    };

    const handleAddComment = (newComment: {
        _id: string,
        content: string,
        user: {
            _id: string,
            username: string,
        },
    }) => {
        console.log(newComment)
        setComments([...comments, newComment]);
    };

    console.log(props.comments)

    return (
        <>
            <div className='post'>
                <PostHeader user={props.user} createdAt={props.createdAt} />
                <img className='postImage' src={props.imageUrl.startsWith('https') ? props.imageUrl : `${baseUrlNotApi}/${props.imageUrl}`} alt="post" />
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