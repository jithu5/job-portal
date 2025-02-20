import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth/index.js";
import UserApi from "./Auth/Auth-Api.js"
import CompanyApi from "./AdminAuth/AdminAuth-Api.js";
import AdminApi from "./adminapi/SuperAdmin-Api.js";
import companyReducer from "./company-store.js";

const store = configureStore({
    reducer: {
        Auth: AuthReducer,
        Company:companyReducer,
        [UserApi.reducerPath]:UserApi.reducer,
        [CompanyApi.reducerPath]:CompanyApi.reducer,
        [AdminApi.reducerPath]:AdminApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(UserApi.middleware, CompanyApi.middleware, AdminApi.middleware)
});

export default store;
