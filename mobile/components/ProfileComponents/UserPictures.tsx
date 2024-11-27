import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PostDTO } from '@/models/post/PostDTO'

const UserPictures = ({posts} : { posts : PostDTO[]}) => {
    

    console.log("POSTSSSSSSSSSSSSSSSSSS", posts)

    return (
        <View style={{maxHeight : 600, flexDirection: "column", flexWrap: "wrap"}} >
            <FlatList numColumns={3} data={posts} renderItem={({ item }) => <Image style={styles.image} source={{ uri: item.imageUrl }} ></Image>} ></FlatList>
        </View>
    )
}

export default UserPictures

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        margin: 10
    }
})