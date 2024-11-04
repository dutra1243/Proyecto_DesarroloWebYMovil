import React from 'react'

export const PostFooter = (props: {
    username: string;
    caption: string;
    likes: any[];
    comments: any[];

}) => {



    return (
        <>
            <div className='postFooter'>
                <p> <span style={{ fontWeight: 'bold' }}>{props.username}</span> {props.caption}</p>
                <div className='likesComments'>
                    <p>{props.likes.length} likes</p>
                    <p>{props.comments.length} comments</p>
                </div>
            </div>
        </>
    )
}



