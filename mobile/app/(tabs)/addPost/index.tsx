import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageSelection from '@/components/AddPostCompoments/ImagePicker';
import CameraButton from '@/components/AddPostCompoments/CameraButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { baseUrl } from '@/common/constants';
import { loadImageBase64 } from '@/utils/base64converter';

const AddPost = () => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState()
    const [image, setImage] = useState<{
        uri: string,
        type: string,
        name: string,
    }>();
    const [caption, setCaption] = useState<string>("");

    const handleUpload = async () => {
        if (!image || !caption) {
            console.error('Image and caption are required');
            return;
        }
        const base64Image = await loadImageBase64(image.uri);
        console.log(image)

        try {
            const response = await fetch(`${baseUrl}/posts/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    file: base64Image,
                    caption,
                }),
            });

            if (response.status === 201) {
                const data = await response.json();
                console.log('Post created successfully:', data);
            } else {
                const errorData = await response.json();
                console.error('Error creating post:', errorData);
            }
        } catch (error) {
            console.error('Server error:', error);
        }
    }

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("token");
                setToken(storedToken);
                const storedUser = await AsyncStorage.getItem("user");
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error al recuperar el token:", error);
            }
        };

        fetchToken();
    }, []);

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>New Post</Text>
                <TouchableOpacity onPress={handleUpload}>
                    <Ionicons name="send" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <View style={styles.placeholder}>
                        <Text style={styles.placeholderText}>No Image Selected</Text>
                    </View>
                )}
            </View>
            <TextInput
                style={styles.captionInput}
                placeholder="Write a caption..."
                value={caption}
                onChangeText={setCaption}
            />
            <View style={styles.buttonContainer}>
                <ImageSelection handleUpload={setImage} />
                <CameraButton handleUpload={setImage} />
            </View>
        </GestureHandlerRootView>
    )
}

export default AddPost

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 49
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        borderRadius: 5,
    },
    placeholder: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
    },
    placeholderText: {
        color: '#aaa',
    },
    captionInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        margin: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
    },
})