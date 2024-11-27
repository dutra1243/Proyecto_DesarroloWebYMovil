import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const PostFooter = ({ _id, caption, likes, comments, onAddComment, onAddLike }:
    {
        _id: string;
        caption: string;
        likes: any[];
        comments: any[];
        onAddComment: (comment: string) => void;
        onAddLike: (likeID: string[]) => void;
    }
) => {
    const token = useSelector((state: any) => state.auth.token._j)
    const [liked, setLiked] = useState(likes.includes(_id));
    const [likesLength, setLikesLength] = useState(likes.length);

    const [newComment, setNewComment] = useState('');

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
                    console.log(data)
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
        <View>
            <Text >{caption}</Text>
            <View>
                {liked ? (
                    <View>
                        <Text onPress={handleClick}>❤️</Text>
                        <Text>{likesLength} likes</Text>
                    </View>
                ) : (
                    <View>
                        <Text onPress={handleClick}>🤍</Text>
                        <Text>{likesLength} likes</Text>
                    </View>
                )}
                <Text>{comments.length} comments</Text>
                {comments.map((comment) => (
                    <Text key={comment._id}>{comment.content}</Text>
                ))}
            </View>

            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={setNewComment}
                    value={newComment}
                    placeholder="Agrega un comentario.."
                />
                <Button title="Comentar" onPress={handleAddComment} />
            </View>
        </View>
    )
}

export default PostFooter

const styles = StyleSheet.create({})