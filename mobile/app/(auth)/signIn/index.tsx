import {SafeAreaView, Text} from "react-native";
import {Button} from "react-native-paper";
import {router} from "expo-router";

export default function SignIn() {

    const handleLogin = () => {
        router.replace("/(tabs)/home");
    }

    return (
        <SafeAreaView>
            <Text>SignIn</Text>
            <Text>SignIn</Text>
            <Text>SignIn</Text>
            <Text>SignIn</Text>
            <Text>SignIn</Text>
            <Text>SignIn</Text>
            <Text>SignIn</Text>
            <Text>SignIn</Text>
            <Button
                onPress={handleLogin}
            >
                Iniciar sesión
            </Button>
        </SafeAreaView>
    );
}
