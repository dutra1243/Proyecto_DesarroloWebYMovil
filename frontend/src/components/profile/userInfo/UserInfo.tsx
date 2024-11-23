import React from 'react'
import {EditProfileModal} from './EditProfileModal';

type UserInfoProps = {
    username: string;
    profilePicture: string,
    isEditable: boolean;
}

export const UserInfo = ({ username, profilePicture, isEditable }: UserInfoProps) => {
    const [showModal, setShowModal] = React.useState(false);

    return (
        <div className="user-info">
            <div className="profile-container">
                <img className="profile-picture" src={profilePicture} alt="Profile Picture" />
                <h2 className="profile-username">{username}</h2>
            </div>
            {isEditable && (
                <>
                    <button onClick={() => setShowModal(true)}>Edit Profile</button>
                    {showModal && <EditProfileModal username={username} profilePicture={profilePicture} toggleModal={setShowModal} />}
                </>
            )}
        </div>
    );
};
