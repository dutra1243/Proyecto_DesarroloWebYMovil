import {Link} from 'react-router-dom'
import './sidebar.css'
import {Logout} from "../logout/Logout.tsx";

export const Sidebar = () => {
    return (
        <div className='sidebar'>
            <img src="/fakegram.png" alt="vite logo"/>
            <div className='links'>
                <Link to='/'>Home</Link>
                <Link to='/profile'>Profile</Link>
            </div>
            <Logout/>
        </div>
    )
}

