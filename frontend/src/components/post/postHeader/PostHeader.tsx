import React from 'react';

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

    return (
        <div className='post'>
            <div className='postHeader'>
                <img src={props.user.profilePicture || "/vite.svg"} alt="profilePicture" className='profilePicture' />
                <h2 className='username'>{props.user.username}</h2>
                <p className='dateTime'>{date} - {time}</p>
            </div>
        </div>
    );
}
