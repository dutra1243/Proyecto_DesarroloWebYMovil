import {Navigator, Stack} from "expo-router";
import {SafeAreaView, Text, View} from "react-native";
import Slot = Navigator.Slot;

export default function AuthLayout() {

    return (
        <View style={{flex: 1, backgroundColor: "blue"}}
        >
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        // backgroundColor: "blue",
                    },
                }}
            >
                <Stack.Screen name="signIn/index" options={{headerShown: false}}/>
                <Stack.Screen name="signUp/index" options={{headerShown: false}}/>
            </Stack>
        </View>
    );
}
