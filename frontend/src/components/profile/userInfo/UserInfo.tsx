import React, { useEffect, useMemo } from 'react'
import { EditProfileModal } from './EditProfileModal';
import { FriendsModal } from './FriendsModal';
import { baseUrl } from '../../../common/constants';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

type FriendsInfo = {
    profilePicture: string,
    username: string,
    _id: string
}

type UserInfoProps = {
    username: string;
    userId: String,
    profilePicture: string,
    isEditable: boolean;
    friends: FriendsInfo[];
    description: string;
    handleUpdate: () => void;
}

export const UserInfo = ({ username, profilePicture, isEditable, friends, userId, handleUpdate, description }: UserInfoProps) => {
    const token = useSelector((state: any) => state.auth.token)
    const loggedId = useSelector((state: any) => state.auth.user._id)
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [showFriendsModal, setShowFriendsModal] = React.useState(false);
    const [isFriend, setIsFriend] = React.useState(false);

    useEffect(() => {
        handleUpdate()
    }, [isFriend])

    useEffect(() => {
        setIsFriend(friends.some(friend => friend._id === loggedId))
    }, [userId, friends])

    const handleUnfriend = () => {
        handleUpdate()
    }

    const addFriend = async () => {
        const response = await fetch(`${baseUrl}/user/add-friend/${userId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: userId
            })
        }).then(response => { return response.json() })
        if (response) {
            setIsFriend(true);
        } else {
            alert(response.message);
        }
    }
    return (
        <div className="user-info">
            {showFriendsModal &&
                <FriendsModal friends={friends} userId={userId} userEditMode={isEditable} toggleModal={setShowFriendsModal} handleUnfriend={() => handleUnfriend()} />
            }
            <img src={profilePicture} alt="Profile Picture" />
            <h2>{username}</h2>
            <p>{description}</p>
            <div className='friends-card' onClick={() => { setShowFriendsModal(true) }}>
                <p>{friends.length} Following</p>
            </div>
            {(!isEditable && !isFriend) && (<div className='add-friend-button'><button onClick={addFriend}>Add Friend</button></div>)}
            {isEditable && (
                <>
                    <Button variant='outlined' onClick={() => setShowEditModal(true)}>Edit Profile</Button>
                    {showEditModal && <EditProfileModal username={username} description={description} profilePicture={profilePicture} handleUpdate={() => handleUnfriend()}
                        toggleModal={setShowEditModal} />}
                </>
            )}

        </div>
    )
}
