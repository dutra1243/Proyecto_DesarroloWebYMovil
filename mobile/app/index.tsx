import {View, Text, SafeAreaView} from 'react-native';
import {Button} from "react-native-paper";
import {router} from "expo-router";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

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
            {token && <Text>Token: {token}</Text>}
        </SafeAreaView>
    );
}
