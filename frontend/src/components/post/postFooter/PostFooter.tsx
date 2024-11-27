import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

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
    const token = useSelector((state: any) => state.auth.token);
    const user = useSelector((state: any) => state.auth.user);

    const [liked, setLiked] = useState(likes.includes(user._id));
    const [likesLength, setLikesLength] = useState(likes.length);
    const [newComment, setNewComment] = useState('');


    const handleLike = () => {
        if (liked) {
            // Si ya está likeado, elimina el like
            fetch(`http://localhost:3001/api/posts/${_id}/like`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    onAddLike(data.likes);
                    setLiked(false);
                    setLikesLength((prev) => prev - 1);
                })
                .catch((error) => console.error('Error:', error));
        } else {

            fetch(`http://localhost:3001/api/posts/${_id}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    onAddLike(data.likes);
                    setLiked(true);
                    setLikesLength((prev) => prev + 1);
                })
                .catch((error) => console.error('Error:', error));
        }
    };

    const handleComment = () => {
        if (newComment.trim()) {
            fetch(`http://localhost:3001/api/posts/${_id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content: newComment })
            })
                .then((res) => res.json())
                .then((data) => {
                    onAddComment(data);
                    setNewComment('');
                })
                .catch((error) => console.error('Error:', error));
        } else {
            alert('El comentario no puede estar vacío');
        }
    };
    

    return (
        <div className="postFooter">
            <p className="caption">
                <strong>{username}</strong> {caption}
            </p>
            <div className="actions">
                <div onClick={handleLike}>
                    {liked ? (
                        <FavoriteIcon className="likeIcon liked" />
                    ) : (
                        <FavoriteBorderIcon className="likeIcon" />
                    )}
                </div>
                <p className="likes">{likesLength} likes</p>
            </div>

            <div className="comments">
                {comments.slice(0, 2).map((comment) => (
                    <p key={comment._id}>
                        <strong>{comment.username}</strong> {comment.content}
                    </p>
                ))}
                {comments.length > 2 && (
                    <p className="viewAllComments">View all {comments.length} comments</p>
                )}
            </div>
            <div className="addComment">
                <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleComment}>Post</button>
            </div>
        </div>
    );
};
