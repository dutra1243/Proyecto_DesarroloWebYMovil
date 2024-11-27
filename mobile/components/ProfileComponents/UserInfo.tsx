import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { UserDto } from '@/models/user'
import { PostDTO } from '@/models/post/PostDTO'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { logoutThunk } from '@/store/authSlice'
import { router } from 'expo-router'


const UserInfo = (props: { posts: PostDTO[], user: UserDto }) => {
    const dispatch = useDispatch();


    const handleLogout = async () => {
        await dispatch(logoutThunk());
        router.replace("/");
    }

    const [user, setUser] = useState<UserDto | null>(null)

    useEffect(() => {
        const fetchToken = async () => {
        const storedUser = await AsyncStorage.getItem("user");
        setUser(JSON.parse(storedUser));
        }
        fetchToken()
    }, [])

    const genericProfilePicture = "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg"


    return (
        <View>
            {props.user.profilePicture !== "" ? <Image style={styles.image} source={{ uri: props.user.profilePicture }} ></Image>
                : <Image style={styles.image} source={{ uri: genericProfilePicture }} ></Image>}
            <View>
                <Text>{props.user.username}</Text>
                {user && props.user.email === user.email ? 
                <View>
                    <Button title="Edit profile" ></Button>
                    <Button title="Logout" onPress={handleLogout}></Button>
                </View>
                : <Button title="Add friend" ></Button>}
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