import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { genericProfilePicture } from '@/common/constants'

const FriendCard = ({_id, description, profilePicture, username} : 
    {
        _id: string,
        description: string,
        profilePicture: string, 
        username: string
    }
) => {
  return (
    <View style={{flexDirection: "row", margin: 30, gap: 25, flexWrap: "wrap"}} >
      {profilePicture !== "" ? <Image style={styles.image} source={{ uri: profilePicture }} ></Image>
                    : <Image style={styles.image} source={{ uri: genericProfilePicture }} ></Image>}
        <Text style={{fontSize : 30}}>{username}</Text>

    </View>
  )
}

export default FriendCard

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
})