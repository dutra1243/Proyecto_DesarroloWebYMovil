import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { UserDto } from '@/models/user'
import { PostDTO } from '@/models/post/PostDTO'
import { useSelector } from 'react-redux'

const UserInfo = (props: { posts: PostDTO[], user: UserDto }) => {

    const user = useSelector((state) => state.auth.user);

    const genericProfilePicture = "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg"


    return (
        <View>
            {props.user.profilePicture !== "" ? <Image style={styles.image} source={{ uri: props.user.profilePicture }} ></Image>
                : <Image style={styles.image} source={{ uri: genericProfilePicture }} ></Image>}
            <View>
                <Text>{props.user.username}</Text>
                {props.user.email === user.email ? <Button title="Edit profile" ></Button> : <Button title="Add friend" ></Button>}
            </View>
            <View>
                <Text>{props.posts.length} posts</Text>
                <Text>{props.user.friends.length} friends</Text>
            </View>
        </View>
    )
}

export default UserInfo

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
        borderRadius: 50
    }
})