import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userReducer } from "./slices/userSlice";
import { userApi } from "./apis/userApi";
import { entityApi } from "./apis/entityApi";

const store = configureStore({
    reducer: {
        userLegacy: userReducer,
        [userApi.reducerPath]: userApi.reducer,
        [entityApi.reducerPath]: entityApi.reducer
    },
    middleware: (curryGetDefaultMiddleware) => {
        return curryGetDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(entityApi.middleware);
    }
});

setupListeners(store.dispatch);

export { store };
export { useUserQuery } from './apis/userApi';
export { useEntityQuery } from './apis/entityApi';