import { Link } from 'react-router-dom';
import { Logout } from "../logout/Logout.tsx";
import { useSelector } from "react-redux";
import './sidebar.css';
import { Home, AccountCircle } from '@mui/icons-material'; 

export const Sidebar = () => {
    const userId = useSelector((state: any) => state.auth.user._id);

    return (
        <div className='sidebar'>

            {/* <img src="/fakegram.png" alt="Fakegram Logo" className="logo" /> */}

            <h2 className='fakegram-name sidebarLogo' >
                Fakegram
            </h2>

            <div className='links'>
                <Link to='/' className="sidebarLink">
                    <Home fontSize="large" /> <span>Home</span>
                </Link>
                <Link to={/profile/${userId}} className="sidebarLink">
                    <AccountCircle fontSize="large" /> <span>Profile</span>
                </Link>
            </div>

            <div className="logout">
                <Logout />
            </div>
        </div>
    );
};
