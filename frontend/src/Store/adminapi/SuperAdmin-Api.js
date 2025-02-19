import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = import.meta.env.VITE_SERVER_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: `${URL}/api/auth/admin`,
    credentials: "include",
});

const AdminApi = createApi({
    reducerPath: "admins",
    baseQuery,
    tagTypes: ["admin", "Company","User"],
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
            invalidatesTags: ["admin"],
        })
    }),
    // Define other endpoints here...
 
});

export const { useLoginMutation } = AdminApi;

export default AdminApi;