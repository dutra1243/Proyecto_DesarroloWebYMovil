import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {RootState} from "~/store";
import axios from "axios";
import LoginRequest from "~/models/auth/login.request";
import LoginResponse from "~/models/auth/login.response";
import {useAppDispatch} from "~/hooks/redux";
import qs from "qs";
import SignUpRequest from "~/models/auth/signUp.request";
import SignUpResponse from "~/models/auth/signUp.response";
import {AuthUser, UserDto} from "../models/user";
import {baseUrl} from "../common/constants.ts";


// export const signInThunk = createAsyncThunk<LoginResponse, LoginRequest>(
//     async (loginRequest, {rejectWithValue}) => {
//         //TODO: sacar todos los console
//         console.log("signin")
//         try {
//             const {data} = await axios<LoginResponse>({
//                 data: qs.stringify({
//                     client_id: process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID,
//                     grant_type: process.env.EXPO_PUBLIC_OAUTH_GRANT_TYPE,
//                     password: loginRequest.password,
//                     scope: process.env.EXPO_PUBLIC_OAUTH_SCOPE,
//                     username: loginRequest.email,
//                 }),
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded",
//                 },
//                 method: "post",
//                 url: `${process.env.EXPO_PUBLIC_OAUTH_URL}/connect/token`,
//             });
//
//             await AsyncStorage.setItem("token", data.access_token);
//             return data;
//         } catch (error: any) {
//             // return custom error message from API if any
//             if (error.response && error.response.data.error_description) {
//                 return rejectWithValue(error.response.data.error_description);
//             } else {
//                 return rejectWithValue(error.message);
//             }
//         }
//     }
// );

export const loginThunk = createAsyncThunk<LoginResponse, LoginRequest>(
    "auth/login",
    async ({email, password}, thunkAPI) => {
        try {
            thunkAPI.dispatch(loginStart());
            const response: LoginResponse = await axios.post(baseUrl + '/auth/login', {email, password});
            thunkAPI.dispatch(loginSuccess(response.data));
        } catch (error) {
            thunkAPI.dispatch(loginFailure(error.response.data));
        }
    }
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
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(signInThunk.pending, (state) => {
    //         })
    //         .addCase(signInThunk.fulfilled, (state, action) => {
    //             state.loading = false;
    //             state.accessToken = action.payload.access_token;
    //         })
    //         .addCase(signInThunk.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.payload as string;
    //         })
    //         .addCase(signUpThunk.pending, (state) => {
    //         })
    //         .addCase(signUpThunk.fulfilled, (state, action) => {
    //             state.loading = false;
    //             state.success = true;
    //         })
    //         .addCase(signUpThunk.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.payload as string;
    //         });
    // },
});

export const {loginStart, loginSuccess, loginFailure, logout} = authSlice.actions;
export default authSlice.reducer;

// export const {clearResults} = authSlice.actions
// export const useAuth = () => {
//     const dispatch = useAppDispatch();
//     const {loading, accessToken, refreshToken, error, success} = useSelector(
//         (state: RootState) => state.authSlice
//     );
//
//     const signOut = async () => {
//         await AsyncStorage.removeItem("token");
//         dispatch(authSlice.actions.setToken({token: null}));
//         dispatch(authSlice.actions.clearResults());
//     };
//
//     const signIn = async (loginRequest: LoginRequest) => {
//         dispatch(authSlice.actions.apiActionStart());
//         await dispatch(signInThunk(loginRequest));
//         dispatch(authSlice.actions.apiActionEnd());
//     };
//
//     const signUp = async (signUpRequest: SignUpRequest, createdUser) => {
//         dispatch(authSlice.actions.apiActionStart());
//         await dispatch(signUpThunk(signUpRequest));
//         dispatch(authSlice.actions.apiActionEnd());
//
//     }
//
//     return {
//         signIn,
//         loading,
//         signOut,
//         signUp,
//         error,
//         accessToken,
//         refreshToken,
//         setToken: (newToken: string) =>
//             dispatch(authSlice.actions.setToken({token: newToken})),
//         success
//     };
// };