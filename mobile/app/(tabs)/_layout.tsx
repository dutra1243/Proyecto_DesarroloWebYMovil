import { Slot, Tabs } from "expo-router";
import { View, Text, SafeAreaView } from "react-native";
import { Icon } from "react-native-paper";
import Home from "@/app/(tabs)/home";

export default function TabsLayout() {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "red",
            }}
        >
            <Tabs
            >
                <Tabs.Screen name="home/index" options={{
                    title: "Inicio",
                    headerShown: false,
                }}
                />
                <Tabs.Screen name="addPost/index" options={{
                    title: "Añadir",
                    headerShown: false,
                }}
                />
                <Tabs.Screen name="profile/index" options={{
                    title: "Perfil",
                    headerShown: false,
                }}
                />
            </Tabs>
        </View>
    );
}
