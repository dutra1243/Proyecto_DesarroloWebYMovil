import { Slot, Tabs } from "expo-router";
import { View, Text, SafeAreaView } from "react-native";
import { Icon } from "react-native-paper";
import Home from "@/app/(tabs)/home";
import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";

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
                <Tabs.Screen name="home" options={{
                    title: "Inicio",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <Foundation name="home" color={focused ? "blue" : "grey"} size={24} />,
                }}
                />
                <Tabs.Screen name="profile" options={{
                    title: "Perfil",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="account" color={focused ? "blue" : "grey"} size={24} />,
                }}
                />
            </Tabs>
        </View>
    );
}
