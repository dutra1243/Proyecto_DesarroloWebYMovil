import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { CommentDTO, PostDTO } from '@/models/post'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'

const Post = (props: PostDTO) => {
    const [comments, setComments] = useState(props.comments || []);

    const [likes, setLikes] = useState(props.likes || []);

    const handleAddLike = (newLikeID: string[]) => {
        setLikes(newLikeID);
    };

    const handleAddComment = (newComment: CommentDTO) => {
        setComments([...comments, newComment]);
    };
    return (
        <View style={styles.container}>
            <PostHeader {...props.user} createdAt={props.createdAt} ></PostHeader>
            <Image source={{ uri: props.imageUrl }} style={styles.postImage} ></Image>
            <PostFooter _id={props._id} caption={props.caption} likes={props.likes} comments={comments} onAddComment={(value) => handleAddComment(value)} onAddLike={handleAddLike} ></PostFooter>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    profilePicture: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    username: {
        fontWeight: 'bold',
    },
    postImage: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    caption: {
        marginBottom: 5,
    },
    createdAt: {
        color: 'gray',
        marginBottom: 5,
    },
    likes: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    comments: {
        color: 'gray',
    },
})

export default Post
