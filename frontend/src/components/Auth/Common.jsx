import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function CommonAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

    if (location.pathname === "/") {
        if (!isAuthenticated) {
            return <Navigate to="/api/user/login" />;
        } else {
            if (user?.role === "admin") {
                return <Navigate to="/admin/dashboard" />;
            }else if (user?.role === "user") {
                return <Navigate to="/user" />;
            }
        }
    }

      if (
          !isAuthenticated &&
          (
              location.pathname==="/user" ||
              location.pathname.includes("/admin/dashboard") 
          )
      ) {
          return <Navigate to="/api/user/login" />;
      }

    if (isAuthenticated ) {
       if (user?.role === "admin" && location.pathname.includes("/api/admin")) {
        return <Navigate to="admin/dashboard" />;
       }else if(user?.role === "user" && location.pathname.includes("/api/user")){
        return <Navigate to="/user" />;
       }
    }

    if (isAuthenticated && user?.role === "user" && location.pathname.includes("admin")) {
        return <Navigate to="/unauth-page" />
    }

    if (isAuthenticated && user?.role === "admin" && location.pathname === "/user") {
        return <Navigate to="/admin/dashboard" />
    }

    return <>{children}</>;
}

export default CommonAuth;
