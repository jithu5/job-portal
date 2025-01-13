import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import {
    Home,
    UserHome,
    Profile,
    Register,
    UserAccountVerify,
    UserLogin,
    UserPasswordReset
} from "../pages/index";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
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
            }
        ],
    },
]);

function Router() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default Router;
