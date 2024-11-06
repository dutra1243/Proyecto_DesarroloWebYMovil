import {Text, SafeAreaView} from 'react-native';
import {Button} from "react-native-paper";
import {useDispatch} from "react-redux";
import {logoutThunk} from "@/store/authSlice";
import {router} from "expo-router";

export default function Profile() {
    const dispatch = useDispatch();


    const handleLogout = async () => {
        await dispatch(logoutThunk());
        router.replace("/");
    }

    return (
        <SafeAreaView>
            <Text>Profile Tab</Text>
            <Button
                onPress={handleLogout}
            >
                Logout
            </Button>
        </SafeAreaView>
    );
}
