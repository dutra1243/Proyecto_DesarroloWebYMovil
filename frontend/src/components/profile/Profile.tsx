import React, { useDebugValue, useEffect } from 'react'
import { Sidebar } from '../sidebar/Sidebar'
import { UserInfo } from './userInfo/UserInfo'
import { UserPictures } from './userPictures/UserPictures'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { baseUrl } from '../../common/constants'
import { useState } from 'react'
import { UserDto } from '../../models/user'
import { PostDTO } from '../../models/post/PostDTO'
import { Post } from '../post/Post'

export const Profile = () => {
    const token = useSelector((state: any) => state.auth.token)
    const username = useSelector((state: any) => state.auth.username)
    const userId = useParams().id as String;

    const [selectedPost, setSelectedPost] = useState<PostDTO>();
    const [user, setUser] = useState<UserDto>({
        username: '',
        email: '',
        password: '',
        profilePicture: '',
        createdAt: new Date
    });
    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        fetch(`${baseUrl}/user/profile/${userId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`,
            }
        }).then(response =>
            response.json()).then(data => {
                setUser(data.user)
            }).then(() => {
                setIsEditable(username === user.username)
            })
        console.log({ user })
    }, [])


    return (
        <>
            <Sidebar />
            {selectedPost && <Post {...selectedPost} />}
            <UserInfo username={user.username} profilePicture={user.profilePicture} isEditable={isEditable} />
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
