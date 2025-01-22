import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { useSelector } from "react-redux";
import App from "../App";
import { AdminApplication, AdminDashboard, AdminPostJob, AdminProfile, CommonAuth,Profile,EditUserProfile, EditAdminProfile, AdminJobDetails, AdminEditJob } from "../components/index";
import {
    Home,
    UserHome,
    Register,
    UserAccountVerify,
    UserLogin,
    UserPasswordReset,
    SearchJobs,
    JobDetails,
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
                    path: "/user",
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
                    path: "api/user/register",
                    element: <Register />,
                },
                {
                    path: "api/user/login",
                    element: <UserLogin />,
                },
                {
                    path: "api/user/verify",
                    element: <UserAccountVerify />,
                },
                {
                    path: "api/user/reset-password",
                    element: <UserPasswordReset />,
                },
                {
                    path: "/admin/dashboard",
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
                            path:"applications/:jobId",
                            element: <AdminJobDetails />
                        },
                        {
                            path:"applications/edit/:jobId",
                            element: <AdminEditJob />
                        },
                        {
                            path: "postajob",
                            element: <AdminPostJob />,
                        },
                        {
                            path: "profile",
                            element: <AdminProfile />,
                        },
                        {
                            path:"profile/edit",
                            element: <EditAdminProfile />,
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
