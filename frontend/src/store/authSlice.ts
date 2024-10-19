import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {AuthUser} from "../models/user";
import {baseUrl} from "../common/constants.ts";
import {LoginRequest, LoginResponse} from "../models/auth";

export const loginThunk = createAsyncThunk<LoginResponse, LoginRequest>(
    "auth/login",
    async ({email, password}, thunkAPI) => {
        try {
            thunkAPI.dispatch(loginStart());
            const response: LoginResponse = (await axios.post(baseUrl + '/auth/login', {email, password})).data;
            thunkAPI.dispatch(loginSuccess(response));
            console.log('response.data: ', response);
            await sessionStorage.setItem("token", response.token);
            return response;
        } catch (error) {
            thunkAPI.dispatch(loginFailure(error.response.data));
        }
    },
);

export interface IAuth {
    user: AuthUser | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: IAuth = {
    user: null, // Aquí se almacenarán los datos del usuario logueado
    token: null, // Token de autenticación (si usas tokens JWT)
    isLoading: false, // Para manejar el estado de carga
    error: null, // Para almacenar errores de autenticación
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.token = action.payload;
        });
        builder.addCase(loginThunk.rejected, (state, action) => {
            state.error = action.payload;
        });
    }
});

export const {loginStart, loginSuccess, loginFailure, logout} = authSlice.actions;
export default authSlice.reducer;