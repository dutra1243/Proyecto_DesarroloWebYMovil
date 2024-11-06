import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {AuthUser} from "../models/user";
import {baseUrl} from "@/common/constants";
import {LoginRequest, LoginResponse} from "@/models/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    user: null, // Aquí se almacenarán los datos del usuario logueado
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
            console.log("loginSuccess", action.payload.token);
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            AsyncStorage.setItem("token", action.payload.token);
            console.log('Token del asyncstorage: ', AsyncStorage.getItem("token"));
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