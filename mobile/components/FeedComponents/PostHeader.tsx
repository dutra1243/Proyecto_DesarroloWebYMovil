import { Image, StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router';


const PostHeader = ({ _id, profilePicture, username, createdAt }:
    {
        _id: string;
        profilePicture: string;
        username: string;
        createdAt: string;
    }) => {

    const handleVisitProfile = () => {
        router.push({ pathname: "/profileById/[id]", params: { id: _id } });
    }    
    

    return (
        <View >
            <Pressable onPress={handleVisitProfile}>
                <Image src={profilePicture} />
                <Text>{username}</Text>
            </Pressable >
            <Text>{createdAt}</Text>

        </View>
    )
}

export default PostHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    secondContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    minPic: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: 'gray',
    }
})