import { Text, SafeAreaView, View, Button } from 'react-native';
import { useDispatch } from "react-redux";
import { logoutThunk } from "@/store/authSlice";
import { router, useLocalSearchParams } from "expo-router";
import UserInfo from '@/components/ProfileComponents/UserInfo';
import UserPictures from '@/components/ProfileComponents/UserPictures';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { baseUrl } from '@/common/constants';
import { PostDTO } from '@/models/post/PostDTO';
import { UserDto } from '@/models/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileFromHome() {


    const [user, setUser] = useState<UserDto | null>(null)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem("token");
            setToken(storedToken);
            console.log("Token recuperado:", storedToken);
        }
        fetchToken()
    }, [])

    const [profile, setProfile] = useState<{ posts: PostDTO[], user: UserDto } | null>(null)

    const id = useLocalSearchParams().id

    // console.log(user)
    // console.log(token)

    useEffect(() => {
        if (token) {
            console.log("token", token)
            console.log("id", id)

            fetch(baseUrl + '/user/profile/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token
                },
            }).then(response => response.json())
                .then((data) => {
                    console.log("fetch user profile", data)
                    setProfile(data)
                }).catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [token, user])

    return (
        <SafeAreaView>
            <View>
                {(token && profile && profile.user && profile.posts) && <UserInfo {...profile}></UserInfo>}
            </View>
            <View>
                {(token && profile && profile.posts) && <UserPictures posts={profile.posts}></UserPictures>}
            </View>
        </SafeAreaView>
    );
}
