import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminDrawer, AdminNavBar, AdminSideBar } from "../../components/index";
import CompanyApi, {
    useLogoutAdminMutation,
} from "../../Store/AdminAuth/AdminAuth-Api";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearUserData } from "../../Store/Auth/index";

function AdminLayout() {
    const [isOpen, setIsOpen] = useState(false);
    const [logoutAdmin] = useLogoutAdminMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        // Logout logic here
        try {
            const response = await logoutAdmin().unwrap();
            console.log(response);
            dispatch(clearUserData());
            toast.success("Logged Out Successfully!");
            dispatch(CompanyApi.util.resetApiState())
            navigate("/api/company/login");
        } catch (error) {
            console.log(error)
            const errMessage = error?.data?.message || "Failed to logout";
            toast.error(errMessage);
        }
    };
    return (
        <>
            <div className="flex w-full justify-between">
                <div className="hidden md:fixed md:flex w-[20%] lg:w-[17%] bg-stone-900 text-white min-h-screen rounded-tr-2xl rounded-br-2xl">
                    <AdminSideBar usedIn="company" />
                </div>
                <AdminDrawer
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    usedIn="company"
                />
                <div className="w-full max-md:px-5 md:w-[80%] lg:w-[83%] min-h-screen md:ml-[20%] lg:ml-[17%]">
                    <AdminNavBar
                        setIsOpen={setIsOpen}
                        handleLogout={handleLogout}
                        usedIn="company"
                    />
                    <main className="w-full min-h-screen mt-3">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
}

export default AdminLayout;
