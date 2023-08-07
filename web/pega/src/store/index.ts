import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./apis/userApi";
import { entityApi } from "./apis/entityApi";
import { actionApi, actionListApi } from "./apis/actionApi";
import { decisionApi, decisionListApi } from "./apis/decisionApi";
import { formApi, formListApi } from "./apis/formApi";
import { genaiApi } from "./apis/genaiApi";

const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [entityApi.reducerPath]: entityApi.reducer,
        [actionApi.reducerPath]: actionApi.reducer,
        [actionListApi.reducerPath]: actionListApi.reducer,
        [decisionApi.reducerPath]: decisionApi.reducer,
        [decisionListApi.reducerPath]: decisionListApi.reducer,
        [formApi.reducerPath]: formApi.reducer,
        [formListApi.reducerPath]: formListApi.reducer,
        [genaiApi.reducerPath]: genaiApi.reducer
    },
    middleware: (curryGetDefaultMiddleware) => {
        return curryGetDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(entityApi.middleware)
            .concat(actionApi.middleware)
            .concat(actionListApi.middleware)
            .concat(decisionApi.middleware)
            .concat(decisionListApi.middleware)
            .concat(formApi.middleware)
            .concat(formListApi.middleware)
            .concat(genaiApi.middleware);
    }
});

setupListeners(store.dispatch);

export { store };
export { useUserQuery } from './apis/userApi';
export { useActionQuery, useActionListQuery } from './apis/actionApi';
export { useDecisionQuery, useDecisionListQuery } from './apis/decisionApi';
export { useEntityQuery, useEntityListQuery, useNewEntityMutation, useNewEntityBatchMutation } from './apis/entityApi';
export { useFormQuery, useFormListQuery } from './apis/formApi';
export { useGenaiQuery, useGenAIJsonPMutation, useGenAIBatchJsonPMutation } from './apis/genaiApi';