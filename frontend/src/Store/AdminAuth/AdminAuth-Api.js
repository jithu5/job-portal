import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = import.meta.env.VITE_SERVER_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: `${URL}/api/auth/company`,
    credentials: "include",
});

const AdminApi = createApi({
    reducerPath: "admins",
    baseQuery,
    tagTypes: ["admin"],
    endpoints: (builder) => ({
        getAdmin: builder.query({
            query: () => ({
                url: "company",
            }),
            transformResponse: (response) => response.data,
            tagTypes: ["admin"],
        }),
        registerAdmin: builder.mutation({
            query: (data) => ({
                url: "register",
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["admin"],
        }),
        loginAdmin: builder.mutation({
            query: (data) => ({
                url: "login",
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["admin"],
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
            invalidatesTags: ["admin"],
        }),
        verifyEmail: builder.mutation({
            query: (data) => ({
                url: "verifyemail",
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["admin"],
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
            invalidatesTags: ["admin"],
        }),
        verifyResetOtp: builder.mutation({
            query: (data) => ({
                url: "verifyresetotp",
                method: "POST",
                body: data,
                
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["admin"],
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
            invalidatesTags: ["admin"],
        }),
    }),
});

export const {
    useGetAdminQuery,
    useRegisterAdminMutation,
    useLoginAdminMutation,
    useSendOtpMutation,
    useVerifyEmailMutation,
    useResetPasswordOtpMutation,
    useVerifyResetOtpMutation,
    useUpdatePasswordMutation,
} = AdminApi;

export default AdminApi;