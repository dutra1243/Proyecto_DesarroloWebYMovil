import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Sidebar } from '../sidebar/Sidebar'
import { Post } from '../post/Post'
import { PostDTO } from '../../models/post/PostDTO'

export const Feed = () => {

    const [posts, setPosts] = useState<PostDTO[]>()

    const token = useSelector((state: any) => state.auth.token)

    useEffect(() => {

        fetch(`http://localhost:3001/api/posts/feed`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        }).then(response => response.json())
            .then(data => {
                console.log("fetched data", data)
                setPosts(data)
            })
    }, [token])

    // if (typeof (posts) === 'object') {

    //     console.log(typeof (posts))

    //     return (
    //         <>
    //             <Sidebar />
    //             <h1>Not authorized</h1>
    //         </>
    //     )
    // }


    const array = posts ? new Array(posts.length).fill(null) : [];

    if (posts)
        for (let i = 0; i < posts.length; i++) {

            array[i] = < Post key={posts[i]._id}  {...posts[i]} />
        }


    return (
        <>
            <Sidebar />
            <div className='feedContent'>
                {array}
            </div>
        </>
    )
}


export default Feed