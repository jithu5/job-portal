import  { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import App from "../App";
import {
    AdminApplication,
    AdminDashboard,
    AdminPostJob,
    AdminProfile,
    CommonAuth,
    Profile,
    EditUserProfile,
    EditAdminProfile,
    AdminJobDetails,
    AdminEditJob,
    WishList,
    UserJobHistory,
} from "../components/index";
import {
    Home,
    UserHome,
    Register,
    UserLogin,
    SearchJobs,
    JobDetails,
    AdminLayout,
    AdminLogin,
    AdminRegister,
    AdminAccountVerify,
    AdminPasswordReset,
    UserPasswordReset,
    UserAccountVerify,
} from "../pages/index";
import { useGetUserQuery } from "../Store/Auth/Auth-Api";
import { setUser } from "../Store/Auth";
import { Box, CircularProgress } from "@mui/material";
import { useGetAdminQuery } from "../Store/AdminAuth/AdminAuth-Api";
// Wrapper function to include CommonAuth with Redux state
const wrapWithCommonAuth = (Component, props) => {
    return <CommonAuth {...props}>{Component}</CommonAuth>;
};

// Main Router component
function Router() {
    const { isAuthenticated, user } = useSelector((state) => state.Auth);
    const dispatch = useDispatch();

    const { data, isLoading, isSuccess,isFetching } = useGetUserQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const { data: adminData, isLoading: adminIsLoading } = useGetAdminQuery();
    useEffect(() => {
        console.log(user);
        if (!user && data && isSuccess) {
            console.log(data);
            console.log("inside");

            dispatch(setUser(data.data));
        } else if (!user && adminData) {
            console.log("inside admin");
            dispatch(setUser(adminData));
        }
    }, [data, user, adminData, isSuccess]);

    useEffect(() => {
        console.log("User Data:", data);
        console.log("isLoading:", isLoading);
        console.log("isFetching:", isFetching);
    }, [data, isLoading, isFetching]);


    if (isLoading || adminIsLoading)
        return (
            <Box
                sx={{
                    display: "flex",
                    width: "100vw",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress className="w-12 h-12 md:w-48 md:h-48" />
            </Box>
        );

    const router = createBrowserRouter([
        {
            path: "/",
            element: wrapWithCommonAuth(<App />, {
                user,
                isAuthenticated,
                isLoading,
                adminIsLoading,
            }),
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
                            path: "wishlist",
                            element: <WishList />,
                        },
                        {
                            path: "job-history",
                            element: <UserJobHistory />,
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
                            path: "applications/:jobId",
                            element: <AdminJobDetails />,
                        },
                        {
                            path: "applications/edit/:jobId",
                            element: <AdminEditJob />,
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
                            path: "profile/edit",
                            element: <EditAdminProfile />,
                        },
                    ],
                },
                {
                    path: "api/admin",
                    children: [
                        {
                            path: "login",
                            element: <AdminLogin />,
                        },
                        {
                            path: "register",
                            element: <AdminRegister />,
                        },
                        {
                            path: "verify",
                            element: <AdminAccountVerify />,
                        },
                        {
                            path: "reset-password",
                            element: <AdminPasswordReset />,
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
