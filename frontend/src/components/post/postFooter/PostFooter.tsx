// postFooter.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


export const PostFooter = ({
    _id,
    username,
    caption,
    likes,
    comments,
    onAddComment
}: {
    _id: string;
    username: string;
    caption: string;
    likes: any[];
    comments: any[];
    onAddComment: (comment: string) => void;
}) => {

    const token = useSelector((state: any) => state.auth.token)

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
        if (likes.includes(username)) {
            fetch("remover like")
        }
        fetch(`http://localhost:3001/api/posts/${_id}/comments`, {
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
                console.log(data);
            })

    }

    if (likes.length) {
        console.log(likes)
    }
    // now working
    // if (comments.length) {
    //     console.log(comments)
    // }

    return (
        <>
            <div className='postFooter'>
                <p><span style={{ fontWeight: 'bold' }}>{username}</span> {caption}</p>
                <div className='likesComments'>
                    {(likes.includes(username)) ?
                        <div>
                            <FavoriteIcon onClick={handleClick} />
                            <p>{likes.length} likes</p>
                        </div> :
                        <div>
                            <FavoriteBorderIcon onClick={handleClick} />
                            <p>{likes.length} likes</p>
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
