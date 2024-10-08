import React from 'react'
import { Sidebar } from '../sidebar/Sidebar'
import { UserInfo } from './userInfo/UserInfo'
import { UserPictures } from './userPictures/UserPictures'

export const Profile = () => {
    return (
        <>
            <Sidebar />
            <UserInfo />
            <UserPictures />
        </>
    )
}
