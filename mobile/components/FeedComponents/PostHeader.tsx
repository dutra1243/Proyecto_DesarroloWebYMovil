import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PostHeader = ({ _id, profilePicture, username, createdAt }:
    {
        _id: string;
        profilePicture: string;
        username: string;
        createdAt: string;
    }) => {
    return (
        <View >
            <Image src={profilePicture} />
            <Text>{username}</Text>
            <Text>{createdAt}</Text>
        </View>
    )
}

export default PostHeader

const styles = StyleSheet.create({})