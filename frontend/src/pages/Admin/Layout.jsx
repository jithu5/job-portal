import React, { useState } from "react";
import { AdminDrawer, AdminNavBar, AdminSideBar } from "../../components/index";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminApi, {
    useLogoutMutation,
} from "../../Store/adminapi/SuperAdmin-Api";
import { toast } from "react-toastify";
import { clearUserData } from "../../Store/Auth/index";

function Layout() {
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        // Logout logic here
        try {
            const response = await logout().unwrap();
            console.log(response);
            dispatch(clearUserData());
            toast.success("Logged Out Successfully!");
            dispatch(AdminApi.util.resetApiState());
            navigate("/api/admin/login");
        } catch (error) {
            const errMessage = error?.data?.message || "Failed to logout";
            toast.error(errMessage);
        }
    };
    return (
        <>
            <main className="w-full min-h-screen bg-gray-100 text-white font-BebasNeue relative flex justify-between">
                <div className="hidden md:fixed md:flex w-[20%] lg:w-[17%] bg-stone-900 text-white min-h-screen rounded-tr-2xl rounded-br-2xl">
                    <AdminSideBar usedIn="admin" />
                </div>
                <AdminDrawer
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    usedIn="admin"
                />
                <div className="w-full   min-h-screen md:ml-[20%] lg:ml-[17%]">
                    <AdminNavBar
                        setIsOpen={setIsOpen}
                        usedIn="admin"
                        handleLogout={handleLogout}
                    />
                    <main className="w-full min-h-screen mt-3">
                        <Outlet />
                    </main>
                </div>
            </main>
        </>
    );
}

export default Layout;
