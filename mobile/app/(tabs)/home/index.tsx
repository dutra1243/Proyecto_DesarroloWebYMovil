import { SafeAreaView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { PostDTO } from "@/models/post";
import Feed from "../../../components/FeedComponents/Feed";
import { baseUrl } from "@/common/constants";
import { useSelector } from "react-redux";

export default function Home() {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState()

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("token");
                setToken(storedToken);
                const storedUser = await AsyncStorage.getItem("user");
                setUser(storedUser);
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
            {user && <Text>User: {user}</Text>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
    },
})

