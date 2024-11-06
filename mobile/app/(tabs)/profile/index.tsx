import {Text, SafeAreaView} from 'react-native';
import {Button} from "react-native-paper";
import {useDispatch} from "react-redux";
import {logoutThunk} from "@/store/authSlice";

export default function Profile() {
    const dispatch = useDispatch();


    const handleLogout = async () => {
        await dispatch(logoutThunk());
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
