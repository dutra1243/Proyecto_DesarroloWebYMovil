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
    <View style={styles.card}>
        <Image
            style={styles.image}
            source={{ uri: profilePicture || genericProfilePicture }}
        />
        <View style={styles.textContainer}>
            <Text style={styles.username}>{username}</Text>
            {description ? <Text style={styles.description}>{description}</Text> : null}
        </View>
    </View>
);
};

export default FriendCard;

const styles = StyleSheet.create({
card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 16,
},
image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderColor : "#3897f0",
    backgroundColor: "white",
    borderWidth: 1.5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
},
textContainer: {
    flex: 1,
},
username: {
    fontSize: 18,
    fontWeight: 'bold',
},
description: {
    fontSize: 14,
    color: '#666',
},
});