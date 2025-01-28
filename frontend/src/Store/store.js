import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth/index.js";
import UserApi from "./Auth/Auth-Api.js"
import AdminApi from "./AdminAuth/AdminAuth-Api.js";

const store = configureStore({
    reducer: {
        Auth: AuthReducer,
        [UserApi.reducerPath]:UserApi.reducer,
        [AdminApi.reducerPath]:AdminApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(UserApi.middleware, AdminApi.middleware)
});

export default store;
