import React from 'react'
import {useDispatch} from "react-redux";
import {logoutThunk} from "../../store/authSlice.ts";
import {useNavigate} from "react-router-dom";


export const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(logoutThunk()).unwrap();
            console.log('result: ', result);
            if (result) {
                console.log('Logout success: ', result);
                navigate('/login');
            }
        } catch (e) {
            console.log('Logout failed: ', e);
        }
    }


    return (
        <div>
            <button onClick={handleLogout}
                // disabled={isLoading}
                    className="form-button"
            >
                Logout
            </button>
        </div>
    )
}
