import React, { useEffect } from 'react'
import { baseUrl } from '../../../common/constants';
import { useDispatch, useSelector } from 'react-redux';
import { editProfileThunk } from "../../../store/authSlice.ts";

type EditProfileModalProps = {
    username: string;
    profilePicture: string;
    toggleModal: (value: boolean) => void;
    description: string;
    handleUpdate: () => void;
}

export const EditProfileModal = ({ username, profilePicture, description, toggleModal, handleUpdate }: EditProfileModalProps) => {
    const dispatch = useDispatch();

    const [newUsername, setNewUsername] = React.useState(username);
    const [newProfilePicture, setNewProfilePicture] = React.useState(profilePicture);
    const [newDescription, setNewDescription] = React.useState(description)
    const token = useSelector((state: any) => state.auth.token)
    const id = useSelector((state: any) => state.auth.user._id)

    const handleSubmit = async (e) => {
        console.log('handleSubmit!')
        e.preventDefault();
        await dispatch(editProfileThunk({
            _id: id,
            username: newUsername,
            description: newDescription,
            profilePicture: newProfilePicture
        }))
        handleUpdate()
        toggleModal(false)
    }

    return (
        <div>
            <h2>Edit Profile</h2>
            <form style={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px'
                }
            }>

                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                <label htmlFor="description">Description</label>
                <input type='text' id='description' value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)} />
                <label htmlFor="profilePicture">Profile Picture</label>
                <input type="text" id="profilePicture" value={newProfilePicture}
                    onChange={(e) => setNewProfilePicture(e.target.value)} />
                <button type="submit" onClick={handleSubmit}>Save</button>
                <button onClick={() => toggleModal(false)}>Cancel</button>
            </form>
        </div>
    )
}
