import { SafeAreaView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { PostDTO } from "@/models/post";
import Feed from "../../../components/FeedComponents/Feed";
import { baseUrl } from "@/common/constants";
import { useSelector } from "react-redux";

export default function Home() {

    const [posts, setPosts] = useState<PostDTO[]>([]);

    const [token, setToken] = useState(null);


    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("token");
                setToken(storedToken);
            } catch (error) {
                console.error("Error al recuperar el token:", error);
            }
        };

        fetchToken();
    }, []);

    useEffect(() => {
        fetch(baseUrl + "/posts/feed", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }).then(response => response.json())
            .then(data => {
                setPosts(data);
            });
    }, [token]);

    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.header}>
                <Text style={styles.text}>Fakegram</Text>
            </View>
            {posts.length > 0 && <Feed {...posts} />}
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
        fontSize: 23,
        fontFamily: "Playwrite GB S",
        lineHeight: 36, // 1.8 * 20
        backgroundClip: "text",
        marginLeft: 10,
    },
    header: {
        backgroundColor: "white",
        height: 50,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});