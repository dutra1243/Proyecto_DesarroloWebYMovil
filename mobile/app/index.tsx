import {View, Text, SafeAreaView} from 'react-native';
import {Button} from "react-native-paper";
import {router} from "expo-router";

export default function Index() {

    const handleLogin = () => {
        router.replace("/(auth)/signIn");
    }

    const handleRegister = () => {
        router.replace("/(auth)/signUp");
    }

    return (
        <SafeAreaView>
            <Button
                onPress={handleRegister}
            >
                Crear una cuenta
            </Button>
            <Button
                onPress={handleLogin}
            >
                Ya estoy registrado
            </Button>
        </SafeAreaView>
    );
}
