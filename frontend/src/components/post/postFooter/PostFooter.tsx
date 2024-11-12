// postFooter.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';


export const PostFooter = ({
    _id,
    username,
    caption,
    likes,
    comments,
    onAddComment,
    onAddLike
}: {
    _id: string;
    username: string;
    caption: string;
    likes: any[];
    comments: any[];
    onAddComment: (comment: string) => void;
    onAddLike: (likeID: string[]) => void;
}) => {

    const token = useSelector((state: any) => state.auth.token)

    const user = useSelector((state: any) => state.auth.user)

    const [liked, setLiked] = useState(likes.includes(user._id));
    const [likesLength, setLikesLength] = useState(likes.length);

    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(e.target.value);
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            fetch(`http://localhost:3001/api/posts/${_id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: newComment
                })
            }
            ).then((res) => res.json())
                .then((data) => {
                    onAddComment(data);

                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            setNewComment('');
        } else {
            alert('El comentario no puede estar vacío')
        }
    };

    const handleClick = () => {
        if (liked) {
            fetch(`http://localhost:3001/api/posts/${_id}/like`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({

                })
            })
                .then((res) => res.json())
                .then((data) => {
                    onAddLike(data.likes);
                }).catch((error) => {
                    console.error('Error:', error);
                })
            setLiked(false);
            setLikesLength(likesLength - 1);
        } else {
            fetch(`http://localhost:3001/api/posts/${_id}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({

                })
            })
                .then((res) => res.json())
                .then((data) => {
                    onAddLike(data.likes);
                }).catch((error) => {
                    console.error('Error:', error);
                })
            setLiked(true);
            setLikesLength(likesLength + 1);
        }
    }

    return (
        <>
            <div className='postFooter'>
                <p><span style={{ fontWeight: 'bold' }}>{username}</span> {caption}</p>
                <div className='likesComments'>
                    {(liked) ?
                        <div>
                            <FavoriteIcon color="secondary" onClick={handleClick} />
                            <p>{likesLength} likes</p>
                        </div> :
                        <div>
                            <FavoriteBorderIcon color="secondary" className='likeIcon' onClick={handleClick} />
                            <p>{likesLength} likes</p>
                        </div>
                    }
                    <p>{comments.length} comments</p>
                    {comments.map((comment) => <p key={comment._id} >{comment.content}</p>)}
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
