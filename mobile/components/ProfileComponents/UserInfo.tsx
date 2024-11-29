import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { UserDto } from '@/models/user'
import { PostDTO } from '@/models/post/PostDTO'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { logoutThunk } from '@/store/authSlice'
import { router } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { baseUrl } from '@/common/constants'
import { ChangeContext } from '../Context/ChangeProvider'
import { genericProfilePicture } from '@/common/constants'


const UserInfo = (props: { posts: PostDTO[], user: UserDto }) => {
    const dispatch = useDispatch();


    const handleLogout = async () => {
        await dispatch(logoutThunk());
        router.replace("/");
    }


    const [user, setUser] = useState<UserDto | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isChanged, setIsChanged] = useContext(ChangeContext)

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem("token")
            setToken(storedToken)
            const storedUser = await AsyncStorage.getItem("user");
            setUser(JSON.parse(storedUser));
        }
        fetchToken()
    }, [])

    const handleEdit = () => {
        router.push({ pathname: "/[EditModal]" })
    }

    const [isFriend, setIsFriend] = useState(false)
    const [friendsAmount, setFriendsAmount] = useState(props.user.friends.length)

    useEffect(() => {
        if (user) {
            setIsFriend(props.user.friends.some((friend) => friend._id === user?._id))
        }
    }, [props.user._id, props.user.friends, user])

    const handleRemoveFriend = () => {
        fetch(baseUrl + `/user/remove-friend/${props.user._id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`,
            }
        }).then(response => { return response.json() })
            .then((response) => {
                if (response) {
                    setIsFriend(false)
                    setFriendsAmount(friendsAmount - 1)
                    setIsChanged(!isChanged)
                    alert(response.message);
                }
            })
    }

    const handleAddFriend = () => {

        fetch(baseUrl + `/user/add-friend/${props.user._id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: props.user._id
            })
        }).then(response => { return response.json() })
            .then((response) => {
                if (response) {
                    setIsFriend(true)
                    setFriendsAmount(friendsAmount + 1)
                    setIsChanged(!isChanged)
                } else {
                    alert(response.message);
                }
            })
    }

    const handleShowFriends = () => {
        router.push({ pathname: "/friendsList/[id]", params: { id: props.user._id } })
    }

    return (
        <View style={styles.container}>
            {/* Profile Header */}
            <View style={styles.header}>
                <Image
                    style={styles.profileImage}
                    source={{ uri: props.user.profilePicture || genericProfilePicture }}
                />
                <View style={styles.stats}>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>{props.posts.length}</Text>
                        <Text>Posts</Text>
                    </View>
                    <View style={styles.stat}>
                        <Pressable onPress={handleShowFriends} >
                            <Text style={styles.statNumber}>{friendsAmount}</Text>
                            <Text>Friends</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

            {/* User Info */}
            <Text style={styles.username}>{props.user.username}</Text>
            <Text style={styles.bio}>{props.user.description}</Text>

            {/* Action Buttons */}
            <View style={styles.buttons}>
                {user && props.user.email === user.email ? (
                    <Pressable style={styles.button} onPress={handleEdit}>
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </Pressable>
                ) : isFriend ? (
                    <Pressable style={styles.button} onPress={handleRemoveFriend}>
                        <Text style={styles.buttonText}>Unfriend</Text>
                    </Pressable>
                ) : (
                    <Pressable style={styles.button} onPress={handleAddFriend}>
                        <Text style={styles.buttonText}>Add Friend</Text>
                    </Pressable>
                )}
                <Pressable style={styles.button} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default UserInfo;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8,

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: "#3897f0",
        backgroundColor: "white",
        borderWidth: 1.5,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8,
    },
    stats: {
        flexDirection: 'row',
    },
    stat: {
        alignItems: 'center',
        marginHorizontal: 16,
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    username: {
        marginTop: 8,
        fontSize: 20,
        fontWeight: 'bold',
    },
    bio: {
        marginTop: 4,
        color: '#666',
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 16,
        justifyContent: 'space-around',
    },
    button: {
        backgroundColor: '#3897f0',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8,
    },
    buttonText: {
        color: '#fff',
    },
});