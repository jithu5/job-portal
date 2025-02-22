import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = import.meta.env.VITE_SERVER_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: `${URL}/api/auth/company`,
    credentials: "include",
});

const CompanyApi = createApi({
    reducerPath: "company",
    baseQuery,
    tagTypes: ["Company", "Job"],
    endpoints: (builder) => ({
        getCompany: builder.query({
            query: () => ({
                url: "company",
            }),
            transformResponse: (response) => response.data,
            tagTypes: ["Company"],
        }),
        registerAdmin: builder.mutation({
            query: (data) => ({
                url: "register",
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Company", "Job"],
        }),
        checkCompanyNameUnique: builder.mutation({
            query: (data) => ({
                url: `checkcompanynameunique?companyName=${data}`,
                method: "GET",
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Company"],
        }),
        loginAdmin: builder.mutation({
            query: (data) => ({
                url: "login",
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Company", "Job"],
        }),
        sendOtp: builder.mutation({
            query: (data) => ({
                url: "send-otp",
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Company"],
        }),
        verifyEmail: builder.mutation({
            query: (data) => ({
                url: "verifyemail",
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Company", "Job"],
        }),
        resetPasswordOtp: builder.mutation({
            query: (data) => ({
                url: "sendresetpassword",
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Company"],
        }),
        verifyResetOtp: builder.mutation({
            query: (data) => ({
                url: "verifyresetotp",
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Company"],
        }),
        updatePassword: builder.mutation({
            query: (data) => ({
                url: "updatepassword",
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Company", "Job"],
        }),
        logoutAdmin: builder.mutation({
            query: () => ({
                url: "logout",
                method: "POST",
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Company", "Job"],
        }),
        editProfile: builder.mutation({
            query: (data) => ({
                url: "edit-profile",
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            transformResponse: (response) => response,
        }),
        postJob: builder.mutation({
            query: (data) => ({
                url: "postjob",
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Job", "Company"],
        }),
        getJobById: builder.query({
            query: (jobId) => ({
                url: `job/${jobId}`,
            }),
            transformResponse: (response) => response,
            providesTags: ["Job"],
        }),
        editJob: builder.mutation({
            query: ({ jobId, data }) => ({
                url: `editjob/${jobId}`,
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Job"],
        }),
        updateImages: builder.mutation({
            query: (images) => ({
                url: "update-profile-cover",
                method: "POST",
                body: images,
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Company"],
        }),
        deleteProfileImage: builder.mutation({
            query: () => ({
                url: "delete-profilepic",
                method: "POST",
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Company"],
        }),
        deleteCoverImage: builder.mutation({
            query: () => ({
                url: "delete-coverpic",
                method: "POST",
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Company"],
        }),
        getDashboardDetails: builder.query({
            query: () => ({
                url: "get-dashboard-data",
            }),
            transformResponse: (response) => response,
            tagTypes: ["Company", "Job"],
        }),
        getJobs: builder.query({
            query: () => ({
                url: "get-job",
            }),
            transformResponse: (response) => response,
            tagTypes: ["Job", "Company"],
        }),
        getJobDetails: builder.query({
            query: (jobId) => ({
                url: `get-jobDetails/${jobId}`,
            }),
            transformResponse: (response) => response,
            tagTypes: ["Job"],
        }),
        deleteJob: builder.mutation({
            query: (jobId) => ({
                url: `deletejob/${jobId}`,
                method: "POST",
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Job"],
        }),
    }),
});

export const {
    useGetCompanyQuery,
    useRegisterAdminMutation,
    useCheckCompanyNameUniqueMutation,
    useEditProfileMutation,
    useLoginAdminMutation,
    useSendOtpMutation,
    useVerifyEmailMutation,
    useResetPasswordOtpMutation,
    useVerifyResetOtpMutation,
    useUpdatePasswordMutation,
    useLogoutAdminMutation,
    usePostJobMutation,
    useUpdateImagesMutation,
    useGetDashboardDetailsQuery,
    useGetJobsQuery,
    useGetJobDetailsQuery,
    useDeleteJobMutation,
    useGetJobByIdQuery,
    useEditJobMutation,
    useDeleteProfileImageMutation,
    useDeleteCoverImageMutation
} = CompanyApi;

export default CompanyApi;