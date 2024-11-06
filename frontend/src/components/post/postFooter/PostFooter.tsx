// postFooter.tsx
import React, { useState } from 'react';

export const PostFooter = (props: {
    username: string;
    caption: string;
    likes: any[];
    comments: any[];
    onAddComment: (comment: string) => void;
}) => {
    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(e.target.value);
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            props.onAddComment(newComment);
            setNewComment(''); 
        }
    };

    return (
        <>
            <div className='postFooter'>
                <p><span style={{ fontWeight: 'bold' }}>{props.username}</span> {props.caption}</p>
                <div className='likesComments'>
                    <p>{props.likes.length} likes</p>
                    <p>{props.comments.length} comments</p>
                </div>
                <input
                    type="text"
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Agrega un comentario.."
                />
                <button className='buttonComentar' onClick={handleAddComment}>Comentar</button>
            </div>
        </>
    );
};
