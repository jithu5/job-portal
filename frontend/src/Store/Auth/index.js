import { createSlice } from "@reduxjs/toolkit";


const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
        error: null,
        loading: true,
    },
    
})

export default AuthSlice.reducer;