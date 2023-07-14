import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userReducer } from "./slices/userSlice";
import { userApi } from "./apis/userApi";
import { curryGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

const store = configureStore({
    reducer: {
        userLegacy: userReducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (curryGetDefaultMiddleware) => {
        return curryGetDefaultMiddleware()
            .concat(userApi.middleware);
    }
});

setupListeners(store.dispatch);

export { store };
export { useUserQuery } from './apis/userApi';