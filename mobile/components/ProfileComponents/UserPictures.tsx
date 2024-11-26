import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PostDTO } from '@/models/post/PostDTO'

const UserPictures = (props: PostDTO[]) => {



    return (
        <View>
            <FlatList data={props} renderItem={({ item }) => <Pressable><Image style={styles.image} source={{ uri: item.imageUrl }} ></Image></Pressable>} ></FlatList>
        </View>
    )
}

export default UserPictures

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
    }
})