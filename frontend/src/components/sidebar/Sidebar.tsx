import { Link } from 'react-router-dom'

export const Sidebar = () => {
    return (
        <div className='sidebar'>
            <img src="/vite.svg" alt="vite logo" />
            <div className='links'>
                <Link to='/'>Home</Link>
                <Link to='/profile'>Profile</Link>
            </div>
            <div className='logout'>
                <Link to='/login'>Logout</Link>
            </div>
        </div>
    )
}

