import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = import.meta.env.VITE_SERVER_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: `${URL}/api/auth/user`,
    credentials: "include",
});

const UserApi = createApi({
    reducerPath: "users",
    baseQuery,
    tagTypes: ["User", "Job"],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => ({
                url: "user",
            }),
            transformResponse: (response) => response,
            providesTags: ["User"],
        }),
        registerUser: builder.mutation({
            query: (user) => ({
                url: "register",
                method: "POST",
                body: user,
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Job", "User"],
        }),
        checkUsernameUnique: builder.mutation({
            query: (username) => ({
                url: `checkusernameunique?username=${username}`,
                method: "GET",
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["User"],
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: "login",
                method: "POST",
                body: user,
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Job", "User"],
        }),
        sendOtp: builder.mutation({
            query: (user) => ({
                url: "send-otp",
                method: "POST",
                body: user,
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["User"],
        }),
        verifyEmail: builder.mutation({
            query: (user) => ({
                url: "verifyemail",
                method: "POST",
                body: user,
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Job", "User"],
        }),
        resetPasswordOtp: builder.mutation({
            query: (data) => ({
                url: "sendresetpassword",
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["User"],
        }),
        verifyResetOtp: builder.mutation({
            query: (data) => ({
                url: "verifyresetotp",
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["User"],
        }),
        updatePassword: builder.mutation({
            query: (data) => ({
                url: "updatepassword",
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["User", "Job"],
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "logout",
                method: "POST",
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["User"], // Forces re-fetch of "User" queries
        }),
        getJobs:builder.query({
            query: () => ({
                url: "jobs",
            }),
            transformResponse: (response) => response,
            providesTags: ["Job"],
        })
    }),
});

export const {
    useGetUserQuery,
    useRegisterUserMutation,
    useLoginUserMutation,
    useSendOtpMutation,
    useVerifyEmailMutation,
    useResetPasswordOtpMutation,
    useVerifyResetOtpMutation,
    useUpdatePasswordMutation,
    useLogoutUserMutation,
    useCheckUsernameUniqueMutation,
    useGetJobsQuery,
} = UserApi;

export default UserApi;
