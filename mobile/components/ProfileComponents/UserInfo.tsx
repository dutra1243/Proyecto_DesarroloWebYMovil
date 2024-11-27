import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { UserDto } from '@/models/user'
import { PostDTO } from '@/models/post/PostDTO'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { logoutThunk } from '@/store/authSlice'
import { router } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'


const UserInfo = (props: { posts: PostDTO[], user: UserDto }) => {
    const dispatch = useDispatch();


    const handleLogout = async () => {
        await dispatch(logoutThunk());
        router.replace("/");
    }

    const handleEdit = () => {
        console.log("EDIT PROFILE")
        router.push({pathname: "/[EditModal]"})
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
        <View style={{}} >
            <View style={{flexDirection: "row", gap: 50}} > 

                {props.user.profilePicture !== "" ? <Image style={styles.image} source={{ uri: props.user.profilePicture }} ></Image>
                    : <Image style={styles.image} source={{ uri: genericProfilePicture }} ></Image>}
                <View style={{flexDirection: "row", gap: 25, flexWrap: "wrap"}}>
                    <View style={{flexDirection: "column", gap: 20}} >
                        <Text>{props.user.username}</Text>
                        <Text style={{maxWidth: 100}} >{props.user.description}</Text>
                    </View>
                    {user && props.user.email === user.email ? 
                    <View style={{flexDirection: "row", gap: 20}} >
                        <Pressable onPress={handleEdit}  >
                            <MaterialCommunityIcons size={40} name="account-edit" ></MaterialCommunityIcons>
                        </Pressable>
                        <Pressable  onPress={handleLogout} >
                            <MaterialCommunityIcons size={40} name="logout" ></MaterialCommunityIcons>
                        </Pressable>
                    </View>
                    : <MaterialCommunityIcons size={40} name="account-plus" ></MaterialCommunityIcons>}
                </View>
            </View>
            <View style={{flexDirection: "row", gap: 10}} >
                <Text>{props.posts.length} posts</Text>
                <Text>{props.user.friends.length} friends</Text>
            </View>
        </View>
    )
}

export default UserInfo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    userInfo: {
        marginLeft: 10,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    stat: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 14,
        color: '#888',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    },
    posts: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    post: {
        width: '33%',
        aspectRatio: 1,
        padding: 1,
    },
    postImage: {
        width: '100%',
        height: '100%',
    },
});