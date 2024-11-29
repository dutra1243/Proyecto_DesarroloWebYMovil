import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {loginSuccess, loginThunk} from "../../store/authSlice.ts";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {useNavigate} from "react-router-dom";
import { Button } from '@mui/material';
import './style.css'


export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading, error} = useSelector((state) => state.auth);


    const [loginRequest, setLoginRequest] = useState({email: '', password: ''})
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(loginThunk(loginRequest)).unwrap();
            if (result) {
                navigate('/feed');
            }
        } catch (e) {
            console.log('Login failed: ', e);
        }

    };


    return (
        <div>
            <Box className="form"
                 component="form"
            >
                <h1 className="fakegram-name">
                    Fakegram
                </h1>

                <TextField
                    placeholder={"Email"}
                    type={"email"}
                    disabled={isLoading}
                    onChange={(e) => setLoginRequest({...loginRequest, email: e.target.value})}
                    error={error}
                />
                <TextField
                    placeholder={"Password"}
                    type={"password"}
                    disabled={isLoading}
                    onChange={(e) => setLoginRequest({...loginRequest, password: e.target.value})}
                    error={error}
                />
                <Button onClick={handleLogin}
                        disabled={isLoading}
                        className="form-button"
                >
                    {isLoading ? <CircularProgress size={15}/> : 'Login'}
                </Button>
                <div style={{minHeight: '5em', minWidth: '20em', transition: 'height 0.3s ease'}}>
                    {error && <Alert severity="error">{error.message}</Alert>}
                </div>
            </Box>
        </div>
    )
}
