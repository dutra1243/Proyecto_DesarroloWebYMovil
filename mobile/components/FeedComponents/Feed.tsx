import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { PostDTO } from '@/models/post'
import Post from './Post'


const Feed = (props: PostDTO[]) => {


    const [postsLength, setPostsLength] = useState(10)

    const handleLoadMore = () => {
        setPostsLength(postsLength + 10)
    }

    const postsToShow = new Array<PostDTO>(props.length);

    console.log("POSTSLENGTH", postsLength)
    console.log("PROPSLENGTH", props.length)
    for (let i = 0; i < postsLength && i < props.length; i++) {
        postsToShow[i] = props[i]
    }


    return (
        <>
            <Text>Feed</Text>
            <FlatList data={postsToShow} renderItem={({ item }) => <Post  {...item} ></Post>}></FlatList>
            <Button title="Load more" onPress={handleLoadMore}></Button>
            <Text>{postsLength}</Text>
        </>
    )
}

export default Feed

const styles = StyleSheet.create({})