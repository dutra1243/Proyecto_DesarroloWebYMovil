import React, { useEffect } from 'react'
import { baseUrl } from '../../../common/constants';
import { useDispatch, useSelector } from 'react-redux';

type EditProfileModalProps = {
    username: string;
    profilePicture: string;
    toggleModal: (value: boolean) => void;
    description: string;
}

export const EditProfileModal = ({ username, profilePicture, description, toggleModal }: EditProfileModalProps) => {

    const [newUsername, setNewUsername] = React.useState(username);
    const [newProfilePicture, setNewProfilePicture] = React.useState(profilePicture);
    const [newDescription, setNewDescription] = React.useState(description)
    const token = useSelector((state: any) => state.auth.token)
    const id = useSelector((state: any) => state.auth.user._id)

    const handleSubmit = async () => {
        const response = await fetch(`${baseUrl}/user/profile/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                _id: id,
                username: newUsername,
                description: newDescription,
                profilePicture: newProfilePicture
            })
        });

        if (response.ok) {
            // const dispatch = useDispatch();
            // dispatch(updateUsername({ username: newUsername }));
            // toggleModal(false);
        } else {
            alert('Failed to update profile. Try again later.');
        }
    }

    return (
        <div>
            <h2>Edit Profile</h2>
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                <label htmlFor="description">Description</label>
                <input type='text' id='description' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                <label htmlFor="profilePicture">Profile Picture</label>
                <input type="text" id="profilePicture" value={newProfilePicture} onChange={(e) => setNewProfilePicture(e.target.value)} />
                <button type="submit" onClick={handleSubmit}>Save</button>
                <button onClick={() => toggleModal(false)}>Cancel</button>
            </form>
        </div>
    )
}
