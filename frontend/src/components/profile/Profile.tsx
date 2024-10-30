import React, { useEffect } from 'react'
import { Sidebar } from '../sidebar/Sidebar'
import { UserInfo } from './userInfo/UserInfo'
import { UserPictures } from './userPictures/UserPictures'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { baseUrl } from '../../common/constants'
import { useState } from 'react'
import { UserDto } from '../../models/user'

export const Profile = () => {
    const userId = useParams().id;
    const token = useSelector((state: any) => state.auth.token)

    const [user, setUser] = useState<UserDto>({
        username: '',
        email: '',
        password: '',
        profilePicture: '',
        createdAt: new Date
    });

    useEffect(() => {
        fetch(`${baseUrl}/users/${userId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`,
            }
        }).then(response => response.json()).then(data => { setUser(data) })
    })

    return (
        <>
            <Sidebar />
            <UserInfo username={user.username} profilePicture={user.profilePicture} />
            <UserPictures />
        </>
    )
}
