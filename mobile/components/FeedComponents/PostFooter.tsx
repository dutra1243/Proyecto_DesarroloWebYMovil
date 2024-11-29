import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommentDTO } from '@/models/post';
import { Button, Icon, TextInput } from "react-native-paper";
import { baseUrl } from '@/common/constants';


const PostFooter = ({ _id, caption, likes, comments, onAddComment, onAddLike }:
    {
        _id: string;
        caption: string;
        likes: any[];
        comments: CommentDTO[];
        onAddComment: (comment: CommentDTO) => void;
        onAddLike: (likeID: string[]) => void;
    }
) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState()

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("token");
                setToken(storedToken);
                const storedUser = await AsyncStorage.getItem("user");
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error al recuperar el token:", error);
            }
        };

        fetchToken();
    }, []);
    const [liked, setLiked] = useState(likes.includes(_id));
    const [likesLength, setLikesLength] = useState(likes.length);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        if (user && likes.includes(user._id)) {
            setLiked(true);
        }
    }, [likes, user])

    const handleAddComment = () => {
        if (newComment.trim()) {
            fetch(`${baseUrl}/posts/${_id}/comments`, {
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
                    let newComment: CommentDTO = {
                        _id: data._id,
                        content: data.content,
                        user: {
                            _id: data.user,
                            username: user.username
                        }
                    }
                    onAddComment(newComment);
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
            fetch(baseUrl + `/posts/${_id}/like`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({})
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
            fetch(baseUrl + `/posts/${_id}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({})
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

    console.log(comments)

    return (
        <View style={styles.container}>
            <Text>{caption}</Text>
            <View style={styles.secondContainer}>
                <View style={styles.interactionContainer}>
                    {liked ? (
                        <Pressable onPress={handleClick}>
                            <Icon
                                size={20}
                                source="heart"
                            />
                        </Pressable>
                    ) : (
                        <Pressable onPress={handleClick}>
                            <Icon
                                size={20}
                                source="heart-outline"
                            />
                        </Pressable>

                    )}
                    <Text>{likesLength}</Text>
                    <Icon size={20} source="comment-outline" />
                    <Text>{comments.length}</Text>

                </View>

                {comments.map((comment, index) => (
                    <Text key={comment._id}>{comment.user.username}: {comment.content}</Text>
                ))}
            </View>

            <View>
                <TextInput
                    mode="outlined"
                    style={{ height: 30, fontSize: 12, borderRadius: 10 }}
                    onChangeText={setNewComment}
                    value={newComment}
                    placeholder="Agrega un comentario.."
                />
                <Button onPress={handleAddComment}>
                    Comentar
                </Button>

            </View>
        </View>
    )
}

export default PostFooter

const styles = StyleSheet.create({
    container: {
        padding: 5,
        marginBottom: 10,
        gap: 10,
    },
    secondContainer: {
        gap: 10,
    },
    interactionContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    }
})