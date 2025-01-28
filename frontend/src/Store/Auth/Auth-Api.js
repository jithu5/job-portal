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
            transformResponse: (response) => response.data,
            providesTags:['User']
        }),
        registerUser: builder.mutation({
            query: (user) => ({
                url: "register",
                method: "POST",
                body: user,
            }),
            transformResponse: (response) => response,
            invalidatesTags:['Job','User']
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: "login",
                method: "POST",
                body: user,
            }),
            transformResponse: (response) => response,
            invalidatesTags: ['Job','User']
        }),
    }),
});


export const {
    useGetUserQuery,
    useRegisterUserMutation,
    useLoginUserMutation,
} = UserApi;

export default UserApi;
