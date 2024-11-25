import React from 'react'
import { UserDto } from '../../../models/user'

type FriendsModalProps = {
    friends: UserDto[];
    userId: String;
    userEditMode: boolean;
    toggleModal: (value: boolean) => void;
}

export const FriendsModal = (props: FriendsModalProps) => {
    const removeFriend = async (id: string) => {
        //to be implemented
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="close" onClick={() => props.toggleModal(false)}>X</div>

                <h2>Friends List</h2>
                <ul>
                    {props.friends.map(friend => (
                        <li key={friend._id}>
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
