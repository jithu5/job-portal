import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: null,
        error: null,
        loading: true,
        appliedJobs: [],
        wishlist: [],
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
        setAppliedJobs: (state, action) => {
            state.appliedJobs = action.payload;
        },
        addAppliedJobs: (state, action) => {
            // check if it exists in applied jobs
            const appliedJob = state.appliedJobs.find(
                (job) => job._id === action.payload._id
            );
            if (!appliedJob) {
                state.appliedJobs.push(action.payload);
            }
        },
        removeAppliedJobs: (state, action) => {
            const index = state.appliedJobs.findIndex(
                (job) => job._id === action.payload
            );
            if (index > -1) {
                state.appliedJobs.splice(index, 1);
            }
        },
        setWishlist: (state, action) => {
            state.wishlist = action.payload;
        },
        addWishlist: (state, action) => {
            // check if it exists in wishlist
            const wishlistedJob = state.wishlist.find(
                (job) => job._id === action.payload._id
            );
            if (!wishlistedJob) {
                state.wishlist.push(action.payload);
            }
        },
        removeWishlist: (state, action) => {
            const index = state.wishlist.findIndex(
                (job) => job._id === action.payload
            );
            if (index > -1) {
                state.wishlist.splice(index, 1);
            }
        }
    },
});

export const { setUser, clearUserData, setAppliedJobs, addAppliedJobs,removeAppliedJobs,setWishlist,addWishlist,removeWishlist } =
    AuthSlice.actions;

export default AuthSlice.reducer;
