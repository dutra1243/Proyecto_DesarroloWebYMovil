import {View, Text, SafeAreaView} from 'react-native';
import {Button} from "react-native-paper";
import {router} from "expo-router";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GradientText from "@/components/GradientText";
import {useFonts} from "expo-font";
import {Colors} from "@/constants/Colors";

export default function Index() {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const {} = useFonts({
        Custom: require("../assets/fonts/Custom-font.ttf")
    })

    const handleLogin = () => {
        router.replace("/(auth)/signIn");
    }

    const handleRegister = () => {
        router.replace("/(auth)/signUp");
    }

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("token");
                setToken(storedToken);
                console.log("Token recuperado:", storedToken);
                if (storedToken) {
                    router.replace("/(tabs)/home");
                }
            } catch (error) {
                console.error("Error al recuperar el token:", error);
            } finally {
                setLoading(false); // Indica que hemos terminado de buscar el token
            }
        };
        console.log(styles.title.fontFamily)

        fetchToken();
    }, []);

    if (loading) {
        return (
            <SafeAreaView>
                <Text>Cargando...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <GradientText colors={['#8e2de2', '#f64f59', '#4facfe', '#f093fb']} style={styles.title}>
                Fakegram
            </GradientText>

            <Button mode="contained-tonal"
                    buttonColor={"rgba(79,172,254,0.09)"}
                    onPress={handleRegister}
            >
                Crear una cuenta
            </Button>
            <Button
                mode="contained-tonal"
                buttonColor={Colors.lightSkyBlue}
                onPress={handleLogin}
            >
                Ya estoy registrado
            </Button>
            {token && <Text>Token: {token}</Text>}
        </SafeAreaView>
    );
}
const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    title: {
        fontSize: 55,
        fontFamily: "Custom",
        lineHeight: 150,
    },
}

