import { Navigator, Stack } from "expo-router";
import Slot = Navigator.Slot;
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import ChangeProvider from "@/components/Context/ChangeProvider";


export default function RootLayout() {
    return (
        <PaperProvider>
            <ChangeProvider>
                <Provider store={store}>
                    <SafeAreaProvider>
                        <Stack>
                            <Stack.Screen name="index" />
                            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                            <Stack.Screen name="profileById/[id]" options={{headerTitle: "Profile", headerTitleAlign: "center"}} />
                            <Stack.Screen name="friendsList/[id]" options={{headerTitle: "Friends", headerTitleAlign: "center"}} />
                            <Stack.Screen name="[id]"  options={{headerTitle: "Edit your profile", headerTitleAlign: "center"}} />
                        </Stack>
                    </SafeAreaProvider>
                </Provider>
            </ChangeProvider>
        </PaperProvider>
    );
}
