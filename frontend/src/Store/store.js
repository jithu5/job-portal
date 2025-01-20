import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth/index.js";

const store = configureStore({
    reducer: {
        Auth: AuthReducer,
    },
});

export default store;
