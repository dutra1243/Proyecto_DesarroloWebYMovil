import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PostDTO } from '@/models/post'
import Post from './Post'
const Feed = (props: PostDTO[]) => {
    return (
        <>
            <FlatList data={props} renderItem={({ item }) => <Post key={item._id} {...item} ></Post>}></FlatList>
        </>
    )
}

export default Feed

const styles = StyleSheet.create({})