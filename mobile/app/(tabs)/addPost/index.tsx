import React, { useState, useEffect, useRef } from 'react';
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { Button, Text, SafeAreaView, ScrollView, StyleSheet, Image, View, TouchableOpacity, TextInput, Alert, Pressable, FlatList } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { router, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { baseUrl } from '@/common/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreatePost() {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [caption, setcaption] = useState("");
    const [page, setPage] = useState(1);
    const [useCamera, setUseCamera] = useState(false);
    const [facing, setFacing] = useState<'back' | 'front'>('back');
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [permission, requestCameraPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const navigation = useNavigation();
    const [token, setToken] = useState(null);



    useEffect(() => {
        const retrieveToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("token");
                setToken(storedToken);
            } catch (error) {
                console.error("Error retrieving token:", error);
            }
        };
        retrieveToken();
    }, []);

    useEffect(() => {
        requestCameraPermission();
        requestPermission();
    }, []);

    useEffect(() => {
        if (permissionResponse?.status === 'granted') {
            loadImages(page);
        }
    }, [permissionResponse, page]);

    const loadImages = async () => {
        try {
            const albumAssets = await MediaLibrary.getAssetsAsync({
                first: 10,
                after: images.length > 0 ? images[images.length - 1].id : undefined,
                mediaType: 'photo',
            });

            const imagePromises = await Promise.all(albumAssets.assets.map(async (asset) => {
                const localUri = await getLocalUri(asset.id);
                const compressedUri = await compressImage(localUri);
                return { id: asset.id, uri: compressedUri };
            }));

            setImages([...images, ...imagePromises].filter((image, index, self) => self.findIndex((t) => t.id === image.id) === index));
        } catch (error) {
            Alert.alert("Error", "Error loading images.");
        }
    };

    const getLocalUri = async (id) => {
        try {
            const assetInfo = await MediaLibrary.getAssetInfoAsync(id);
            if (!assetInfo) throw new Error('Asset info is null');
            const localUri = assetInfo.localUri || assetInfo.uri;
            const fileInfo = await FileSystem.getInfoAsync(localUri);

            if (!fileInfo.exists) {
                const downloadResumable = FileSystem.createDownloadResumable(
                    localUri,
                    FileSystem.documentDirectory + 'photo.jpg'
                );
                const { uri: downloadedUri } = await downloadResumable.downloadAsync();
                return downloadedUri;
            } else {
                return localUri;
            }
        } catch (error) {
            console.error("Error getting local URI:", error);
            return uri;
        }
    };

    const compressImage = async (uri) => {
        try {
            const manipResult = await ImageManipulator.manipulateAsync(
                uri,
                [{ resize: { width: 300 } }],
                { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
            );
            return manipResult.uri;
        } catch (error) {
            console.error("Error compressing image:", error);
            return uri;
        }
    };

    const handleSelectImage = async (uri) => {
        setUseCamera(false);
        setSelectedImage(uri);
    };

    const handleSubmit = async (selectedImage, caption) => {
        if (!selectedImage || !caption) {
            Alert.alert("Error", "Please select an image and write a caption.");
            return;
        }

        const formData = new FormData();
        formData.append("image", {
            uri: selectedImage,
            name: "photo.jpg",
            type: "image/jpeg",
        });
        formData.append("caption", caption);

        try {
            const response = await axios.post(baseUrl + '/posts/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                router.push('/');
                Alert.alert("Success", "Post uploaded successfully.");
                setSelectedImage(null);
                setcaption("");
            } else {
                Alert.alert("Error", "An error occurred while uploading the post.");
            }
        } catch (error) {
            console.error("Error uploading post:", error.response.data);
            Alert.alert("Error", "An error occurred while uploading the post.");
        }
    };

    const handleUseCamera = () => {
        setUseCamera((prev) => !prev);
    };

    const handleFlipCamera = () => {
        setFacing((prev) => prev === 'back' ? 'front' : 'back');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.selectedImageContainer}>
                {useCamera ? (
                    <CameraView
                        facing={facing}
                        style={styles.selectedImage}
                        ref={cameraRef}
                        onPictureTaken={(photo: any) => {
                            setSelectedImage(photo.uri);
                            setUseCamera(false);
                        }}
                    >
                        <Pressable
                            onPress={() => cameraRef?.current?.takePictureAsync?.()
                                .then(photo => {
                                    setSelectedImage(photo.uri);
                                    setUseCamera(false);
                                })}
                            style={styles.takePictureButton}
                        >
                            <Ionicons name="camera" size={24} color="white" />
                        </Pressable>
                        <Pressable
                            onPress={handleFlipCamera}
                            style={styles.flipCameraButton}
                        >
                            <Ionicons name="camera-reverse" size={24} color="white" />
                        </Pressable>
                    </CameraView>
                ) : (
                    <>
                        <Pressable onPress={handleUseCamera} style={styles.camera}>
                            <Ionicons name="camera" size={24} color="white" />
                        </Pressable>
                        <View style={styles.pictureHolder}>
                            {selectedImage && <Image source={{ uri: selectedImage }} style={styles.selectedImage} />}
                        </View>
                    </>
                )}
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Caption"
                    onChangeText={setcaption}
                    value={caption}
                />
            </View>
            <TouchableOpacity onPressIn={() => handleSubmit(selectedImage, caption)} style={styles.button}>
                <Text style={styles.buttonText}>Upload Post</Text>
            </TouchableOpacity>
            <FlatList
                data={images}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelectImage(item.uri)}>
                        <Image source={{ uri: item.uri }} style={styles.imageThumbnail} />
                    </TouchableOpacity>
                )}
                numColumns={3}
                onEndReached={() => setPage(page + 1)}
                onEndReachedThreshold={0.5}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pictureHolder: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        marginTop: 16
    },
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    camera: {
        position: 'absolute',
        marginTop: '95%',
        marginRight: 'auto',
        zIndex: 2,
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 50,
    },
    imageThumbnail: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 8,
    },
    selectedImageContainer: {
        alignItems: 'center',
        marginVertical: 8,
    },
    selectedImage: {
        width: '80%',
        aspectRatio: 1,
        borderRadius: 8,

    },
    inputContainer: {
        width: '80%',
        marginVertical: 16,
    },
    input: {
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        width: '80%',
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    takePictureButton: {
        position: 'absolute',
        left: 130,
        bottom: 20,
        zIndex: 2,
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 50,
    },
    flipCameraButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 2,
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 50,
    },
});
