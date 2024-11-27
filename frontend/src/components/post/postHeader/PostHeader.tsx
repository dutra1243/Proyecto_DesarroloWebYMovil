import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PostHeader = (props: {
    user: {
        _id: string,
        username: string,
        profilePicture: string
    },
    createdAt: string
}) => {
    const creation = props.createdAt.split('T');
    const date = creation[0].split('-').join('/');
    const time = creation[1].split('.')[0].split(':').slice(0, 2).join(':');

    const navigate = useNavigate();

    return (
        <div className="postHeader">
            <div className="userInfo" onClick={() => navigate('/profile/' + props.user._id)}>
                <img
                    src={props.user.profilePicture || "/vite.svg"}
                    alt="profilePicture"
                    className="profilePicture"
                />
                <div>
                    <h3 className="username">{props.user.username}</h3>
                    <p className="postDate">{date} at {time}</p>
                </div>
            </div>
            <button className="optionsButton">⋮</button>
        </div>
    );
};

 
