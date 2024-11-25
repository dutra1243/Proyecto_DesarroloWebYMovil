import React, { useEffect } from 'react'
import { EditProfileModal } from './EditProfileModal';
import { UserDto } from '../../../models/user';
import { FriendsModal } from './FriendsModal';
import { baseUrl } from '../../../common/constants';
import { useSelector } from 'react-redux';

type UserInfoProps = {
    username: string;
    userId: String,
    profilePicture: string,
    isEditable: boolean;
    friends: UserDto[];
}

export const UserInfo = ({ username, profilePicture, isEditable, friends, userId }: UserInfoProps) => {
    const token = useSelector((state: any) => state.auth.token)
    const loggedId = useSelector((state: any) => state.auth.user._id)
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [showFriendsModal, setShowFriendsModal] = React.useState(false);
    const [isFriend, setIsFriend] = React.useState(false);

    useEffect(() => {
        const checkFriend = async () => {
            console.log('hola', loggedId)
            const response = await fetch(`${baseUrl}/user/profile/${loggedId}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${token}`,
                }
            }).then(response => { return response.json() })
            console.log(response)
            if (response.user.friends.includes(userId)) {
                setIsFriend(true);
            }
        }
        checkFriend();
    }, [userId])

    const addFriend = async () => {
        const response = await fetch(`${baseUrl}/user/profile/${userId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: userId
            })
        }).then(response => { return response.json() })
        if (response.ok) {
            setIsFriend(true);
        } else {
            alert(response.message);
        }
    }

    return (
        <div className="user-info">
            {showFriendsModal &&
                <FriendsModal friends={friends} userId={userId} userEditMode={isEditable} toggleModal={setShowFriendsModal} />
            }
            <img src={profilePicture} alt="Profile Picture" />
            <h2>{username}</h2>
            <div className='friends-card' onClick={() => { setShowFriendsModal(true) }}>
                <p>{friends.length} Friends</p>
            </div>
            {(!isEditable && !isFriend) && (<div className='add-friend-button'><button onClick={addFriend}>Add Friend</button></div>)}
            {isEditable && (
                <>
                    <button onClick={() => setShowEditModal(true)}>Edit Profile</button>
                    {showEditModal && <EditProfileModal username={username} profilePicture={profilePicture}
                        toggleModal={setShowEditModal} />}
                </>
            )}

        </div>
    )
}
