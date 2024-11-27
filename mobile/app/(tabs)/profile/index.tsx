import { Text, SafeAreaView, View, Button } from 'react-native';
import { useDispatch } from "react-redux";
import { logoutThunk } from "@/store/authSlice";
import { router, useLocalSearchParams } from "expo-router";
import UserInfo from '@/components/ProfileComponents/UserInfo';
import UserPictures from '@/components/ProfileComponents/UserPictures';
import { useSelector } from "react-redux";
import { useCallback, useContext, useEffect, useState } from 'react';
import { baseUrl } from '@/common/constants';
import { PostDTO } from '@/models/post/PostDTO';
import { UserDto } from '@/models/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '@/store/store';
import { ChangeContext } from '@/components/Context/ChangeProvider';

export default function Profile({id} : {id? : string}) {


 
    const [user, setUser] = useState<UserDto | null>(null)
    const [token, setToken] = useState<string | null>(null)

    const [isChanged, setIsChanged] = useContext(ChangeContext)

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem("token");
            setToken(storedToken);
            const storedUser = await AsyncStorage.getItem("user")
            setUser(JSON.parse(storedUser))
            console.log("Token recuperado:", storedToken);
        }
        fetchToken()
    }, [])

    const [profile, setProfile] = useState<{ posts: PostDTO[], user: UserDto } | null>(null)

    // console.log(user)
    // console.log(token)

    
    useEffect(() => {
        if (token && user) {
            console.log("token", token)
            console.log("user", user)
            console.log("id", id)
            const idToFetch = id ? id : user._id
            console.log("idToFetch",idToFetch)

            fetch(baseUrl + '/user/profile/' + idToFetch, {
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
    }, [token, user, isChanged])

    console.log("PROFILE>>>>>>", profile )
    console.log("PROFILE.POSTS>>>>>>>", profile?.posts)

    

    return (
        <SafeAreaView style={{gap :10, margin: 25}} >
            <View>
                {(token && profile && profile.user && profile.posts) && <UserInfo {...profile}></UserInfo>}
            </View>
            <View>
                {(token && profile && profile.posts) && <UserPictures posts={profile.posts}></UserPictures>}
            </View>
        </SafeAreaView>
    );
}
