import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth/index.js";
import UserApi from "./Auth/Auth-Api.js"
import companyApi from "./AdminAuth/AdminAuth-Api.js";
import AdminApi from "./adminapi/SuperAdmin-Api.js";

const store = configureStore({
    reducer: {
        Auth: AuthReducer,
        [UserApi.reducerPath]:UserApi.reducer,
        [companyApi.reducerPath]:companyApi.reducer,
        [AdminApi.reducerPath]:AdminApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(UserApi.middleware, companyApi.middleware, AdminApi.middleware)
});

export default store;
