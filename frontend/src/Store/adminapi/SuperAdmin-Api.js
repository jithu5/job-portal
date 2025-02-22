import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = import.meta.env.VITE_SERVER_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: `${URL}/api/auth/admin`,
    credentials: "include",
});

const AdminApi = createApi({
    reducerPath: "admins",
    baseQuery,
    tagTypes: ["admin", "Company", "User"],
    endpoints: (builder) => ({
        getAdmin: builder.query({
            query: () => ({
                url: "admin",
            }),
            transformResponse: (response) => response,
            providesTags: ["admin"],
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "login",
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["admin", "Company", "User"],
        }),
        sendOtp: builder.mutation({
            query: (data) => ({
                url: "sendresetpassword-otp",
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["User"],
        }),
        verifyOtp: builder.mutation({
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
        logout: builder.mutation({
            query: () => ({
                url: "logout",
                method: "POST",
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["admin", "Company", "User"],
        }),
        getUsers: builder.query({
            query: () => ({
                url: "getusers",
            }),
            transformResponse: (response) => response,
            providesTags: ["User"],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `deleteuser/${userId}`,
                method: "POST",
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["User"],
        }),
        userDetails: builder.query({
            query: (userId) => ({
                url: `view-user/${userId}`,
            }),
            transformResponse: (response) => response,
            providesTags: ["User"],
        }),
        getCompany: builder.query({
            query: () => ({
                url: "getcompany",
            }),
            transformResponse: (response) => response,
            providesTags: ["Company"],
        }),
        deleteCompany: builder.mutation({
            query: (companyId) => ({
                url: `deletecompany/${companyId}`,
                method: "POST",
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Company"],
        }),
        companyDetails: builder.query({
            query: (companyId) => ({
                url: `view-company/${companyId}`,
            }),
            transformResponse: (response) => response,
            providesTags: ["Company"],
        }),
    }),
    // Define other endpoints here...
});

export const {
    useLoginMutation,
    useSendOtpMutation,
    useVerifyOtpMutation,
    useUpdatePasswordMutation,
    useGetAdminQuery,
    useLogoutMutation,
    useGetUsersQuery,
    useUserDetailsQuery,
    useGetCompanyQuery,
    useDeleteUserMutation,
    useDeleteCompanyMutation,
    useCompanyDetailsQuery
} = AdminApi;

export default AdminApi;
