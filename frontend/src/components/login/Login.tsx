import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../../store/authSlice.ts";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';


export const Login = () => {
    const dispatch = useDispatch();
    const {isLoading, error} = useSelector((state) => state.auth);


    const [loginRequest, setLoginRequest] = useState({email: '', password: ''})
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginThunk(loginRequest));
    };


    return (
        <div>
            <Box className="form"
                 component="form"
            >
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
                <button onClick={handleLogin}
                        disabled={isLoading}
                        className="form-button"
                >
                    {isLoading ? <CircularProgress size={20}/> : 'Login'}
                </button>
                <div style={{minHeight: '50px', transition: 'height 0.3s ease'}}>
                    {error && <Alert severity="error">{error.message}</Alert>}
                </div>
            </Box>
        </div>
    )
}
