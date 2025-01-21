import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { useSelector } from "react-redux";
import App from "../App";
import { AdminApplication, AdminDashboard, AdminPostJob, AdminProfile, CommonAuth } from "../components/index";
import {
    Home,
    UserHome,
    Profile,
    Register,
    UserAccountVerify,
    UserLogin,
    UserPasswordReset,
    SearchJobs,
    JobDetails,
    EditUserProfile,
    AdminLayout,
} from "../pages/index";

// Wrapper function to include CommonAuth with Redux state
const wrapWithCommonAuth = (Component, props) => {
    return <CommonAuth {...props}>{Component}</CommonAuth>;
};

// Main Router component
function Router() {
    const user ={
        username: "exampleUser",
        email: "example@example.com",
        role:"admin"
    }
    const isAuthenticated = true;
    const router = createBrowserRouter([
        {
            path: "/",
            element: wrapWithCommonAuth(<App />, { user, isAuthenticated }),
            children: [
                {
                    path: "/",
                    element: <UserHome />,
                    children: [
                        {
                            index: true,
                            element: <Home />,
                        },
                        {
                            path: "profile",
                            element: <Profile />,
                        },
                        {
                            path: "profile/edit",
                            element: <EditUserProfile />,
                        },
                        {
                            path: "jobs",
                            element: <SearchJobs />,
                        },
                        {
                            path: "job/:jobId",
                            element: <JobDetails />,
                        },
                    ],
                },
                {
                    path: "user/register",
                    element: <Register />,
                },
                {
                    path: "user/login",
                    element: <UserLogin />,
                },
                {
                    path: "user/verify",
                    element: <UserAccountVerify />,
                },
                {
                    path: "user/reset-password",
                    element: <UserPasswordReset />,
                },
                {
                    path: "admin/dashboard",
                    element: <AdminLayout />,
                    children: [
                        {
                            index: true,
                            element: <AdminDashboard />,
                        },
                        {
                            path: "applications",
                            element: <AdminApplication />,
                        },
                        {
                            path: "postajob",
                            element: <AdminPostJob />,
                        },
                        {
                            path: "profile",
                            element: <AdminProfile />,
                        }
                    ],
                },
                {
                    path: "api/admin",
                    children: [
                        {
                            path: "login",
                            element: <h1>Admin Login</h1>,
                        },
                        {
                            path: "register",
                            element: <h1>Admin Register</h1>,
                        },
                    ],
                },
            ],
        },
        {
            path: "unauth-page",
            element: <h1>You have no permission to view that page</h1>,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default Router;
