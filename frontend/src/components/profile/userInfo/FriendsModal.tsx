import React from 'react'
import { baseUrl } from '../../../common/constants';
import { useSelector } from 'react-redux';

type FriendsInfo = {
    profilePicture: string,
    username: string,
    _id: string
}

type FriendsModalProps = {
    friends: FriendsInfo[];
    userId: String;
    userEditMode: boolean;
    toggleModal: (value: boolean) => void;
    handleUnfriend: () => void;
}

export const FriendsModal = (props: FriendsModalProps) => {
    const token = useSelector((state: any) => state.auth.token)
    const removeFriend = async (id: string) => {
        const response = await fetch(`${baseUrl}/user/remove-friend/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: id
            })
        }).then(response => { return response.json() })
        if (response) {
            props.handleUnfriend()
        } else {
            alert(response.message);
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="close" onClick={() => props.toggleModal(false)}>X</div>

                <h2>Friends List</h2>
                <ul>
                    {props.friends.map(friend => (
                        <li key={friend._id}>
                            <span>
                                <img src={friend.profilePicture} alt={friend.username + '\'s profile picture'} />
                            </span>
                            <span>{friend.username}</span>
                            {props.userEditMode && (
                                <button onClick={() => removeFriend(friend._id)}>Remove</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
