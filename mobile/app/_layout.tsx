import { Navigator, Stack } from "expo-router";
import Slot = Navigator.Slot;
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "@/store/store";


export default function RootLayout() {
    return (
        <PaperProvider>
            <Provider store={store}>
                <SafeAreaProvider>
                    <Stack>
                        <Stack.Screen name="index" />
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="profileById/[id]" options={{headerTitle: "Profile", headerTitleAlign: "center"}} />
                        <Stack.Screen name="[id]"  options={{headerTitle: "Edit your profile", headerTitleAlign: "center"}} />
                    </Stack>
                </SafeAreaProvider>
            </Provider>
        </PaperProvider>
    );
}
