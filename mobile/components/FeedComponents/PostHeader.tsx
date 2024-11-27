import {Image, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {difDate} from "@/common/utils";


const PostHeader = ({_id, profilePicture, username, createdAt}:
                        {
                            _id: string;
                            profilePicture: string;
                            username: string;
                            createdAt: string;
                        }) => {
    // console.log({profilePicture})
    return (
        <View style={styles.container}>
            <View style={styles.secondContainer}>
                <Image style={styles.minPic} src={profilePicture}/>
                <Text>@{username}</Text>
            </View>
            <Text>{difDate(createdAt)}</Text>
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