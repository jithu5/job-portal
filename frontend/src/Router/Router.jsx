import  { lazy, Suspense, useEffect } from "react";
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
    JobDetails,
    AdminLayout,
    AdminLogin,
    AdminRegister,
    AdminAccountVerify,
    AdminPasswordReset,
    UserPasswordReset,
    UserAccountVerify,
    CompanyProfile,
    CompanyLogin,
    Dashboard,
    Layout
} from "../pages/index";
import { useGetUserQuery } from "../Store/Auth/Auth-Api";
import { setUser } from "../Store/Auth";
import { Box, CircularProgress } from "@mui/material";
import { useGetCompanyQuery } from "../Store/AdminAuth/AdminAuth-Api";
import { useGetAdminQuery } from "../Store/adminapi/SuperAdmin-Api";
import { Loader2 } from "lucide-react";
// Wrapper function to include CommonAuth with Redux state
const wrapWithCommonAuth = (Component, props) => {
    return <CommonAuth {...props}>{Component}</CommonAuth>;
};

// Main Router component
function Router() {
    const { isAuthenticated, user } = useSelector((state) => state.Auth);
    const dispatch = useDispatch();

    const SearchJobs = lazy(() => import("../pages/Jobs/SearchJobs"));

    const { data, isLoading, isSuccess,isFetching } = useGetUserQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const { data: companyData, isLoading: companyIsLoading } = useGetCompanyQuery();
    const { data: adminData,isFetching:isAdminFetching} = useGetAdminQuery()

    console.log(adminData);
    useEffect(() => {
        console.log(user);
        if (!user && data && isSuccess) {
            console.log(data);
            console.log("inside");

            dispatch(setUser(data.data));
        } else if (!user && companyData) {
            console.log("inside admin");
            dispatch(setUser(companyData));
        }
        else if(!user && adminData && !isAdminFetching){
            dispatch(setUser(adminData.data));
        }
    }, [data, user, companyData, isSuccess,adminData]);

    
    
    if (isLoading || companyIsLoading || isAdminFetching)
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
        
        console.log(user)
    const router = createBrowserRouter([
        {
            path: "/",
            element: wrapWithCommonAuth(<App />, {
                user,
                isAuthenticated,
                isLoading,
                companyIsLoading,
            }),
            children: [
                // user pages
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
                            element: (
                                <Suspense fallback={<div className="w-full min-h-screen flex justify-center items-center"><Loader2 className="w-5 h-5 md:w-24 md:h-24 animate-spin"/></div>}>
                                    <SearchJobs />
                                </Suspense>
                            ),
                        },
                        {
                            path: "job/:jobId",
                            element: <JobDetails />,
                        },
                        {
                            path: "company-profile/:companyId",
                            element: <CompanyProfile />,
                        },
                    ],
                },
                // user verifying pages
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
                // company pages
                {
                    path: "/company/dashboard",
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
                // companies verification
                {
                    path: "api/company",
                    children: [
                        {
                            path: "login",
                            element: <CompanyLogin />,
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
                // admin pages
                {
                    path: "api/admin/login",
                    element: <AdminLogin />,
                },
                {
                    path: "admin/dashboard",
                    element: <Layout />,
                    children: [
                        {
                            index: true,
                            element: <Dashboard />,
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
