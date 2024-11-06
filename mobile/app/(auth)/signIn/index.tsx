import {Image, SafeAreaView, Text, View} from "react-native";
import {Button, TextInput} from "react-native-paper";
import {router} from "expo-router";
import {useDispatch} from "react-redux";
import {loginThunk} from "@/store/authSlice";
import {useState} from "react";
import GradientText from "@/components/GradientText";

export default function SignIn() {
    const dispatch = useDispatch();

    const [loginRequest, setLoginRequest] = useState({email: '', password: ''})

    const handleLogin = async () => {
        try {
            const result = await dispatch(loginThunk(loginRequest)).unwrap();
            console.log({
                result
            })
            if (result) {
                router.replace("/(tabs)/home");
            }
        } catch (e) {
            console.log('Login failed: ', e);
        }
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <GradientText colors={['#8e2de2', '#f64f59', '#4facfe', '#f093fb']} style={styles.title}>
                    Fakegram
                </GradientText>
                <TextInput
                    mode="outlined"
                    label="Email"
                    placeholder="Email"
                    onChangeText={text => setLoginRequest({...loginRequest, email: text})}
                />
                <TextInput
                    mode="outlined"
                    label="Password"
                    placeholder="Password"
                    onChangeText={text => setLoginRequest({...loginRequest, password: text})}
                    secureTextEntry
                />
                <Button
                    onPress={handleLogin}
                >
                    Iniciar sesión
                </Button>
            </View>
        </SafeAreaView>
    );
}

const styles = {
    container: {
        flex: 1,
        marginHorizontal: 16,
        justifyContent: 'center',
        gap: 20,
    },
    title: {
        fontSize: 55,
        fontFamily: "Custom",
        lineHeight: 150,
    },
}
