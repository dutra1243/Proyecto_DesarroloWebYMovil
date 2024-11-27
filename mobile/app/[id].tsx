import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserDto } from '@/models/user'
import { PostDTO } from '@/models/post'
import { baseUrl } from '@/common/constants'
import { TextInput } from 'react-native'
import ImageSelection from '@/components/PicureButtons/ImageSelection'
import CameraButton from '@/components/PicureButtons/CameraButton'
import { router } from 'expo-router'
import { ChangeContext } from '@/components/Context/ChangeProvider'


const EditModal = () => {

    const [user, setUser] = useState<UserDto | null>(null)
    const [token, setToken] = useState<string | null>(null)

    const [isChanged, setIsChanged] = useContext(ChangeContext)

    
    
    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem("token");
            setToken(storedToken);
            console.log("Token recuperado:", storedToken);
            const storedUser = await AsyncStorage.getItem("user")
            setUser(JSON.parse(storedUser))
        }
        fetchToken()
    }, [])
    
    const [profile, setProfile] = useState<{ posts: PostDTO[], user: UserDto } | null>(null)
    
    const [profilePicture, setProfilePicture] = useState<string>() 
    
    const [profileToEdit, setProfileToEdit] = useState<{username: string, description: string, profilePicture: string}>({username: "", description: "", profilePicture: ""})
    
    useEffect(() => {
        if (token && user) {
            console.log("token", token)
            console.log("id", user._id)

            fetch(baseUrl + '/user/profile/' + user._id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token
                },
            }).then(response => response.json())
                .then((data) => {
                    console.log("fetch user profile", data)
                    setProfile(data)
                    setProfilePicture(data.user.profilePicture)
                    setProfileToEdit({username: data.user.username, description: data.user.description, profilePicture: data.user.profilePicture})
                }).catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [token, user ])


    const handleSubmit = () => {
        if (token && user) {
            console.log("user id", user._id)
            console.log("profile to edit", profileToEdit)
            fetch(baseUrl + '/user/profile/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    id: user._id,
                    username: profileToEdit.username,
                    description: profileToEdit.description,
                    profilePicture: profilePicture
                })
            }).then((response) => response.json())
                .then((data) => {
                    console.log("fetch edit user profile", data)
                    setIsChanged(!isChanged)
                }).catch((error) => {
                    console.error('Error:', error);
                });
        }
        router.back()
    }

  return (
    <View>
      <View style={{gap :10, margin: 25}} >
        <TextInput value={profileToEdit.username} onChangeText={(text) => setProfileToEdit({...profileToEdit, username :text })} style={styles.textinput} placeholder="Username" />
        <TextInput value={profileToEdit.description} onChangeText={(text) => setProfileToEdit({...profileToEdit, description :text })} style={styles.textinput} placeholder='Description' />
        <View style={{flexDirection: "row", maxWidth: 400, }} >
            <ImageSelection handleUpload={setProfilePicture} ></ImageSelection>
            <CameraButton handleUpload={setProfilePicture} ></CameraButton>
        </View>
        <Button title="submit" onPress={handleSubmit} ></Button>
      </View>
    </View>
  )
}

export default EditModal

const styles = StyleSheet.create({
    textinput: {
        backgroundColor : "white",
        padding : 15,
        borderRadius: 10
    }
})