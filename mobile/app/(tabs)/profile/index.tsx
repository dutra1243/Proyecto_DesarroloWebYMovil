import { Text, SafeAreaView, View, Button } from 'react-native';
import { useDispatch } from "react-redux";
import { logoutThunk } from "@/store/authSlice";
import { router } from "expo-router";
import UserInfo from '@/components/ProfileComponents/UserInfo';
import UserPictures from '@/components/ProfileComponents/UserPictures';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { baseUrl } from '@/common/constants';
import { PostDTO } from '@/models/post/PostDTO';
import { UserDto } from '@/models/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
    const dispatch = useDispatch();


    const handleLogout = async () => {
        await dispatch(logoutThunk());
        router.replace("/");
    }

    const user = useSelector((state) => state.auth.user);
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem("token");
            setToken(storedToken);
            console.log("Token recuperado:", storedToken);
        }
        fetchToken()
    }, [])

    const [profile, setProfile] = useState<{ posts: PostDTO[], user: UserDto }>()

    // console.log(user)
    // console.log(token)

    useEffect(() => {
        console.log("user", user)
        console.log("user id", user._id)
        console.log("token", token)
        fetch(baseUrl + '/user/profile/' + user._id, {
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
    }, [token])

    return (
        <SafeAreaView>
            <View>
                {(token && profile) && <UserInfo {...profile}></UserInfo>}
                <Button title="Logout" onPress={handleLogout}></Button>
            </View>
            <View>
                {(token && profile) && <UserPictures {...profile.posts}></UserPictures>}
            </View>
            <View>
            </View>
        </SafeAreaView>
    );
}
