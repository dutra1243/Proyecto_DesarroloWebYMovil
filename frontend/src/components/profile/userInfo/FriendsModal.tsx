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
            <div className="modal-content-background">
                <p className="close" onClick={() => props.toggleModal(false)}>Close</p>
                <div className="modal-content">

                    <h2>Friends List</h2>
                    <ul className='unorderedList'>
                        {props.friends.map(friend => (
                            <div className='friendCard' >
                                <li key={friend._id}>
                                    <span>
                                        <img className='profile-picture' src={friend.profilePicture} alt={friend.username + '\'s profile picture'} />
                                    </span>
                                    <div className="friendCard-info" >
                                        <span className='friendUsername' >{friend.username}</span>
                                        {props.userEditMode && (
                                            <button className='removeFriend' onClick={() => removeFriend(friend._id)}>Remove</button>
                                        )}
                                    </div>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
            </  div>
        </div>
    );
}
