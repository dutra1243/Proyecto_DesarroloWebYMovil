import { Text, View, Image, StyleSheet, Alert, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import React from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

type ImageSelectionProps = {
    handleUpload: (image: string) => void;
}

const ImageSelection = (props: ImageSelectionProps) => {

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            props.handleUpload(result.assets[0].uri);
        } else {
            Alert.alert("Permission required", "You need to allow camera permissions to take a photo");
        }
    }
    return (
        <View>
            <Pressable onPress={pickImage}>
                <AntDesign size={40} name="picture" ></AntDesign>
            </Pressable>
        </View>
    )
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

export default ImageSelection