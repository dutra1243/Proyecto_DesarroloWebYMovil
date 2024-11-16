import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PostDTO } from '@/models/post'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'

const Post = (props: PostDTO) => {

    console.log("Post being rendered:", props._id)

    return (
        <View style={styles.container}>
            <PostHeader {...props.user} createdAt={props.createdAt} ></PostHeader>
            <Image style={styles.image} src={props.imageUrl} ></Image>
            <PostFooter caption={props.caption} likes={props.likes} comments={props.comments} ></PostFooter>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    image: {
        width: 100,
        height: 100,
    }
})

export default Post
