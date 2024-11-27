import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { baseUrl } from '@/common/constants'
import { useLocalSearchParams } from 'expo-router'
import { PostDTO } from '@/models/post'
import { UserDto } from '@/models/user'
import FriendCard from '@/components/FriendsComponents/FriendCard'


const friendsList = () => {

  const [user, setUser] = useState<UserDto | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const [profile, setProfile] = useState<{ posts: PostDTO[], user: UserDto } | null>(null)


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

  let id = useLocalSearchParams().id

  if (Array.isArray(id)) {
    id = id[0];
  }

  useEffect(() => {
    if (token && id) {
      console.log("id", id)
      fetch(baseUrl + "/user/profile/" + id, {
        method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + token
          },
      }).then(response => response.json())
          .then((data) => {
              console.log("fetch user profile", data)
              setProfile(data)
          }).catch((error) => {
              console.error('Error:', error);
          });
    }
  }, [token])

  return (
    <View style={styles.container} >
      <View style={{margin: 15}} >
        {token && profile && <FlatList data={profile.user.friends} renderItem={({item}) => <FriendCard {...item} ></FriendCard>} ></FlatList>}
      </View>
    </View>
  )
}

export default friendsList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
},
})