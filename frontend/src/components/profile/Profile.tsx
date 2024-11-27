import React, { useDebugValue, useEffect } from 'react'
import { Sidebar } from '../sidebar/Sidebar'
import { UserInfo } from './userInfo/UserInfo'
import { UserPictures } from './userPictures/UserPictures'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { baseUrl } from '../../common/constants'
import { useState } from 'react'
import { PostDTO } from '../../models/post/PostDTO'
import { Post } from '../post/Post'
import "./Profile.css"

export const Profile = () => {
    const token = useSelector((state: any) => state.auth.token)
    const username = useSelector((state: any) => state.auth.user.username)
    const userId = useParams().id as String;
    const [selectedPost, setSelectedPost] = useState<PostDTO>();
    const [user, setUser] = useState({
        username: '',
        email: '',
        profilePicture: '',
        friends: [],
        _id: '',
        description: ''
    });
    const [isEditable, setIsEditable] = useState(false);
    const [updateProfile, setUpdateProfile] = useState(false);

    const handleUpdateProfile = () => {
        setUpdateProfile(!updateProfile)
    }

    useEffect(() => {
        fetch(`${baseUrl}/user/profile/${userId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`,
            }
        }).then(response =>
            response.json()).then(data => {
                setUser({
                    username: data.user.username,
                    email: data.user.email,
                    friends: data.user.friends,
                    _id: data.user._id,
                    profilePicture: data.user.profilePicture,
                    description: data.user.description
                })
                console.log(username, data.user.username)
                setIsEditable(username === data.user.username)
            })
    }, [userId, updateProfile])


    return (
        <>
            <Sidebar />
            {selectedPost && <Post {...selectedPost} />}
            <UserInfo username={user.username} handleUpdate={() => handleUpdateProfile()} userId={userId} profilePicture={user.profilePicture} description={user.description} friends={user.friends} isEditable={isEditable} />
            {selectedPost && (
                <div
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setSelectedPost(undefined);
                        }
                    }}
                >
                    <Post {...selectedPost} />
                </div>
            )}
            <UserPictures id={userId} openPostModal={setSelectedPost} />
        </>
    )
}
