import {SafeAreaView, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
    console.log(AsyncStorage.getItem("token"));
    return (
        <SafeAreaView>
            <Text>HomeEE</Text>
        </SafeAreaView>
    );
}

