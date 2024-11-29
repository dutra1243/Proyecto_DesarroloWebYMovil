import { Link } from 'react-router-dom'
import './sidebar.css'
import { Logout } from "../logout/Logout.tsx";
import { useSelector } from "react-redux";

export const Sidebar = () => {
    const userId = useSelector((state: any) => state.auth.user._id)

    return (
        <div className='sidebar'>

            {/* <img src="/fakegram.png" alt="Fakegram Logo" className="logo" /> */}

            <h2 className='fakegram-name sidebarLogo' >
                Fakegram
            </h2>

            <div className='links'>
                <Link to='/'>Home</Link>
                <Link to={'/profile/' + userId}>Profile</Link>
            </div>

            <div className="logout">
                <Logout />
            </div>
        </div>
    )
}

