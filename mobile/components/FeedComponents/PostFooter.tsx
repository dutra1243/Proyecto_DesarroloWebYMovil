import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PostFooter = ({ caption, likes, comments }:
    {
        caption: string;
        likes: any[];
        comments: any[];
    }
) => {
    return (
        <View>
            <Text >{caption}</Text>
            {/* <Text >Likes: {likes.length}</Text>
            <Text >Comments: {comments.length}</Text> */}
        </View>
    )
}

export default PostFooter

const styles = StyleSheet.create({})