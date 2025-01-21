import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminDrawer, AdminNavBar, AdminSideBar } from "../../components/index";

function AdminLayout() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="flex w-full justify-between">
                <div className="hidden md:fixed md:flex w-[20%] lg:w-[17%] bg-stone-900 text-white min-h-screen">
                    <AdminSideBar/>
                    <AdminDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
                <div className="w-full max-md:px-5 md:w-[80%] lg:w-[83%] min-h-screen md:ml-[20%] lg:ml-[17%]">
                    <AdminNavBar setIsOpen={setIsOpen} />
                    <main className="w-full min-h-screen mt-7 md:mt-14">

                    <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
}

export default AdminLayout;
