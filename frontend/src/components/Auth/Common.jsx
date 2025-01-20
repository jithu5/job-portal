import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function CommonAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

    if (location.pathname === "/") {
        if (!isAuthenticated) {
            return <Navigate to="/user/login" />;
        } else {
            if (user?.role === "admin") {
                return <Navigate to="/admin/dashboard" />;
            }
        }
    }

      if (
          !isAuthenticated &&
          (
              location.pathname==="/" ||
              location.pathname.includes("/admin/dashboard") 
          )
      ) {
          return <Navigate to="/user/login" />;
      }

    if (isAuthenticated ) {
       if (user?.role === "admin" && location.pathname.includes("/api/admin")) {
        return <Navigate to="admin/dashboard" />;
       }else if(user?.role === "user" && location.pathname.includes("/user")){
        return <Navigate to="/" />;
       }
    }

    if (isAuthenticated && user?.role === "user" && location.pathname.includes("admin")) {
        return <Navigate to="/unauth-page" />
    }

    if (isAuthenticated && user?.role === "admin" && location.pathname === "/") {
        return <Navigate to="/admin/dashboard" />
    }

    return <>{children}</>;
}

export default CommonAuth;
