import {
    AnyAction,
    Reducer,
    ThunkAction,
    combineReducers,
    configureStore,
} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    persistStore,
    persistReducer,
} from "redux-persist";
import authReducer from './authSlice';
import logger from "redux-logger";

const appReducer = combineReducers({
    // Aca van todas las slices
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
    if (action.type === "auth/clearResults") {
        AsyncStorage.removeItem("persist:root");
        state = {} as RootState;
    }
    return appReducer(state, action);
};

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck: false
        }
    ).concat(logger),
});


export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    UnknownAction
>;