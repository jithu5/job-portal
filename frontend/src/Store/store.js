import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth/index.js";
import UserApi from "./Auth/Auth-Api.js"

const store = configureStore({
    reducer: {
        Auth: AuthReducer,
        [UserApi.reducerPath]:UserApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(UserApi.middleware)
});

export default store;
