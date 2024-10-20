import React from 'react'

export const PostHeader = (props: {
    user: {
        _id: string,
        username: string,
        profilePicture: string
    },
    createdAt: string
}) => {

    const creation = props.createdAt.split('T')
    const date = creation[0]
    const time = creation[1].split('.')[0]

    return (
        <>
            <div className='postHeader'>
                <img src="/vite.svg" alt="profilePicture" />
                <h2>{props.user.username}</h2>
                <p>{date} - [{time}] </p>
            </div>
        </>
    )
}
