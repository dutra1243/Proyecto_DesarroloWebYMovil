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
            return response;
        } catch (error) {
            thunkAPI.dispatch(loginFailure(error.response.data));
        }
    },
);

export const logoutThunk = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(logout());
        } catch (error) {
            console.error(error);
        }
    });

export interface IAuth {
    user: AuthUser | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: IAuth = {
    user: JSON.parse(sessionStorage.getItem("user") || "null"), // Recuperar el user desde sessionStorage
    id: sessionStorage.getItem("id") || null, // Recuperar id del sessionStorage si existe
    token: sessionStorage.getItem("token") || null, // Recuperar token del sessionStorage si existe
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
            state.user = {
                _id: action.payload._id,
                username: action.payload.username,
                email: action.payload.email,
            };
            state.token = action.payload.token;
            sessionStorage.setItem("token", action.payload.token);
            sessionStorage.setItem("user", JSON.stringify(state.user));
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(loginThunk.fulfilled, (state, action) => {
        //     state.token = action.payload;
        // });
        builder.addCase(loginThunk.rejected, (state, action) => {
            state.error = action.payload;
        });
    }
});

export const {loginStart, loginSuccess, loginFailure, logout} = authSlice.actions;
export default authSlice.reducer;