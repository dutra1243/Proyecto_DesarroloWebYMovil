import {Dimensions, Image, SafeAreaView, Text, View} from "react-native";
import {Button, TextInput} from "react-native-paper";
import {router} from "expo-router";
import {useDispatch} from "react-redux";
import {loginThunk} from "@/store/authSlice";
import {useState} from "react";
import GradientText from "@/components/GradientText";
import {Colors} from "@/constants/Colors";

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
        <SafeAreaView style={styles.container}>
            <View style={styles.topSpace}/>
            <View style={styles.titleContainer}>
                <GradientText colors={['#8e2de2', '#f64f59', '#4facfe', '#f093fb']} style={styles.title}>
                    Fakegram
                </GradientText>
            </View>
            <View style={styles.contentContainer}>
                <TextInput
                    mode="outlined"
                    label="Email"
                    placeholder="Email"
                    onChangeText={text => setLoginRequest({...loginRequest, email: text})}
                    style={styles.input}
                />
                <TextInput
                    mode="outlined"
                    label="Password"
                    placeholder="Password"
                    onChangeText={text => setLoginRequest({...loginRequest, password: text})}
                    secureTextEntry
                    style={styles.input}
                />
                <Button
                    mode="contained-tonal"
                    buttonColor={Colors.lightSkyBlue}
                    onPress={handleLogin}
                >
                    Iniciar sesión
                </Button>
                <Text>
                    ¿No tienes cuenta? <Text onPress={() => router.replace("/(auth)/signUp")}>Regístrate</Text>
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = {
    container: {
        flex: 1,
    },
    topSpace: {
        flex: 0.2,
    },
    titleContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 55,
        fontFamily: "Custom",
        lineHeight: 150,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 16,
        gap: 16,
    },
    input: {
        width: '100%',
    },
};
