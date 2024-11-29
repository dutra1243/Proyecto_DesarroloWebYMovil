import {SafeAreaView, Text, View} from "react-native";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {loginThunk, signUpThunk} from "@/store/authSlice";
import {router} from "expo-router";
import GradientText from "@/components/GradientText";
import {Button, TextInput} from "react-native-paper";
import {Colors} from "@/constants/Colors";

export default function SignUp() {
    const dispatch = useDispatch();

    const [signUpRequest, setSignUpRequest] = useState({username: '', email: '', password: ''})

    const handleSignup = async () => {
        try {
            const result = await dispatch(signUpThunk(signUpRequest)).unwrap();
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
                    label="Username"
                    placeholder="Username"
                    onChangeText={text => setSignUpRequest({...signUpRequest, username: text})}
                    style={styles.input}
                />
                <TextInput
                    mode="outlined"
                    label="Email"
                    placeholder="Email"
                    onChangeText={text => setSignUpRequest({...signUpRequest, email: text})}
                    style={styles.input}
                />
                <TextInput
                    mode="outlined"
                    label="Password"
                    placeholder="Password"
                    onChangeText={text => setSignUpRequest({...signUpRequest, password: text})}
                    secureTextEntry
                    style={styles.input}
                />
                <Button
                    mode="contained-tonal"
                    buttonColor={Colors.lightSkyBlue}
                    onPress={handleSignup}
                >
                    Crear cuenta
                </Button>
                <Text>
                    ¿Ya tienes cuenta? <Text onPress={() => router.replace("/(auth)/signIn")}>Inicia sesión</Text>
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

