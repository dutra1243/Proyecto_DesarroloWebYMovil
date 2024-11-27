import { Text, View, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";

type ImageSelectionProps = {
    handleUpload: (image: {
        uri: string,
        type: string,
        name: string,
    }) => void;
}

export default function CameraButton(props: ImageSelectionProps) {

    const takeImage = async () => {
        await ImagePicker.requestCameraPermissionsAsync()
        ImagePicker.getCameraPermissionsAsync().then((res) => {
            if (res.granted) {
                ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                }).then((result) => {
                    if (!result.canceled) {
                        props.handleUpload({
                            uri: result.assets[0].uri,
                            type: result.assets[0].type || 'image/jpeg',
                            name: result.assets[0].fileName || 'default_name.jpg',
                        });
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
            borderRadius: 30,
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
            <TouchableOpacity style={styles.button} onPress={takeImage}>
                <Text style={styles.text}>Take photo</Text>
            </TouchableOpacity>
        </View>
    );
}
