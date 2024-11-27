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
import Profile from '../(tabs)/profile/index';

export default function ProfileFromHome() {


    let id = useLocalSearchParams().id

    if (Array.isArray(id)) {
        id = id[0];
    }


    return (
        <SafeAreaView>
            <Profile id={id}></Profile>
        </SafeAreaView>
    );
}
