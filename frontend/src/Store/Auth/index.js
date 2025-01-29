import { createSlice } from "@reduxjs/toolkit";


const URL = import.meta.env.VITE_SERVER_URL;


// export const loginUser = createAsyncThunk(
//     'api/loginUser',
//     async (formData) =>{
//        try {
//         const { data } = await axios.post(`${URL}/api/auth/user/login`,
//             formData,
//             {
//                 withCredentials:true
//             }
//         );
//         return data;
//        } catch (error) {
//         console.log(error.response.data);
//         return error.response.data;
//        }

//     }
// )


const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: null,
        error: null,
        loading: true,
    },
    reducers: {
        setUser: (state, action) => {
            console.log(action.payload);
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = action.payload?.isAccountVerified
                ? true
                : false;
        },
        clearUserData: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            state.loading = false;
        },
    },
    // extraReducers:(builder)=>{
    //     builder
    //     .addCase(loginUser.pending, (state, action) => {
    //         state.loading = true;
    //         state.error = null;
    //         state.isAuthenticated = false;
    //         state.user = null;
    //     })
    //     .addCase(loginUser.fulfilled, (state, action) => {
    //         console.log(action.payload)
    //         state.loading = false;
    //         state.isAuthenticated = true;
    //         state.user = action.payload.data;
    //         state.error = null
    //     })
    //     .addCase(loginUser.rejected, (state, action) => {
    //         state.loading = false;
    //         state.error = action.payload;
    //         state.isAuthenticated = false;
    //         state.user = null;
    //     })
    // }
});

export const { setUser,clearUserData } = AuthSlice.actions;

export default AuthSlice.reducer;