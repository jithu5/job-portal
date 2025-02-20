import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        jobs: [],
    },
    reducers: {
        setJobs: (state, action) => {
            state.jobs = action.payload;
        },
        addJob: (state, action) => {
            state.jobs.push(action.payload);
        },
        updateJob: (state, action) => {
            const index = state.jobs.findIndex(
                (job) => job._id === action.payload._id
            );
            if (index!== -1) {
                state.jobs[index] = action.payload;
            }
        },
        deleteJob: (state, action) => {
            const index = state.jobs.findIndex(
                (job) => job._id === action.payload
            );
            if (index!== -1) {
                state.jobs.splice(index, 1);
            }
        }
    },
});

export const { setJobs,addJob,deleteJob,updateJob} = companySlice.actions

export default companySlice.reducer;