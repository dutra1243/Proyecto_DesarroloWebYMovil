import {SafeAreaView, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";

export default function Home() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("token");
                setToken(storedToken);
                console.log("Token recuperado:", storedToken);
            } catch (error) {
                console.error("Error al recuperar el token:", error);
            }
        };

        fetchToken();
    }, []);

    return (
        <SafeAreaView>
            <Text>HomeEE</Text>
            {token && <Text>Token: {token}</Text>}
        </SafeAreaView>
    );
}

