import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PostDTO } from '@/models/post'
import Post from './Post'

const Feed = (props: PostDTO[]) => {
    const postsArray = Object.values(props);
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={postsArray}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={{ flex: 1 }}>
                        <Post {...item} />
                    </View>
                )}
            />
        </View>
    )
}

export default Feed

const styles = StyleSheet.create({})