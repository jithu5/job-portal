import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: null,
        error: null,
        loading: true,
        appliedJobs: [],
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
    },
});

export const { setUser, clearUserData, setAppliedJobs, addAppliedJobs } =
    AuthSlice.actions;

export default AuthSlice.reducer;
