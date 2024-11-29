import React from 'react'
import { useEffect } from 'react'
import { baseUrl } from '../../../common/constants'
import { PostDTO } from '../../../models/post/PostDTO'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { baseUrlNotApi } from '../../../common/constants'

type UserPicturesProps = {
    id: String;
    openPostModal: (post: PostDTO) => void;
}


export const UserPictures = ({ id, openPostModal }: UserPicturesProps) => {

    const [posts, setPosts] = useState<PostDTO[]>()
    const token = useSelector((state: any) => state.auth.token)

    useEffect(() => {

        fetch(`${baseUrl}/posts/feed`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        }).then(response => response.json())
            .then(data => {
                console.log("Fetched posts");
                setPosts(data.filter((post: PostDTO) => post.user._id === id))
            })
    }, [id])

    return (
        <div className="user-pictures">
            {posts?.map(post => (
                <div key={post._id} className="post" onClick={() => openPostModal(post)}>
                    <img src={post.imageUrl.startsWith('https') ? post.imageUrl : `${baseUrlNotApi}/${post.imageUrl}`} alt="Post" />
                </div>
            ))}
        </div>

    )
}
