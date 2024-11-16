import { SafeAreaView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { PostDTO } from "@/models/post";
import Feed from "../../../components/FeedComponents/Feed";

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

    const [posts, setPosts] = useState<PostDTO[]>([]);

    useEffect(() => {
        fetch(process.env.EXPO_PUBLIC_LOCALHOST_FACU + "/posts/feed", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTQzYzhjYjJlMGI2YjNjZWMxNDBiOCIsImlhdCI6MTczMTYyMTIzMywiZXhwIjoxNzM0MjEzMjMzfQ.lCdoma_msL8VUPh-8s1fFBpHl2G5ulN9B72cSzO219M "}`,
            }
        }).then(response => response.json())
            .then(data => {
                console.log("fetched data correctly");
                setPosts(data);
            }).catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <SafeAreaView style={styles.container} >
            <Text>Home</Text>
            {/* {token && <Text>Token: {token}</Text>} */}
            {token && <Feed {...posts}></Feed>}
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

