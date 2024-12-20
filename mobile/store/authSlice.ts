
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { StateUser } from "../models/user";
import { baseUrl } from "@/common/constants";
import { LoginRequest, LoginResponse, SignUpRequest, SignUpResponse } from "@/models/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginThunk = createAsyncThunk<LoginResponse, LoginRequest>(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            thunkAPI.dispatch(loginStart());

            const response: LoginResponse = (await axios.post(baseUrl + '/auth/login', {
                email,
                password
            }));
            thunkAPI.dispatch(loginSuccess(response));
            return response;
        } catch (error) {
            thunkAPI.dispatch(loginFailure(error.response.data));
        }
    },
);

export const signUpThunk = createAsyncThunk<SignUpResponse, SignUpRequest>(
    "auth/register",
    async ({ username, email, password }, thunkAPI) => {
        try {
            thunkAPI.dispatch(loginStart());
            const response: SignUpResponse = (await axios.post(baseUrl + '/auth/register', {
                username,
                email,
                password
            })).data;
            thunkAPI.dispatch(loginSuccess(response));
            return response;
        } catch (error) {
            thunkAPI.dispatch(loginFailure(error.response.data));
        }
    }
)

export const logoutThunk = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(logout());
        } catch (error) {
            console.error(error);
        }
    }
);

export interface IAuth {
    user: StateUser | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: IAuth = {
    user: AsyncStorage.getItem("user") || null, // Recuperar el user desde AsyncStorage
    token: AsyncStorage.getItem("token") || null, // Recuperar token del AsyncStorage si existe
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
                _id: action.payload.data._id,
                username: action.payload.data.username,
                email: action.payload.data.email,
            };
            state.token = action.payload.data.token;
            AsyncStorage.setItem("token", action.payload.data.token)
            AsyncStorage.setItem("user", JSON.stringify(state.user))
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            AsyncStorage.removeItem("token");
            AsyncStorage.removeItem("user");
            console.log("Token eliminado de AsyncStorage");
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

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;