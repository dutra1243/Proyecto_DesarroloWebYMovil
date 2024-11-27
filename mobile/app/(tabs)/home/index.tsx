import { SafeAreaView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { PostDTO } from "@/models/post";
import Feed from "../../../components/FeedComponents/Feed";
import { baseUrl } from "@/common/constants";
import { useSelector } from "react-redux";

export default function Home() {
    const token = useSelector((state: any) => state.auth.token._j)

    const [posts, setPosts] = useState<PostDTO[]>([]);

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
            <Text>Home</Text>
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
        fontSize: 20,
    },
})

