import {Navigator, Stack} from "expo-router";
import Slot = Navigator.Slot;
import {View} from "react-native";
import {PaperProvider} from "react-native-paper";
import {SafeAreaProvider} from "react-native-safe-area-context";


export default function RootLayout() {
    return (
        <PaperProvider>
            <SafeAreaProvider>
                <Slot/>
            </SafeAreaProvider>
        </PaperProvider>
    );
}
