import { Text, View, Image, StyleSheet, Alert, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

type ImageSelectionProps = {
    handleUpload: (image: string) => void;
}
 
export default function CameraButton(props: ImageSelectionProps) {
    const [image, setImage] = useState<string>();

    const takeImage = async () => {
        await ImagePicker.requestCameraPermissionsAsync()
        ImagePicker.getCameraPermissionsAsync().then((res) => {
            if (res.granted) {
                ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                }).then((result) => {
                    if (!result.canceled) {
                        props.handleUpload(result.assets[0].uri);
                    }
                });
            } else {
                Alert.alert("Permission required", "You need to allow camera permissions to take a photo");
            }
        })
    }

    const styles = StyleSheet.create({
        button: {
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: 'black',
            padding: 10,
            borderRadius: 5,
            width: '100%',
            alignSelf: 'center',
            textAlign: 'center',
        },
        text: {
            textAlign: 'center',
            fontSize: 18,
        }
    })

    return (
        <View>
            <Pressable onPress={takeImage}>
                <AntDesign size={40} name="camera" ></AntDesign>
            </Pressable>
        </View>
    );
}