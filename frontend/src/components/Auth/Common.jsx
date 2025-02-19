import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

function CommonAuth({
    isAuthenticated,
    user,
    children,
    isLoading,
    adminIsLoading,
}) {
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    // Prevent redirection until user data is fully loaded
    useEffect(() => {
        if (!isLoading && !adminIsLoading) {
            setLoading(false);
        }
    }, [isLoading, adminIsLoading]);

    if (loading) {
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
    }

    console.log(user);

    if (location.pathname === "/") {
        return <Navigate to={"/user"} />;
    }

    if (!isAuthenticated) {
        if (
            location.pathname.startsWith("/user") ||
            location.pathname.startsWith("/company/dashboard") ||
            location.pathname.startsWith("/admin/dashboard") 
        ) {
            return <Navigate to="/api/user/login" />;
        }
    }

    if (isAuthenticated) {
        if (user?.role === "user" && location.pathname.startsWith("/api")) {
            return <Navigate to="/user" />;
        }
        if (user?.role === "company" && location.pathname.startsWith("/api")) {
            return <Navigate to="/company/dashboard" />;
        }
        if (user?.role === "company" && location.pathname.startsWith("/user")) {
            return <Navigate to="/company/dashboard" />;
        }
        if (user?.role === "company" && location.pathname.startsWith("/admin")) {
            return <Navigate to="/company/dashboard" />;
        }
        if (
            user?.role === "user" &&
            location.pathname.startsWith("/company/dashboard")
        ) {
            return <Navigate to="/user" />;
        }
        if (
            user?.role === "user" &&
            location.pathname.startsWith("/admin")
        ) {
            return <Navigate to="/user" />;
        }
        if (user?.role === "admin" && location.pathname.startsWith("/api")) {
            return <Navigate to="/admin/dashboard" />;
        }
        if (user?.role === "admin" && location.pathname.startsWith("/user")) {
            return <Navigate to="/admin/dashboard" />;
        }
        if (user?.role === "admin" && location.pathname.startsWith("/company")) {
            return <Navigate to="/admin/dashboard" />;
        }
    }

    if (isAuthenticated) {
        if (user?.role === "company" && location.pathname.startsWith("/user")) {
            return <Navigate to="/company/dashboard" />;
        } else if (
            user?.role === "user" &&
            location.pathname.startsWith("/company")
        ) {
            return <Navigate to="/user" />;
        }
    }

    return <>{children}</>;
}

export default CommonAuth;
